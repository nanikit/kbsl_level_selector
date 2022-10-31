import { atom, useAtom } from 'jotai';
import { uniqBy } from 'lodash-es';
import useWebSocket, { SendMessage } from 'react-use-websocket';
import {
  Match,
  User,
  User_ClientTypes,
  User_DownloadStates,
  User_PlayStates,
} from '../services/protos/models';
import { Packet, Push_RealtimeScore } from '../services/protos/packets';

export type TournamentSearch = {
  server?: string;
  player1?: string;
  player2?: string;
};

export type DirectedLevel = {
  levelId?: string;
  characteristic?: string;
  difficulty?: number;
};

export type TournamentState = {
  player1?: User;
  player1Score?: Push_RealtimeScore;
  player2?: User;
  player2Score?: Push_RealtimeScore;
  matches?: Match[];
  match?: Match;
  directedLevel?: DirectedLevel;
  users?: User[];
  self?: User;
};

type CustomMessage = ['setMatch', Match];

const tournamentStateAtom = atom({} as TournamentState);
const tournamentAtom = atom(
  (get) => get(tournamentStateAtom),
  (
    get,
    set,
    input: {
      message: Packet | CustomMessage;
      search: TournamentSearch;
      sendMessage: ReturnType<typeof useWebSocket>['sendMessage'];
    },
  ) => {
    set(tournamentStateAtom, collectMessage({ ...input, state: get(tournamentAtom) }));
  },
);

export function useTournamentAssistant(search: TournamentSearch) {
  const [tournament, dispatch] = useAtom(tournamentAtom);

  let { sendMessage } = useWebSocket(search.server ?? null, {
    onOpen: () => {
      sendMessage(
        Packet.encode({
          request: {
            connect: {
              user: {
                name: 'accurary_monitor',
                clientType: User_ClientTypes.WebsocketConnection,
                userId: '0',
              },
              clientVersion: 67,
            },
          },
        }).finish(),
      );
    },
    onMessage: async (message: MessageEvent<Blob>) => {
      const buffer = await message.data.arrayBuffer();
      const packet = Packet.decode(new Uint8Array(buffer));

      console.log(packet);
      dispatch({ message: packet, search, sendMessage });
    },
    shouldReconnect: () => true,
  });
  const send = sendMessage;
  sendMessage = (message) => {
    console.log('sendMessage', Packet.decode(message as Uint8Array));
    send(message);
  };

  return [
    tournament,
    {
      setMatch: (match: Match) => {
        dispatch({ message: ['setMatch', match], search, sendMessage });
      },
    },
  ] as const;
}

function collectMessage({
  message,
  state,
  search,
  sendMessage,
}: {
  message: Packet | CustomMessage;
  state: TournamentState;
  search: TournamentSearch;
  sendMessage: ReturnType<typeof useWebSocket>['sendMessage'];
}): TournamentState {
  if (Array.isArray(message)) {
    return collectCustomMessage({ message, state, sendMessage });
  }

  const { player1, player2 } = search;
  const { response, event, push } = message;
  const { connect } = response ?? {};
  const { userAddedEvent, userUpdatedEvent, userLeftEvent } = event ?? {};
  const { user } = userAddedEvent ?? userUpdatedEvent ?? userLeftEvent ?? {};
  const { matchCreatedEvent, matchUpdatedEvent, matchDeletedEvent } = event ?? {};
  const { match } = matchCreatedEvent ?? matchUpdatedEvent ?? matchDeletedEvent ?? {};
  if (connect) {
    const { selfGuid, state: serverState } = connect ?? {};
    const { matches, users } = serverState ?? {};
    const p1 = users?.find((u) => u.userId === player1);
    const p2 = users?.find((u) => u.userId === player2);
    // Server cleanup mess
    const self = users?.find((u) => u.guid === selfGuid);
    if (self && matches) {
      const interests = [
        ...(p1?.guid ? matches?.filter((m) => m.associatedUsers?.includes(p1.guid!)) : []),
        ...(p2?.guid ? matches?.filter((m) => m.associatedUsers?.includes(p2.guid!)) : []),
      ];
      const playerMatches = uniqBy(interests, (x) => x.guid);
      for (const match of playerMatches) {
        associateMe(match, { self, sendMessage });
      }
    }

    const newState = {
      ...state,
      matches,
      users,
      self,
      player1: p1,
      player2: p2,
    } as TournamentState;
    const match = pickCurrentMatch(newState);

    return { ...newState, match };
  } else if (match && state.matches) {
    if (state.self && !match.associatedUsers?.includes(state.self.guid!)) {
      if (match.associatedUsers?.includes(state.player1?.guid!)) {
        associateMe(match, { self: state.self, sendMessage });
      } else if (match.associatedUsers?.includes(state.player2?.guid!)) {
        associateMe(match, { self: state.self, sendMessage });
      }
    }

    let newMatches = [...state.matches];
    let directedLevel = undefined;
    const index = state.matches.findIndex((x) => x.guid === match.guid);
    if (matchCreatedEvent && index === -1) {
      newMatches.push(match);
    } else if (matchUpdatedEvent && index !== -1) {
      newMatches.splice(index, 1, match);
      if (hasSameLevel(match, state.directedLevel)) {
        directedLevel = state.directedLevel;
      }
    } else if (index !== -1) {
      newMatches.splice(index, 1);
    }

    const newState = { ...state, matches: newMatches };
    const currentMatch = pickCurrentMatch(newState);
    return { ...newState, match: currentMatch, directedLevel };
  } else if (user && state.users) {
    const p1 = user.userId === player1 ? user : state.player1;
    const p2 = user.userId === player2 ? user : state.player2;

    let newUsers = [...state.users];
    const index = state.users.findIndex((x) => x.guid === user.guid);
    if (userAddedEvent && index === -1) {
      newUsers.push(user);
    } else if (userUpdatedEvent && index !== -1) {
      newUsers.splice(index, 1, user);
      correctDifficultyIfThisIsLeader({ state, user, sendMessage });
    } else if (index !== -1) {
      newUsers.splice(index, 1);
    }

    return { ...state, player1: p1, player2: p2, users: newUsers };
  } else if (push?.realtimeScore) {
    const score = push.realtimeScore;
    const guid = score.userGuid;
    if (guid === state.player1?.guid) {
      return { ...state, player1Score: score };
    } else if (guid === state.player2?.guid) {
      return { ...state, player2Score: score };
    }
  }

  return state;
}

