import pLimit from 'p-limit';
import { useState } from 'react';
import { useAsync, useLocalStorage } from 'react-use';
import { getMapFromHash } from './beatsaver';

const beatsaverThrottle = pLimit(3);

function App() {
  const [state, setState] = useState({
    topSubtitle: '한국 비트세이버 커뮤니티',
    title: '',
    bottomSubtitle: '',
    titles: [] as string[],
    hashes: [] as string[],
    matchStatus: [] as (MatchMapStatus | undefined)[],
  });
  const [matchStatus, setMatchStatus] = useLocalStorage('matchStatus', [] as MatchMapStatus[]);

  const saveStatus = (status: MatchMapStatus, index: number) => {
    matchStatus![index] = status;
    setMatchStatus(matchStatus);
  };

  useAsync(async () => {
    const playlist = await fetchJson('./map_pool.json');
    const hashes = playlist?.songs?.map((x: any) => x?.hash).filter(Boolean);
    setState({
      ...state,
      bottomSubtitle: playlist?.playlistDescription,
      titles: playlist?.songs?.map?.((x: any) => x.songName),
      hashes,
    });
  }, []);

  const { title, topSubtitle, bottomSubtitle, hashes } = state;
  return (
    <main className='bg-[url(/bg.png)] w-[100vw] h-[100vh] bg-cover flex flex-col'>
      <div className='flex-[21_1_0] flex flex-col flex-nowrap items-center font-bold pt-2 text-white'>
        <p className='text-[3.5vmin]'>{topSubtitle}</p>
        <p className='text-[6.25vmin] leading-[6.25vmin]'>
          {title || (
            <>
              제3회 <span className='text-[#FFC6ED]'>전자칼잽이</span> 대전
            </>
          )}
        </p>
        <p className='text-[4.25vmin] leading-[5.25vmin]'>{bottomSubtitle}</p>
      </div>

      <div className='flex-[79_1_0] px-[13vmin]'>
        <div className='aspect-[2.16] bg-green-300 bg-opacity-80 flex flex-row flex-wrap p-[2vmin]'>
          {hashes.map((hash, index) => (
            <div key={hash} className='flex-[1_0] basis-1/3 p-[2vmin] h-1/3'>
              <MapCard
                title={state.titles[index]}
                hash={hash}
                status={matchStatus?.[index]}
                onStatusChanged={(status) => saveStatus(status, index)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

type MatchMapStatus = 'normal' | 'banned' | 'p1_win' | 'p2_win';

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
  const mapLoading = useAsync(async () => {
    if (!hash) {
      return;
    }

    return beatsaverThrottle(() => getMapFromHash(hash));
  }, [hash]);

  const map = mapLoading.value;
  const cover = map?.versions?.[0]?.coverURL;

  let statusCss = 'border-black text-black';
  switch (status) {
    case 'banned':
      statusCss = 'border-gray-400 text-gray-400';
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
        ' [text-shadow:0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white,0_0_0.5vmin_white]' +
        ` flex flex-col justify-between py-[1vmin] ${statusCss}`
      }
      style={{ backgroundImage: cover ? `url(${cover})` : '' }}
      onClick={setStatus}
    >
      <p className='text-[3vmin] leading-[3vmin]'>{map?.id ?? '-'}</p>
      <p className='text-[3.5vmin] leading-[3.5vmin]'>{title ?? map?.metadata?.songName ?? '-'}</p>
      <p className='text-[2vmin] leading-[2vmin]'>{map?.metadata?.levelAuthorName ?? '-'}</p>
    </div>
  );
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  return response.json();
}

export default App;
