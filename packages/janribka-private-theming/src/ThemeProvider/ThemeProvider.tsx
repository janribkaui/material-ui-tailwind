import * as React from 'react';

import { DefaultTheme } from '../defaultTheme';
import useTheme from '../useTheme';
import ThemeContext from '../useTheme/ThemeContext';
import nested from './nested';
import { ThemeProviderProps } from './ThemeProviderProps';

// To support composition of theme.
function mergeOuterLocalTheme(
  outerTheme: DefaultTheme,
  localTheme: Partial<DefaultTheme> | ((outerTheme: DefaultTheme) => DefaultTheme),
) {
  if (typeof localTheme === 'function') {
    const mergedTheme = localTheme(outerTheme);

    if (process.env.NODE_ENV !== 'production') {
      if (!mergedTheme) {
        console.error(
          [
            'MUI: You should return an object from your theme function, i.e.',
            '<ThemeProvider theme={() => ({})} />',
          ].join('\n'),
        );
      }
    }

    return mergedTheme;
  }

  return { ...outerTheme, ...localTheme };
}

/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme: localTheme } = props;
  const outerTheme = useTheme();

  if (process.env.NODE_ENV !== 'production') {
    if (outerTheme === null && typeof localTheme === 'function') {
      console.error(
        [
          'MUI: You are providing a theme function prop to the ThemeProvider component:',
          '<ThemeProvider theme={outerTheme => outerTheme} />',
          '',
          'However, no outer theme is present.',
          'Make sure a theme is already injected higher in the React tree ' +
            'or provide a theme object.',
        ].join('\n'),
      );
    }
  }

  const theme = React.useMemo(() => {
    const output =
      outerTheme === null ? { ...localTheme } : mergeOuterLocalTheme(outerTheme, localTheme);

    if (output != null) {
      output[nested] = outerTheme !== null;
    }

    return output;
  }, [localTheme, outerTheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;