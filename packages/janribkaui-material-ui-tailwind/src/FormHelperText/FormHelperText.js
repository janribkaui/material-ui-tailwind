'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

// function round(value) {
//   return Math.round(value * 1e5) / 1e5;
// }

const FormHelperTextRoot = styled.p``;

const formHelperTextRootVariants = tv({
  base: [
    'text-text-secondary',
    'font-normal', // V2: Replace with caption from createTypography
    'text-[0.75rem]', // V2: Replace with caption from createTypography
    'leading-[1.66]', // V2: Replace with caption from createTypography
    // `tracking-[${round(0.4 / 12)}em]`, // V2: Replace with caption from createTypography
    `tracking-[0.03333em]`, // V2: Replace with caption from createTypography
    'text-left',
    'mt-[0.188rem]',
    'mr-0',
    'mb-0',
    'ml-0',
    'disabled:text-text-disabled',
  ],
  variants: {
    error: {
      true: ['text-error'],
      false: [],
    },
    size: {
      small: ['mt-[0.25rem]'],
      medium: [],
    },
    contained: {
      true: ['ml-[0.875rem]', 'mr-[0.875rem]'],
      false: [],
    },
  },
});

const FormHelperText = React.forwardRef(function FormHelperText(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrFormHelperText' });
  const {
    children,
    className,
    component = 'p',
    disabled,
    error,
    filled,
    focused,
    margin,
    required,
    variant,
    ...other
  } = props;

  const jrFormControl = useFormControl();
  const fcs = formControlState({
    props,
    jrFormControl,
    states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
  });

  return (
    <FormHelperTextRoot
      as={component}
      disabled={fcs.disabled}
      className={mergeStyles(
        'JrFormHelperText-root',
        formHelperTextRootVariants({
          error: fcs.error,
          size: fcs.size,
          contained: fcs.variant === 'filled' || fcs.variant === 'outlined',
        }),
        className,
        '',
      )}
      ref={ref}
      {...other}
    >
      {children === ' ' ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        <span className="notranslate">&#8203;</span>
      ) : (
        children
      )}
    </FormHelperTextRoot>
  );
});

FormHelperText.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children: PropTypes.node,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default FormHelperText;
