import { GlobalStylesProps as StyledGlobalStylesProps } from '@janribka/system';

import { Theme } from '../styles';

export interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: StyledGlobalStylesProps<Theme>['styles'];
}
