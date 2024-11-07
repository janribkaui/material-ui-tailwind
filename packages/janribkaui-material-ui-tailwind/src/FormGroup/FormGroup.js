'use client';
import * as React from 'react';
import { useDefaultProps } from '../DefaultPropsProvider';
// import useFormControl from '../FormControl/useFormControl';
// import formControlState from '../FormControl/formControlState';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const FormGroupRoot = styled.div``;

const formGroupRootVariants = tv({
  base: ['flex', 'flex-col', 'flex-wrap'],
  variants: {
    row: {
      true: ['flex-row'],
      false: '',
    },
  },
});

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
const FormGroup = React.forwardRef(function FormGroup(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'JrFormGroup',
  });

  const { className, row = false, ...other } = props;
  // const jrFormControl = useFormControl();
  // const fcs = formControlState({
  //   props,
  //   jrFormControl,
  //   states: ['error'],
  // });

  return (
    <FormGroupRoot
      className={mergeStyles('JrFormGroup-root', formGroupRootVariants({ row }), className)}
      ref={ref}
      {...other}
    />
  );
});

export default FormGroup;
