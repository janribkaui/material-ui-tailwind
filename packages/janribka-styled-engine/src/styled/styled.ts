import emStyled, { FilteringStyledOptions } from '@emotion/styled';

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
