'use client';

import emStyled, { FilteringStyledOptions } from '@emotion/styled';

export { JRStyledComponent, SerializedStyles, CreateJRStyled } from './props';
export type { CSSInterpolation } from './props';

export default function styled(tag: any, options: FilteringStyledOptions<any, string>) {
  const stylesFactory = emStyled(tag, options);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles: any[]) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error(
          [
            `JR: Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
          ].join('\n'),
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(
          `MUI: the styled(${component})(...args) API requires all its args to be defined.`,
        );
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

export const internal_processStyles = (
  tag: React.ElementType,
  processor: (styles: any) => any,
): void => {
  // Emotion attaches all the styles as `__emotion_styles`.
  // Ref: https://github.com/emotion-js/emotion/blob/16d971d0da229596d6bcc39d282ba9753c9ee7cf/packages/styled/src/base.js#L186
  if (Array.isArray((tag as any).__emotion_styles)) {
    (tag as any).__emotion_styles = processor((tag as any).__emotion_styles);
  }
};
