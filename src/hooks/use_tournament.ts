import { atom, useAtom } from 'jotai';
import { uniqBy } from 'lodash-es';
import useWebSocket from 'react-use-websocket';
import { Match, User, User_ClientTypes } from '../services/protos/models';
import { Packet, Push_RealtimeScore } from '../services/protos/packets';
import { timeout } from '../services/utils';

export type TournamentSearch = {
  server?: string;
  player1?: string;
  player2?: string;
};

export type TournamentState = {
  player1?: User;
  player1Score?: Push_RealtimeScore;
  player2?: User;
  player2Score?: Push_RealtimeScore;
  matches?: Match[];
  match?: Match;
  users?: User[];
  self?: User;
};

const tournamentStateAtom = atom({} as TournamentState);
const tournamentAtom = atom(
  (get) => get(tournamentStateAtom),
  (
    get,
    set,
    input: {
      packet: Packet;
      search: TournamentSearch;
      sendMessage: ReturnType<typeof useWebSocket>['sendMessage'];
    },
  ) => {
    const { packet, search, sendMessage } = input;
    set(
      tournamentStateAtom,
      collectMessage(packet, { state: get(tournamentAtom), search, sendMessage }),
    );
  },
);

export function useTournamentAssistant(search: TournamentSearch) {
  const [tournament, dispatch] = useAtom(tournamentAtom);

  const { sendMessage } = useWebSocket(search.server ?? null, {
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
      dispatch({ packet, search, sendMessage });
    },
    shouldReconnect: () => true,
  });

  return [
    tournament,
    {
      setMatch: async (match: Match) => {
        const players = match.associatedUsers
          ?.map((x) => tournament.users?.find((u) => u.guid === x))
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
        // I don't know why but if miss it then difficulty doesn't change.
        await timeout(100);
        // Original client calls this first, but it doesn't change difficulty sometimes.
        // And sometimes crashes.
        sendMessage(Packet.encode({ event: { matchUpdatedEvent: { match } } }).finish());
      },
    },
  ] as const;
}

function collectMessage(
  message: Packet,
  {
    state,
    search,
    sendMessage,
  }: {
    state: TournamentState;
    search: TournamentSearch;
    sendMessage: ReturnType<typeof useWebSocket>['sendMessage'];
  },
): TournamentState {
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
    const index = state.matches.findIndex((x) => x.guid === match.guid);
    if (matchCreatedEvent && index === -1) {
      newMatches.push(match);
    } else if (matchUpdatedEvent && index !== -1) {
      newMatches.splice(index, 1, match);
    } else if (index !== -1) {
      newMatches.splice(index, 1, match);
    }

    const newState = { ...state, matches: newMatches };
    const currentMatch = pickCurrentMatch(newState);
    return { ...newState, match: currentMatch };
  } else if (user && state.users) {
    const p1 = user.userId === player1 ? user : state.player1;
    const p2 = user.userId === player2 ? user : state.player2;

    let newUsers = [...state.users];
    const index = state.users.findIndex((x) => x.guid === user.guid);
    if (matchCreatedEvent && index === -1) {
      newUsers.push(user);
    } else if (matchUpdatedEvent && index !== -1) {
      newUsers.splice(index, 1, user);
    } else if (index !== -1) {
      newUsers.splice(index, 1, user);
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

  const relatedMatches = tournament.matches
    ?.filter((x) => hasPlayer(x, player1) && hasPlayer(x, player2))
    .sort(
      (a, b) =>
        new Date(b.startTime || '1990-01-01').getTime() -
        new Date(a.startTime || '1990-01-01').getTime(),
    );
  return relatedMatches?.[0];
}

function hasPlayer(match: Match, player: User) {
  const { guid } = player;
  if (!guid) {
    return false;
  }
  return match.associatedUsers?.includes(guid);
}
