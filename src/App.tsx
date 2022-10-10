import { useQuery } from 'react-query';
import OneToOneMatchStatus from './components/one_to_one_match_status';
import {
  getMatchFromPlaylist,
  MatchMapStatus,
  useMatchInformation,
} from './hooks/local_storage_hooks';
import { BeatsaverMap, Difficulty, getDataUrlFromHash } from './services/beatsaver';

export default function App() {
  const [match, saveMatch] = useMatchInformation();

  const saveStatus = (status: MatchMapStatus, index: number) => {
    const matchResult = match.matchResult ?? [];
    if (status === 'picked') {
      for (let i = 0; i < matchResult.length; i++) {
        if (matchResult[i] === 'picked') {
          matchResult[i] = 'normal';
        }
      }
    }
    matchResult[index] = status;
    saveMatch({ ...match, matchResult });
  };

  useQuery(['./map_pool.json'], {
    onSuccess: (data) => {
      saveMatch({ ...match, ...getMatchFromPlaylist(data) });
    },
    enabled: !match.host,
  });

  const { title, description, host, levels, matchResult } = match;
  const pickedIndex = matchResult?.findIndex((x) => x === 'picked');
  const pickedLevel = levels[pickedIndex];

  return (
    <main>
      <div className='bg-[url(/bg.png)] w-full aspect-[16/9] bg-cover flex flex-col'>
        <div className='flex-[28_1_0] flex flex-col flex-nowrap items-center font-bold pt-2 text-white'>
          <p className='text-[2vw] mt-7'>{host}</p>
          <p className='text-[3.5vw] leading-[3.5vw]'>
            {title || (
              <>
                제3회 <span className='text-[#FFC6ED]'>전자칼잽이</span> 대전
              </>
            )}
          </p>
          <p className='text-[2.5vw] leading-[3vw]'>{description}</p>
        </div>

        <div className='flex-[72_1_0] px-[4vw]'>
          <div className='aspect-[2.96] flex flex-row flex-wrap'>
            {levels.map(({ hash, difficulty }, index) => (
              <div key={hash || index} className='flex-[1_0] basis-1/3 p-[0.5vw] h-1/3'>
                <MapCard
                  title={match.titles[index]}
                  hash={hash}
                  difficulty={difficulty}
                  status={matchResult?.[index]}
                  onStatusChanged={(status) => saveStatus(status, index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <OneToOneMatchStatus
        mapHash={pickedLevel?.hash}
        goal={Math.ceil((levels.length - matchResult.filter((x) => x === 'banned').length) / 2)}
        p1Win={matchResult?.filter((x) => x === 'p1_win').length}
        p2Win={matchResult?.filter((x) => x === 'p2_win').length}
      />
    </main>
  );
}

function MapCard({
  title,
  hash,
  status,
  difficulty,
  onStatusChanged,
}: {
  title?: string;
  hash?: string;
  difficulty?: Difficulty;
  status?: MatchMapStatus;
  onStatusChanged?: (status: MatchMapStatus) => void;
}) {
  const { data } = useQuery([getDataUrlFromHash(hash ?? '')], {
    enabled: !!hash,
    staleTime: Infinity,
  });
  const map = data as BeatsaverMap;

  const cover = map?.versions?.[0]?.coverURL;

  let statusCss = 'border-black text-black';
  switch (status) {
    case 'banned':
      statusCss = 'border-gray-400 text-gray-400';
      break;
    case 'picked':
      statusCss = 'border-yellow-400 text-yellow-500';
      break;
    case 'p1_win':
      statusCss = 'border-red-600 text-red-600';
      break;
    case 'p2_win':
      statusCss = 'border-blue-600 text-blue-600';
      break;
  }

  const setStatus = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX: x, clientY: y } = ev;
    const area = ev.currentTarget.getBoundingClientRect();
    const { left, top, width, height } = area;
    const isLeft = (x - left) / width < 0.5;
    const isTop = (y - top) / height < 0.5;
    if (isTop) {
      onStatusChanged?.(isLeft ? 'normal' : 'banned');
    } else {
      onStatusChanged?.(isLeft ? 'p1_win' : 'p2_win');
    }
  };

  return (
    <div
      className={
        'relative w-full h-full border-[0.3vw] rounded-[1vw] bg-cover font-extrabold' +
        ' [text-shadow:0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white]' +
        ` flex flex-row overflow-hidden bg-sky-100 ${statusCss}`
      }
      style={{ backgroundImage: cover ? `url(${cover})` : '' }}
      onClick={setStatus}
      onContextMenu={(ev) => {
        ev.preventDefault();
        onStatusChanged?.('picked');
      }}
    >
      {!!cover && (
        <>
          <img src={cover} className='absolute w-full h-full object-cover' />
          <img src={cover} className='relative h-full aspect-square object-cover' />
        </>
      )}
      <div className='relative px-[2%] py-[1%] h-full flex flex-1 flex-col items-start backdrop-blur-[1.5vw]'>
        <p className='text-[1.2vw] flex-1'>{map?.id ?? ''}</p>
        <p className='text-[2vw] leading-[2vw] inline w-full'>
          {title ?? map?.metadata?.songName ?? '-'}
        </p>
        <div className='flex-[1_1_1.3vw] flex flex-col flex-wrap min-h-[1.3vw] justify-end'>
          <p className='text-[1.2vw] leading-[1.5vw] mr-1'>
            {map?.metadata?.levelAuthorName ?? ''}
          </p>
          <p className='text-[1.2vw] leading-[1.5vw]'>
            {difficulty ? (difficulty === 'ExpertPlus' ? 'Expert+' : difficulty) : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
