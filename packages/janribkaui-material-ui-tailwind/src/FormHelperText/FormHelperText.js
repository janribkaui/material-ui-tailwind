'use client';
import * as React from 'react';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const FormHelperTextRoot = styled.p``;

const formHelperTextRootVariants = tv({
  base: [
    'text-text-secondary',
    'font-normal', // V2: Replace with caption from createTypography
    'text-[0.75rem]', // V2: Replace with caption from createTypography
    'leading-[1.66rem]', // V2: Replace with caption from createTypography
    `tracking-[${round(0.4 / 12)}em]`, // V2: Replace with caption from createTypography
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

export default FormHelperText;
