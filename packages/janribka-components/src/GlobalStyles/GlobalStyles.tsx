'use client';

import {
  GlobalStyles as SystemGlobalStyles,
  GlobalStylesProps as StyledGlobalStylesProps,
} from '@janribka/system';

import { Theme } from '../styles';
import defaultTheme from '../styles/defaultTheme';
import THEME_ID from '../styles/identifier';

// Types
export interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: StyledGlobalStylesProps<Theme>['styles'];
}

// Content
/**
 *
 * Demos:
 *
 * - [How to customize](https://next.mui.com/material-ui/customization/how-to-customize/)
 *
 * API:
 *
 * - [GlobalStyles API](https://next.mui.com/material-ui/api/global-styles/)
 */
function GlobalStyles(props: GlobalStylesProps): React.ReactElement<unknown> {
  return <SystemGlobalStyles {...props} defaultTheme={defaultTheme} themeId={THEME_ID} />;
}

export default GlobalStyles;
