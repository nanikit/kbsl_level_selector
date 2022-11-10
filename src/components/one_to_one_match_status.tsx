import React, { useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { GiLightSabers } from 'react-icons/gi';
import { MdRestore } from 'react-icons/md';
import { RiFlag2Fill, RiFlag2Line } from 'react-icons/ri';
import { SiYelp } from 'react-icons/si';
import { useQuery } from 'react-query';
import {
  getMatchFromPlaylist,
  OneToOneStatus,
  useMatchInformation,
  useOneToOneStatus,
} from '../hooks/local_storage_hooks';
import { useSyncedScore } from '../hooks/use_synced_score';
import { TournamentState } from '../hooks/use_tournament';
import { BeatsaverMap, getDataUrlFromHash } from '../services/beatsaver';
import { Push_RealtimeScore } from '../services/protos/packets';
import { useWindowSize } from 'react-use';
import { TwoLineFittedText } from './two_line_fitted_text';

export default function OneToOneMatchStatus({
  title,
  mapHash,
  p1Win,
  p2Win,
  goal,
  tournament,
}: {
  title?: string;
  mapHash?: string;
  p1Win?: number;
  p2Win?: number;
  goal?: number;
  tournament?: TournamentState;
}) {
  const [local, saveToLocal] = useOneToOneStatus();
  const { player1, player2, hasPlayer1Retry, hasPlayer2Retry, tournamentServer } = local ?? {};

  const mapQuery = useQuery([getDataUrlFromHash(mapHash ?? '')], {
    enabled: !!mapHash,
    staleTime: Infinity,
  });

  const mapData = mapQuery.data as BeatsaverMap | undefined;

  const setPlayer = (index: number) => {
    const existing = index === 1 ? player1 : player2;
    const id = prompt('Input user id', existing);
    if (id == null) {
      return;
    }

    const update = index == 1 ? { player1: id } : { player2: id };
    saveToLocal({ ...local, ...update } as OneToOneStatus);
  };

  useEffect(() => {
    saveToLocal({ ...local, tournamentServer: '' });
    saveToLocal({ ...local, tournamentServer });
  }, [player1, player2, tournamentServer]);

  return (
    <div className="mx-[5vmin] flex flex-col justify-end">
      <RealtimeScore {...tournament} />
      <div className="h-[10.417vw] flex flex-row flex-nowrap justify-between">
        <Nameplate
          userId={player1}
          win={p1Win}
          goal={goal}
          onPfpClick={() => {
            setPlayer(1);
          }}
          hasRetry={hasPlayer1Retry}
          onRetry={() => {
            saveToLocal({ ...local, hasPlayer1Retry: !local?.hasPlayer1Retry } as OneToOneStatus);
          }}
        />
        <CurrentMapCard title={title} mapData={mapData} hash={mapHash} />
        <Nameplate
          userId={player2}
          win={p2Win}
          goal={goal}
          reverse
          hasRetry={hasPlayer2Retry}
          onPfpClick={() => {
            setPlayer(2);
          }}
          onRetry={() => {
            saveToLocal({ ...local, hasPlayer2Retry: !local?.hasPlayer2Retry } as OneToOneStatus);
          }}
        />
      </div>
    </div>
  );
}

function RealtimeScore(tournament: TournamentState) {
  const player1 = useSyncedScore({ player: tournament.player1, score: tournament.player1Score });
  const player2 = useSyncedScore({ player: tournament.player2, score: tournament.player2Score });

  const accuracy1 = player1?.accuracy;
  const accuracy2 = player2?.accuracy;
  const hasScoreBoth = accuracy1 !== undefined && accuracy2 !== undefined;
  const isPlayer1Super = hasScoreBoth && accuracy1 >= accuracy2;
  const isPlayer2Super = hasScoreBoth && accuracy1 <= accuracy2;
  return (
    <div className="h-[6vw] pb-[1.3vw] flex flex-row flex-nowrap items-end justify-center text-white text-outshadow">
      <div className="flex flex-col items-end">
        <p className="text-[1.5vw] leading-[1.5vw]">{getMissText(player1)}</p>
        <p
          className={`leading-[3vw] w-[15vw] font-[Consolas,monospace] text-right transition-all ${
            isPlayer1Super ? 'text-[4vw]' : 'text-[3vw]'
          }`}
        >
          {accuracy1 ? `${(accuracy1 * 100).toFixed(2)}%` : ''}
        </p>
      </div>
      <span className="w-[1vw]" />
      <div className="flex flex-col items-start">
        <p className="text-[1.5vw] leading-[1.5vw]">{getMissText(player2)}</p>
        <p
          className={`leading-[3vw] w-[15vw] font-[Consolas,monospace] transition-all ${
            isPlayer2Super ? 'text-[4vw]' : 'text-[3vw]'
          }`}
        >
          {accuracy2 ? `${(accuracy2 * 100).toFixed(2)}%` : ''}
        </p>
      </div>
    </div>
  );
}

function getMissText(score?: Push_RealtimeScore): string {
  if (score === undefined) {
    return '';
  }
  const { badCuts, bombHits, notesMissed, wallHits } = score?.scoreTracker ?? {};
  if (!(badCuts || bombHits || notesMissed || wallHits)) {
    return 'FC';
  }
  return `${(badCuts ?? 0) + (notesMissed ?? 0)}`;
}

function CurrentMapCard({
  title,
  mapData,
  hash,
}: {
  title?: string;
  mapData?: BeatsaverMap;
  hash?: string;
}) {
  const [match, saveMatch] = useMatchInformation();
  const [oneToOne, saveOneToOne] = useOneToOneStatus();
  const titleRef = useRef(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const reader = new FileReader();
      const text = await new Promise<string>((resolve, reject) => {
        reader.onabort = reject;
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(acceptedFiles[0]);
      });
      const json = JSON.parse(text);
      const matchUpdate = getMatchFromPlaylist(json);
      const safeLength = matchUpdate.levels?.length ?? match.matchResult.length;
      saveMatch({ ...match, matchResult: match.matchResult.slice(0, safeLength), ...matchUpdate });
    },
    [match],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json', '.bplist'] },
  });

  const setTournamentServer = (ev: React.MouseEvent) => {
    ev.preventDefault();
    const url = prompt(
      'Input the tournament server url',
      oneToOne.tournamentServer || 'ws://tournamentassistant.net:2053',
    );
    if (!url) {
      return;
    }
    saveOneToOne({ ...oneToOne, tournamentServer: url });
  };

  const { versions, metadata } = (mapData ?? {}) as BeatsaverMap;
  const revision = versions?.find((x) => x.hash === hash) ?? versions?.[versions.length - 1];
  const { songName, songAuthorName } = (metadata ?? {}) as {
    songName?: string;
    songAuthorName?: string;
  };
  const coverUrl = revision?.coverURL;

  const titleText = title ?? songName;
  const { width: vw100 } = useWindowSize();

  return (
    <div
      onContextMenu={setTournamentServer}
      className={
        'flex-1 h-full rounded-[2vw] border-black border-[0.2vw] mx-[1vw] overflow-hidden' +
        ' text-white flex flex-col items-center justify-center text-[4vmin] font-bold ' +
        ' relative text-center font-extrabold text-outshadow bg-slate-900'
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {coverUrl ? (
        <img
          src={coverUrl}
          className="object-cover absolute top-0 left-0 w-full h-full brightness-75"
        />
      ) : (
        <GiLightSabers className="text-[4vw]" />
      )}
      <div className="absolute w-full h-full flex flex-col justify-center">
        {!!(titleText || songAuthorName) && (
          <div className="flex flex-col justify-center w-full">
            <TwoLineFittedText
              options={{ maxWidth: vw100 * 0.2, maxHeight: vw100 * 0.08, maxSize: vw100 * 0.023 }}
              className="font-light whitespace-pre-line"
            >
              {titleText}
              {/* Camellia & USAO - Möbius [In Ranked Queue]
                Camellia & USAO - Möbius [In Ranked Queue] */}
            </TwoLineFittedText>
          </div>
        )}
        {!!songAuthorName && <p className="text-[1vw] font-light">by {songAuthorName}</p>}
      </div>
    </div>
  );
}

