'use client';

export default function internal_processStyles(
  tag: React.ElementType,
  processor: (styles: any) => any,
): void {
  // Emotion attaches all the styles as `__emotion_styles`.
  // Ref: https://github.com/emotion-js/emotion/blob/16d971d0da229596d6bcc39d282ba9753c9ee7cf/packages/styled/src/base.js#L186
  if (Array.isArray((tag as any).__emotion_styles)) {
    (tag as any).__emotion_styles = processor((tag as any).__emotion_styles);
  }
}
