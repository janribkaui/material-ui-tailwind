'use client';
import * as React from 'react';

import { useTheme as useThemeSystem } from '@janribka/system';

import { Theme } from './createTheme';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

export default function useTheme<T = Theme>(): T {
  const theme = useThemeSystem(defaultTheme);

  if (process.env.NODE_ENV !== 'production') {
    React.useDebugValue(theme);
  }

  return (theme as any)[THEME_ID] || theme;
}
