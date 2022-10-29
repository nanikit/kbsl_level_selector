import { HTMLProps, MutableRefObject, useEffect, useRef } from 'react';
import { useMeasure } from 'react-use';

export function TwoLineFittedText({
  children,
  options,
  ...props
}: {
  options: { maxWidth: number; maxHeight: number; maxSize: number };
} & HTMLProps<HTMLParagraphElement>) {
  const ref = useRef(null);
  const [spanRef, { width, height }] = useMeasure();
  const p = ref.current;
  const { maxWidth, maxHeight, maxSize } = options;

  useEffect(() => {
    if (p) {
      twoLineTextFill(p, options);
    }
  }, [children, p, width, height, maxWidth, maxHeight, maxSize]);

  return (
    <p ref={ref} {...props}>
      <span
        ref={spanRef as unknown as MutableRefObject<HTMLElement>}
        className='font-light whitespace-pre-line'
      >
        {children}
      </span>
    </p>
  );
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
