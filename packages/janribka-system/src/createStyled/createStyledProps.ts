import {
  CreateJRStyled as CreateJRStyledStyledEngine,
  CSSInterpolation,
} from '@janribka/styled-engine';

import { Theme as DefaultTheme } from '../createTheme';

export interface JRStyledCommonProps<Theme extends object = DefaultTheme> {
  theme?: Theme;
  as?: React.ElementType;
  //   sx?: SxProps<Theme>;
}

export interface JRStyledOptions {
  name?: string;
  slot?: string;
  // The difference between Interpolation and CSSInterpolation is that the former supports functions based on props
  // If we want to support props in the overrides, we will need to change the CSSInterpolation to Interpolation<Props>
  overridesResolver?: (props: any, styles: Record<string, CSSInterpolation>) => CSSInterpolation;
  skipVariantsResolver?: boolean;
  //   skipSx?: boolean;
}

export type CreateJRStyled<Theme extends object = DefaultTheme> = CreateJRStyledStyledEngine<
  JRStyledCommonProps<Theme>,
  JRStyledOptions,
  Theme
>;
