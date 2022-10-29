import { RefObject, useEffect } from 'react';
import { useMeasure } from 'react-use';

export function useTextFit(
  ref: RefObject<HTMLElement>,
  options: { maxWidth: number; maxHeight: number; maxSize: number },
  deps?: unknown[],
) {
  const p = ref.current;
  const span = p?.querySelector('span');
  const { maxWidth, maxHeight, maxSize } = options;

  const [spanRef, { width, height }] = useMeasure();

  useEffect(() => {
    if (span) {
      spanRef(span);
    }
  }, [span]);

  useEffect(() => {
    if (p) {
      twoLineTextFill(p, options);
    }
  }, [p, width, height, maxWidth, maxHeight, maxSize, ...(deps ?? [])]);
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
