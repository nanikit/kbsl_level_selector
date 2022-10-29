import { useRef } from 'react';
import { MatchMapStatus } from '../hooks/local_storage_hooks';
import { BeatsaverMap, Difficulty } from '../services/beatsaver';
import { useTextFit } from '../services/use_text_fit';

export function MapCard({
  title,
  hash,
  status,
  difficulty,
  highlight,
  map,
  onStatusChanged,
}: {
  title?: string;
  hash?: string;
  difficulty?: Difficulty;
  status?: MatchMapStatus;
  highlight?: boolean;
  map?: BeatsaverMap;
  onStatusChanged?: (status: MatchMapStatus) => void;
}) {
  const { versions } = map ?? {};
  const cover = (versions?.find((x) => x.hash === hash) ?? versions?.[versions.length - 1])
    ?.coverURL;
  const titleRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const copyKeyAndPick = (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (!map) {
      return;
    }

    // obs-browser: Uncaught (in promise) NotAllowedError: Write permission denied.
    navigator.clipboard.writeText(map.id);
    const input = inputRef.current;
    if (input) {
      input.value = map.id;
      input.select();
      document.execCommand('copy');
      input.blur();
    }
    onStatusChanged?.('picked');
  };

  const maxSize = document.documentElement.clientWidth * 0.02;
  useTextFit(titleRef, { maxWidth: 241, maxHeight: 54, maxSize }, [title]);

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
          <p className='text-[1.2vw]'>{map?.id ?? ''}</p>
          <div className='flex-1 flex flex-col justify-center text-[2vw] w-full font-light whitespace-pre-line'>
            <p ref={titleRef}>
              <span>
                {title ?? map?.metadata?.songName ?? '-'}
                {/* Camellia & USAO - Möbius [In Ranked Queue] */}
              </span>
            </p>
          </div>
          <div className='flex-[0_1_auto] flex flex-col flex-wrap min-h-0 justify-end gap-x-[1.5vw]'>
            <p className='text-[1.2vw]'>
              {difficulty ? (difficulty === 'ExpertPlus' ? 'Expert+' : difficulty) : ''}
            </p>
            <p className='text-[1.2vw] whitespace-nowrap max-w-[20vw] min-w-0 overflow-hidden text-ellipsis'>
              {map?.metadata?.levelAuthorName ?? ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
