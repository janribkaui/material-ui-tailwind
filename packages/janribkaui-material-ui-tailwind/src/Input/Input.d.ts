import { InternalStandardProps as StandardProps, Theme } from '../';
import { InputBaseProps } from '../InputBase';

export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline?: boolean;
}

/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [Input API](https://mui.com/material-ui/api/input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 */
declare const Input: ((props: InputProps) => React.JSX.Element) & { muiName: string };

export default Input;