const apiOrigin = location.origin.endsWith('pages.dev') ? '' : 'http://localhost:8788';

function Nameplate({
  userId,
  win,
  goal,
  reverse,
  hasRetry,
  onRetry,
  onPfpClick,
}: {
  userId?: string;
  win?: number;
  goal?: number;
  reverse?: boolean;
  hasRetry?: boolean;
  onRetry?: () => void;
  onPfpClick?: () => void;
}) {
  const beatLeaderProfileQuery = useQuery([`${apiOrigin}/api/profile/${userId}`], {
    enabled: !!userId,
    staleTime: Infinity,
  });
  const scoresaberProfileQuery = useQuery(
    [`https://new.scoresaber.com/api/player/${userId}/basic`],
    {
      enabled: !!userId,
      staleTime: Infinity,
    },
  );
  const scoresaberProfile = scoresaberProfileQuery.data as
    | { playerInfo: { playerName: string } }
    | undefined;
  const beatLeaderProfile = beatLeaderProfileQuery.data as
    | { name: string; avatar: string }
    | undefined;
  const beatLeaderPfpUrl = (beatLeaderProfileQuery.data as any)?.avatar;
  const scoresaberPfpUrl = `https://cdn.scoresaber.com/avatars/${userId}.jpg`;
  const pfpUrl = beatLeaderPfpUrl ?? scoresaberPfpUrl;
  const name = beatLeaderProfile?.name ?? scoresaberProfile?.playerInfo.playerName ?? '';

  return (
    <div className={`flex-[1.7] flex ${reverse ? 'flex-row-reverse' : 'flex-row'} items-center`}>
      <img
        className="h-full aspect-square border-[0.15vw] border-violet-900 shadow-xl rounded-[2vw]"
        src={userId ? pfpUrl : '/unknown.jpg'}
        onClick={onPfpClick}
      />
      <span className="w-4" />
      <div className={`flex-[1_1_4rem] h-2/3 flex flex-col ${reverse ? 'items-end' : ''}`}>
        <div className={'h-1/2 flex ' + (reverse ? 'flex-row-reverse' : 'flex-row')}>
          <div
            className={`w-[10.5vw] clip polygon text-[2vw] flex items-center px-[1vw] ${
              !reverse ? 'bg-red-500 b-9 flex-row' : 'bg-blue-500 a-9 flex-row-reverse'
            }`}
          >
            {[...Array(goal ?? 4).keys()].map((index) =>
              index < (win ?? 0) ? (
                <RiFlag2Fill
                  key={index}
                  className={!reverse ? 'fill-red-900' : 'fill-blue-900 scale-x-[-1]'}
                />
              ) : (
                <RiFlag2Line
                  key={index}
                  className={!reverse ? 'fill-red-900' : 'fill-blue-900 scale-x-[-1]'}
                />
              ),
            )}
          </div>
          <div className="text-white flex items-center justify-center text-[2vw]" onClick={onRetry}>
            {hasRetry ? <MdRestore /> : <SiYelp />}
          </div>
        </div>
        <div
          className={`h-2/3 w-full flex items-center px-4 clip polygon ${
            !reverse ? 'bg-red-300 b-9' : 'bg-blue-300 a-9 flex-row-reverse'
          }`}
        >
          <p className="font-[Maplestory] text-[2vw] font-extrabold text-white text-outshadow ">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
