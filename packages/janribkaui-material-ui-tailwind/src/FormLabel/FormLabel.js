'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStyles } from '../utils';
import { tv } from 'tailwind-variants';

// function round(value) {
//   return Math.round(value * 1e5) / 1e5;
// }

const FormLabelRoot = styled.label``;

const formLabelRootVariants = tv({
  base: [
    'text-text-secondary',
    'font-normal', // V2: Replace with body1 from createTypography
    'text-[1rem]', // V2: Replace with body1 from createTypography
    //'leading-[1.5rem]', // V2: Replace with body1 from createTypography
    // `tracking-[${round(0.15 / 16)}em]`, // V2: Replace with body1 from createTypography
    'tracking-[0.00938em]', // V2: Replace with body1 from createTypography
    'leading-[1.4375em]',
    'p-0',
    'relative',
    'disabled:text-text-disabled',
  ],
  variants: {
    color: {
      primary: '',
      secondary: '',
      info: '',
      success: '',
      warning: '',
      error: '',
      // inherit: '',
    },
    focused: {
      true: [],
      false: [],
    },
    error: {
      true: ['text-error'],
      false: [],
    },
  },
  compoundVariants: [
    { focused: true, error: false, color: 'primary', className: ['text-primary'] },
    { focused: true, error: false, color: 'secondary', className: ['text-primary'] },
    { focused: true, error: false, color: 'info', className: ['text-primary'] },
    { focused: true, error: false, color: 'success', className: ['text-primary'] },
    { focused: true, error: false, color: 'warning', className: ['text-primary'] },
    { focused: true, error: false, color: 'error', className: ['text-primary'] },
    { focused: true, error: false, color: 'primary', className: ['text-primary'] },
  ],
});

const AsteriskComponent = styled.span``;

const asteriskComponentsVariant = tv({
  variants: {
    error: {
      true: ['text-error'],
      false: [],
    },
  },
});

const FormLabel = React.forwardRef(function FormLabel(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrFormLabel' });
  const {
    children,
    className,
    color,
    component = 'label',
    disabled,
    error = false,
    filled,
    focused,
    required,
    ...other
  } = props;

  const jrFormControl = useFormControl();
  const fcs = formControlState({
    props,
    jrFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
  });

  return (
    <FormLabelRoot
      as={component}
      disabled={fcs.disabled}
      className={mergeStyles(
        'JrFormLabel-root',
        formLabelRootVariants({
          color: fcs.color || 'primary',
          error: fcs.error,
          focused: fcs.focused,
        }),
        className,
      )}
      ref={ref}
      {...other}
    >
      {children}
      {fcs.required && (
        <AsteriskComponent
          aria-hidden
          className={mergeStyles(
            'JrFormLabel-asterisk',
            asteriskComponentsVariant({ error: fcs.error }),
          )}
        >
          &thinsp;{'*'}
        </AsteriskComponent>
      )}
    </FormLabelRoot>
  );
});

FormLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
};

export default FormLabel;
