'use client';

import { GlobalStyles as SystemGlobalStyles } from '@janribka/system';

import defaultTheme from '../styles/defaultTheme';
import THEME_ID from '../styles/identifier';
import { GlobalStylesProps } from './GlobalStylesProps';

function GlobalStyles(props: GlobalStylesProps) {
  return <SystemGlobalStyles {...props} defaultTheme={defaultTheme} themeId={THEME_ID} />;
}

export default GlobalStyles;
