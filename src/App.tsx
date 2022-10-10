import { useQuery } from 'react-query';
import OneToOneMatchStatus from './components/one_to_one_match_status';
import {
  getMatchFromPlaylist,
  MatchMapStatus,
  useMatchInformation,
} from './hooks/local_storage_hooks';
import { BeatsaverMap, getDataUrlFromHash } from './services/beatsaver';

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

  const { title, description, host, hashes, matchResult } = match;
  const pickedIndex = matchResult?.findIndex((x) => x === 'picked');
  const pickedHash = hashes[pickedIndex];

  return (
    <main>
      <div className='bg-[url(/bg.png)] w-full aspect-[16/9] bg-cover flex flex-col'>
        <div className='flex-[21_1_0] flex flex-col flex-nowrap items-center font-bold pt-2 text-white'>
          <p className='text-4xl mt-7'>{host}</p>
          <p className='text-7xl'>
            {title || (
              <>
                제3회 <span className='text-[#FFC6ED]'>전자칼잽이</span> 대전
              </>
            )}
          </p>
          <p className='text-5xl'>{description}</p>
        </div>

        <div className='flex-[79_1_0] px-[7.5vw]'>
          <div className='aspect-[2.16] bg-green-300 bg-opacity-80 flex flex-row flex-wrap p-7'>
            {hashes.map((hash, index) => (
              <div key={hash || index} className='flex-[1_0] basis-1/3 p-5 h-1/3'>
                <MapCard
                  title={match.titles[index]}
                  hash={hash}
                  status={matchResult?.[index]}
                  onStatusChanged={(status) => saveStatus(status, index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <OneToOneMatchStatus
        mapHash={pickedHash}
        goal={Math.ceil((hashes.length - matchResult.filter((x) => x === 'banned').length) / 2)}
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
  onStatusChanged,
}: {
  title?: string;
  hash?: string;
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
        'w-full h-full border-4 rounded-2xl bg-cover text-center font-extrabold' +
        ' [text-shadow:0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white]' +
        ` flex flex-col justify-between bg-sky-100 ${statusCss}`
      }
      style={{ backgroundImage: cover ? `url(${cover})` : '' }}
      onClick={setStatus}
      onContextMenu={(ev) => {
        ev.preventDefault();
        onStatusChanged?.('picked');
      }}
    >
      <p className='text-2xl'>{map?.id ?? '-'}</p>
      <p className='text-4xl'>{title ?? map?.metadata?.songName ?? '-'}</p>
      <p className='text-2xl'>{map?.metadata?.levelAuthorName ?? '-'}</p>
    </div>
  );
}
