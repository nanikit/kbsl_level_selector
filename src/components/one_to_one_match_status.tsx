import { useCallback, useMemo } from 'react';
import { GiLightSabers } from 'react-icons/gi';
import { MdRestore } from 'react-icons/md';
import { RiFlag2Fill, RiFlag2Line } from 'react-icons/ri';
import { SiYelp } from 'react-icons/si';
import { useQuery } from 'react-query';
import { BeatsaverMap, getDataUrlFromHash } from '../services/beatsaver';
import {
  getMatchFromPlaylist,
  OneToOneStatus,
  useMatchInformation,
  useOneToOneStatus,
} from '../hooks/local_storage_hooks';
import { useDropzone } from 'react-dropzone';

export default function OneToOneMatchStatus({
  mapHash,
  p1Win,
  p2Win,
  goal,
}: {
  mapHash?: string;
  p1Win?: number;
  p2Win?: number;
  goal?: number;
}) {
  const [local, saveToLocal] = useOneToOneStatus();

  const mapQuery = useQuery([getDataUrlFromHash(mapHash ?? '')], {
    enabled: !!mapHash,
  });
  const mapData = mapQuery.data as BeatsaverMap | undefined;

  const setPlayer = (index: number) => {
    const id = prompt('Input scoresaber user id');
    if (!id) {
      return;
    }

    const update = index == 1 ? { player1: id } : { player2: id };
    saveToLocal({ ...local, ...update } as OneToOneStatus);
  };

  const { player1, player2, hasPlayer1Retry, hasPlayer2Retry } = local ?? {};
  return (
    <div className='mx-[5vmin] flex flex-col justify-end'>
      <div className='h-[10.417vw] flex flex-row flex-nowrap justify-between mb-[5vmin]'>
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
        <CurrentMapCard mapData={mapData} />
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

function CurrentMapCard({ mapData }: { mapData?: BeatsaverMap }) {
  const [match, saveMatch] = useMatchInformation();

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
      saveMatch({ ...match, ...matchUpdate });
    },
    [match],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json', '.bplist'] },
  });

  const { versions, metadata } = (mapData ?? {}) as BeatsaverMap;
  const latest = versions?.[versions.length - 1];
  const { songName, songAuthorName } = (metadata ?? {}) as {
    songName?: string;
    songAuthorName?: string;
  };
  const coverUrl = latest?.coverURL;

  return (
    <div
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
          className='object-cover absolute top-0 left-0 w-full h-full brightness-75'
        />
      ) : (
        <GiLightSabers className='text-[4vw]' />
      )}
      <div className='absolute w-full h-full flex flex-col justify-center font-[esamanru]'>
        {!!(songName || songAuthorName) && <p className='text-[2vw]'>{songName}</p>}
        {!!songAuthorName && <p className='text-[1vw] font-light'>by ${songAuthorName}</p>}
      </div>
    </div>
  );
}

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
  const playerQuery = useQuery([`https://new.scoresaber.com/api/player/${userId}/basic`], {
    enabled: !!userId,
  });
  const { playerName } = (playerQuery.data as any)?.playerInfo ?? {};

  return (
    <div className={`flex-[1.7] flex ${reverse ? 'flex-row-reverse' : 'flex-row'} items-center`}>
      <img
        className='h-full aspect-square border-[0.15vw] border-violet-900 shadow-xl rounded-[2vw]'
        src={userId ? `https://cdn.scoresaber.com/avatars/${userId}.jpg` : '/unknown.jpg'}
        onClick={onPfpClick}
      />
      <span className='w-4' />
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
          <div className='text-white flex items-center justify-center text-[2vw]' onClick={onRetry}>
            {hasRetry ? <MdRestore /> : <SiYelp />}
          </div>
        </div>
        <div
          className={`h-2/3 w-full flex items-center px-4 clip polygon ${
            !reverse ? 'bg-red-300 b-9' : 'bg-blue-300 a-9 flex-row-reverse'
          }`}
        >
          <p className='font-[Maplestory] text-[2vw] font-extrabold text-white text-outshadow '>
            {playerName}
          </p>
        </div>
      </div>
    </div>
  );
}
