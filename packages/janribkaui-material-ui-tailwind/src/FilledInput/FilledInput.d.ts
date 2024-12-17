import { InternalStandardProps as StandardProps, Theme } from '../';
import { InputBaseProps } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps> {
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * If `true`, the input will not have an underline.
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
 * - [FilledInput API](https://mui.com/material-ui/api/filled-input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 */
declare const FilledInput: ((props: FilledInputProps) => React.JSX.Element) & { jrName: string };

export default FilledInput;
