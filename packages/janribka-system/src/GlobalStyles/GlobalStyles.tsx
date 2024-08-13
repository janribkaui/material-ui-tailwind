import { GlobalStyles as MuiGlobalStyles } from '@janribka/styled-engine';

import { Theme as SystemTheme } from '../createTheme';
import useTheme from '../useTheme';
import { GlobalStylesProps } from './GlobalStylesProps';

function GlobalStyles<Theme = SystemTheme>({
  styles,
  themeId,
  defaultTheme = {},
}: GlobalStylesProps<Theme>) {
  const upperTheme = useTheme(defaultTheme);

  const globalStyles =
    typeof styles === 'function'
      ? styles(themeId ? (upperTheme as any)[themeId] || upperTheme : upperTheme)
      : styles;

  return <MuiGlobalStyles styles={globalStyles as any} />;
}

export default GlobalStyles;
