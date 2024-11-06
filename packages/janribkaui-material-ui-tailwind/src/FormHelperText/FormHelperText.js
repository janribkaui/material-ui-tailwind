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
  base: ['text-text-secondary'],
});

const FormHelperText = React.forwardRef(function FormHelperText(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiFormHelperText' });
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
      className={mergeStyles(formHelperTextRootVariants({}), className)}
      disabled={fcs.disabled}
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
