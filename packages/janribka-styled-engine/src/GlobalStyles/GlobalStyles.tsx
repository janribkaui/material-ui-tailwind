'use client';

import { Global, Interpolation } from '@emotion/react';

// Types
export interface GlobalStylesProps<Theme = {}> {
  defaultTheme?: Theme;
  styles: Interpolation<Theme>;
}

// Content
function isEmpty<Theme = {}>(obj: Theme) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

export default function GlobalStyles<Theme = {}>(
  props: GlobalStylesProps<Theme>,
): React.ReactElement<any> {
  const { styles, defaultTheme = {} } = props;

  const globalStyles =
    typeof styles === 'function'
      ? (themeInput: Theme) =>
          styles(isEmpty(themeInput as Theme) ? (defaultTheme as Theme) : (themeInput as Theme))
      : styles;

  return <Global styles={globalStyles as Interpolation} />;
}
