'use client';
import createTheme, { Theme } from '../createTheme';
import useThemeWithoutDefault from '../useThemeWithoutDefault';

export const systemDefaultTheme = createTheme();

function useTheme<T = Theme>(defaultTheme: T = systemDefaultTheme as T): T {
  return useThemeWithoutDefault<T>(defaultTheme);
}

export default useTheme;
