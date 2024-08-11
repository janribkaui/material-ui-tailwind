'use client';

import { Global } from '@emotion/react';

import { GlobalStylesProps } from './GlobalStylesProps';

function isEmpty(obj: object) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

export default function GlobalStyles(props: GlobalStylesProps) {
  const { styles, defaultTheme = {} } = props;

  const globalStyles =
    typeof styles === 'function'
      ? (themeInput: object) => styles(isEmpty(themeInput) ? defaultTheme : themeInput)
      : styles;

  return <Global styles={globalStyles} />;
}
