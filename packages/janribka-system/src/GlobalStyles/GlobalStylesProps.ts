import { Interpolation } from '@janribka/styled-engine';

import { Theme as SystemTheme } from '../createTheme';

export interface GlobalStylesProps<Theme = SystemTheme> {
  styles: Interpolation<Theme>;
  defaultTheme?: object;
  themeId?: string;
}
