'use client';
import * as React from 'react';

import {
  DefaultTheme,
  ThemeProvider as JrThemeProvider,
  useTheme as usePrivateTheme,
} from '@janribka/private-theming';
import { ThemeContext as StyledEngineThemeContext } from '@janribka/styled-engine';

import DefaultPropsProvider from '../DefaultPropsProvider';
import RtlProvider from '../RtlProvider/RtlProvider';
import useThemeWithoutDefault from '../useThemeWithoutDefault';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  /**
   * Your component tree.
   */
  children?: React.ReactNode;
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId?: string;
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

// Content

const EMPTY_THEME = {};

function useThemeScoping(
  themeId?: string,
  upperTheme?: { [key: string]: any },
  localTheme?: Partial<DefaultTheme>,
  isPrivate = false,
) {
  return React.useMemo(() => {
    const resolvedTheme = themeId ? upperTheme?.[themeId] || upperTheme : upperTheme;

    if (typeof localTheme === 'function') {
      const mergedTheme = localTheme(resolvedTheme);
      const result = themeId ? { ...upperTheme, [themeId]: mergedTheme } : mergedTheme;
      // must return a function for the private theme to NOT merge with the upper theme.
      // see the test case "use provided theme from a callback" in ThemeProvider.test.js
      if (isPrivate) {
        return () => result;
      }
      return result;
    }
    return themeId ? { ...upperTheme, [themeId]: localTheme } : { ...upperTheme, ...localTheme };
  }, [themeId, upperTheme, localTheme, isPrivate]);
}

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 *
 * <ThemeProvider theme={theme}> // existing use case
 * <ThemeProvider theme={{ id: theme }}> // theme scoping
 */
function ThemeProvider<T = DefaultTheme>(
  props: ThemeProviderProps,
): React.ReactElement<ThemeProviderProps<T>> {
  // Props
  const { children, theme: localTheme, themeId, ...restProps } = props;

  const upperTheme = useThemeWithoutDefault<{ [key: string]: any }>(EMPTY_THEME);
  const upperPrivateTheme = usePrivateTheme() || EMPTY_THEME;

  if (process.env.NODE_ENV !== 'production') {
    if (
      (upperTheme === null && typeof localTheme === 'function') ||
      (themeId && upperTheme && !upperTheme[themeId] && typeof localTheme === 'function')
    ) {
      console.error(
        [
          'JR: You are providing a theme function prop to the ThemeProvider component:',
          '<ThemeProvider theme={outerTheme => outerTheme} />',
          '',
          'However, no outer theme is present.',
          'Make sure a theme is already injected higher in the React tree ' +
            'or provide a theme object.',
        ].join('\n'),
      );
    }
  }

  const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
  const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
  const rtlValue = engineTheme.direction === 'rtl';

  return (
    <JrThemeProvider theme={privateTheme}>
      <StyledEngineThemeContext.Provider value={engineTheme}>
        <RtlProvider value={rtlValue}>
          <DefaultPropsProvider value={engineTheme?.components} />
        </RtlProvider>
      </StyledEngineThemeContext.Provider>
    </JrThemeProvider>
  );
}

export default ThemeProvider;
