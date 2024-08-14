'use client';
import * as React from 'react';

import { ThemeContext } from '@janribka/styled-engine';

function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

function useThemeWithoutDefault<T = null>(defaultTheme: T): T {
  const contextTheme = React.useContext(ThemeContext);

  return (!contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme) as T;
}

export default useThemeWithoutDefault;