function correctDifficultyIfThisIsLeader({
  state,
  user,
  sendMessage,
}: {
  state: TournamentState;
  user: User;
  sendMessage: SendMessage;
}) {
  if (
    state.match &&
    state.directedLevel &&
    user.downloadState === User_DownloadStates.Downloaded &&
    user.playState === User_PlayStates.Waiting
  ) {
    sendMessage(Packet.encode({ event: { matchUpdatedEvent: { match: state.match } } }).finish());
  }
}

function collectCustomMessage({
  message,
  state,
  sendMessage,
}: {
  message: CustomMessage;
  state: TournamentState;
  sendMessage: SendMessage;
}) {
  const match = message[1];
  const players = match.associatedUsers
    ?.map((x) => state.users?.find((u) => u.guid === x))
    .filter((u) => u?.clientType === User_ClientTypes.Player);
  sendMessage(
    Packet.encode({
      from: match.leader,
      forwardingPacket: {
        forwardTo: players?.flatMap((p) => (p?.guid ? [p.guid] : [])),
        packet: { command: { loadSong: { levelId: match.selectedLevel?.levelId } } },
      },
    }).finish(),
  );
  sendMessage(Packet.encode({ event: { matchUpdatedEvent: { match } } }).finish());
  return {
    ...state,
    match,
    directedLevel: {
      levelId: match.selectedLevel?.levelId,
      characteristic: match.selectedCharacteristic?.serializedName,
      difficulty: match.selectedDifficulty,
    },
  };
}

function associateMe(
  match: Match,
  {
    self,
    sendMessage,
  }: { self: User; sendMessage: ReturnType<typeof useWebSocket>['sendMessage'] },
) {
  if (match.associatedUsers?.includes(self.guid!)) {
    return;
  }

  const newMatch = {
    ...match,
    associatedUsers: [...(match.associatedUsers ?? []), self.guid],
  } as Match;
  sendMessage(Packet.encode({ event: { matchUpdatedEvent: { match: newMatch } } }).finish());
  console.log(`Associate me with ${match.guid}`);
}

function pickCurrentMatch(tournament: TournamentState) {
  const { player1, player2 } = tournament;
  if (!player1 || !player2) {
    return;
  }

  const userGuids = tournament.users?.map((u) => u.guid);
  const relatedMatches = tournament.matches?.filter(
    (x) => hasPlayer(x, player1) && hasPlayer(x, player2) && userGuids?.includes(x.leader),
  );
  return relatedMatches?.[relatedMatches.length - 1];
}

function hasPlayer(match: Match, player: User) {
  const { guid } = player;
  if (!guid) {
    return false;
  }
  return match.associatedUsers?.includes(guid);
}

function hasSameLevel(match?: Match, directedLevel?: DirectedLevel): boolean {
  if (!match || !directedLevel) {
    return false;
  }
  const { levelId, characteristic, difficulty } = directedLevel;
  return (
    match.selectedLevel?.levelId === levelId &&
    match.selectedCharacteristic?.serializedName === characteristic &&
    match.selectedDifficulty === difficulty
  );
}
