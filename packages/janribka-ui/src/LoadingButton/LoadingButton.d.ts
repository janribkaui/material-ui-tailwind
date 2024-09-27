import { ExtendButton, ExtendButtonTypeMap } from '@janribka/ui/Button';
import { OverrideProps } from '@janribka/ui/OverridableComponent';

export interface LoadingButtonOwnProps {
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading?: boolean;
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator?: React.ReactNode;
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition?: 'start' | 'end' | 'center';
}

export type LoadingButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> = ExtendButtonTypeMap<{
  props: AdditionalProps & LoadingButtonOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Button Group](https://mui.com/material-ui/react-button-group/)
 * - [Button](https://mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [LoadingButton API](https://mui.com/material-ui/api/loading-button/)
 * - inherits [Button API](https://mui.com/material-ui/api/button/)
 */
declare const LoadingButton: ExtendButton<LoadingButtonTypeMap>;

export type LoadingButtonProps<
  RootComponent extends React.ElementType = LoadingButtonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<LoadingButtonTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export default LoadingButton;
