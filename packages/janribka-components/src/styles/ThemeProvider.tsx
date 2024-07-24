'use client';

import { ThemeProvider as SystemThemeProvider } from '@janribka/system';

import { ThemeProviderProps } from './ThemeProviderProps';

export default function ThemeProvider(props: ThemeProviderProps) {
  // Props
  const { theme: themeInput, ...restProps } = props;

  return <SystemThemeProvider />;
}
