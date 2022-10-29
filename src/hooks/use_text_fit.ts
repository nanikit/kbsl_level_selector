import { RefObject, useEffect } from 'react';

export function useTextFit(
  ref: RefObject<HTMLElement>,
  options: { maxWidth: number; maxHeight: number; maxSize: number },
  deps?: unknown[],
) {
  const p = ref.current;
  const span = p?.querySelector('span');
  const { clientHeight, clientWidth } = span ?? {};
  const { maxWidth, maxHeight, maxSize } = options;

  useEffect(() => {
    if (p) {
      twoLineTextFill(p, options);
    }
  }, [clientHeight, clientWidth, maxWidth, maxHeight, maxSize, ...(deps ?? [])]);
}

function twoLineTextFill(
  element: HTMLElement,
  { maxWidth, maxHeight, maxSize }: { maxWidth: number; maxHeight: number; maxSize: number },
) {
  const span = element.querySelector('span')!;
  let fontSize = Math.min(maxWidth, maxHeight, maxSize);
  let textHeight;
  let textWidth;
  do {
    element.style.fontSize = `${fontSize}px`;
    element.style.lineHeight = `${fontSize * 1.1}px`;
    textHeight = span.offsetHeight;
    textWidth = span.offsetWidth;
    fontSize = fontSize - 1;
  } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
}
