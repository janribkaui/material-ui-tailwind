import * as React from 'react';
import { ThemeProviderProps } from './ThemeProviderProps';
/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 *
 * <ThemeProvider theme={theme}> // existing use case
 * <ThemeProvider theme={{ id: theme }}> // theme scoping
 */
declare function ThemeProvider(props: ThemeProviderProps): React.JSX.Element;
export default ThemeProvider;
