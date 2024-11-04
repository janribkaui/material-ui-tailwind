'use client';
import * as React from 'react';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStyles } from '../utils';
import { tv } from 'tailwind-variants';

const FormLabelRoot = styled.label``;

const formLabelRootVariants = tv({});

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
      className={mergeStyles('JrFormLabel-root', formLabelRootVariants({}), className)}
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

export default FormLabel;
