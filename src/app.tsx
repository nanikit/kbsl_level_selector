import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import OneToOneMatchStatus from './components/one_to_one_match_status';
import {
  getMatchFromPlaylist,
  MatchMapStatus,
  useMatchInformation,
} from './hooks/local_storage_hooks';
import { BeatsaverMap, Difficulty, getDataUrlFromHash } from './services/beatsaver';

export function App() {
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
    saveMatch({ ...match, lastCursorIndex: index, matchResult });
  };

  useQuery(['./map_pool.json'], {
    onSuccess: (data) => {
      saveMatch({ ...match, ...getMatchFromPlaylist(data) });
    },
    enabled: !match.host,
  });

  const { title, description, host, levels, matchResult, lastCursorIndex } = match;
  const pickedIndex = matchResult?.findIndex((x) => x === 'picked');
  const pickedLevel = levels[pickedIndex];
  const columnCounts = [
    [],
    [1],
    [2],
    [3],
    [2, 2],
    [3, 2],
    [3, 3],
    [2, 3, 2],
    [3, 2, 3],
    [3, 3, 3],
    [3, 4, 3],
    [3, 3, 3, 2],
    [4, 4, 4],
    [4, 3, 3, 3],
  ][levels.length];
  const columnSliceIndices = columnCounts.reduce(
    (acc, elem) => (acc.push(acc[acc.length - 1] + elem), acc),
    [0],
  );
  const has4Column = Math.max(...columnCounts) >= 4;

  return (
    <main>
      <div className='bg-[url(/bg.png)] w-full aspect-[16/9] bg-cover flex flex-col'>
        <div className='flex-[28_1_0] flex flex-col flex-nowrap items-center font-[esamanru,"Pretendard_Variable"] pt-2 text-white'>
          <p className='text-[2vw] mt-7'>{host}</p>
          <p className='text-[3.5vw] leading-[3.5vw] font-bold'>
            {title || (
              <>
                제3회 <span className='text-[#FFC6ED]'>전자칼잽이</span> 대전
              </>
            )}
          </p>
          <p className='text-[2.5vw] leading-[3vw]'>{description}</p>
        </div>

        <div
          className={`flex-[72_1_0] px-[4vw] flex flex-col justify-center ${
            columnCounts.length >= 4 ? 'pb-[2vw]' : 'pb-[6vw]'
          }`}
        >
          {columnCounts.map((_, rowIndex) => (
            <div key={rowIndex} className='flex h-[10.3vw] justify-center'>
              {levels
                .slice(columnSliceIndices[rowIndex], columnSliceIndices[rowIndex + 1])
                .map(({ hash, difficulty }, columnIndex) => {
                  const index = columnSliceIndices[rowIndex] + columnIndex;
                  return (
                    <div
                      key={`${hash}-${columnIndex}`}
                      className={`flex-[0_0] p-[0.5vw] ${has4Column ? 'basis-1/4' : 'basis-1/3'}`}
                    >
                      <MapCard
                        title={match.titles[index]}
                        hash={hash}
                        difficulty={difficulty}
                        status={matchResult?.[index]}
                        highlight={lastCursorIndex === index}
                        onStatusChanged={(status) => saveStatus(status, index)}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
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
  highlight,
  onStatusChanged,
}: {
  title?: string;
  hash?: string;
  difficulty?: Difficulty;
  status?: MatchMapStatus;
  highlight?: boolean;
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
      statusCss = `${
        highlight ? 'cone [--cone-color1:blue] [--cone-color2:cyan]' : 'bg-gray-400'
      } text-gray-400`;
      statusCss = `${
        highlight
          ? 'cone-glow [--cone-color1:hsl(0,0%,30%)] [--cone-color2:hsl(0,0%,70%)]'
          : 'bg-gray-400'
      } text-gray-400`;
      break;
    case 'picked':
      statusCss = `${
        highlight
          ? 'cone-glow [--cone-color1:hsl(50,100%,30%)] [--cone-color2:hsl(60,100%,50%)]'
          : 'bg-yellow-400'
      } text-yellow-500`;
      break;
    case 'p1_win':
      statusCss = 'border-red-600 text-red-600';
      statusCss = `${
        highlight
          ? 'cone-glow [--cone-color1:hsl(0,100%,40%)] [--cone-color2:hsl(320,100%,70%)]'
          : 'bg-red-600'
      } text-red-600`;
      break;
    case 'p2_win':
      statusCss = `${
        highlight
          ? 'cone-glow [--cone-color1:hsl(240,100%,40%)] [--cone-color2:hsl(200,100%,70%)]'
          : 'bg-blue-600'
      } text-blue-600`;
      break;
    default:
      statusCss = 'bg-black';
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

  const inputRef = useRef<HTMLInputElement>(null);

  const copyKeyAndPick = (ev: React.MouseEvent) => {
    ev.preventDefault();
    // obs-browser: Uncaught (in promise) NotAllowedError: Write permission denied.
    navigator.clipboard.writeText(map.id);
    const input = inputRef.current;
    if (input) {
      input.value = map.id;
      input.select();
      document.execCommand('copy');
    }
    onStatusChanged?.('picked');
  };

  return (
    <div className={`w-full h-full p-[0.3vw] rounded-[1.2vw] overflow-hidden ${statusCss}`}>
      <input type='text' ref={inputRef} className='fixed top-0 left-[9999px] w-4 h-2 z-30' />
      <div
        className={
          'relative w-full h-full rounded-[1vw] bg-cover font-extrabold z-10' +
          ' [text-shadow:0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white,0_0_0.3vw_white]' +
          ` flex flex-row overflow-hidden bg-sky-100`
        }
        style={{ backgroundImage: cover ? `url(${cover})` : '' }}
        onClick={setStatus}
        onContextMenu={copyKeyAndPick}
      >
        {!!cover && (
          <>
            <img src={cover} className='absolute w-full h-full object-cover scale-150 blur-[1vw]' />
            <img src={cover} className='relative h-full aspect-square object-cover' />
          </>
        )}
        <div className='relative px-[2%] py-[1%] h-full flex flex-1 flex-col items-start font-[esamanru,"Pretendard_Variable"]'>
          <p className='text-[1.2vw] flex-1'>{map?.id ?? ''}</p>
          <p className='text-[2vw] leading-[2.2vw] inline w-full font-light overflow-hidden max-h-[4.2vw]'>
            {title ?? map?.metadata?.songName ?? '-'}
          </p>
          <div className='flex-[1_1_1.3vw] flex flex-col flex-wrap min-h-[1.3vw] justify-end'>
            <p className='text-[1.2vw] leading-[1.5vw] mr-[0.5vw] whitespace-nowrap max-w-[13vw] overflow-hidden text-ellipsis'>
              {map?.metadata?.levelAuthorName ?? ''}
            </p>
            <p className='text-[1.2vw] leading-[1.5vw]'>
              {difficulty ? (difficulty === 'ExpertPlus' ? 'Expert+' : difficulty) : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
