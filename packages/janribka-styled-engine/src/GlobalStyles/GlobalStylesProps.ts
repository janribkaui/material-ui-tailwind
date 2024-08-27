import { Interpolation } from '@emotion/react';

export interface GlobalStylesProps<Theme = {}> {
  defaultTheme?: object;
  styles: Interpolation<Theme>;
}
