'use client';
import * as React from 'react';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import FormLabel from '../FormLabel';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const InputLabelRoot = styled(FormLabel)``;

const inputLabelRootVariants = tv({
  base: [
    'block',
    'origin-top-left',
    'whitespace-nowrap',
    'overflow-hidden',
    'text-ellipsis',
    'max-w-full',
  ],
  variants: {
    formControl: {
      true: ['absolute', 'left-0', 'top-0', 'translate-[0 20px]', ' scale-100'],
      false: [],
    },
    size: {
      small: ['translate-[0 20px]', 'scale-100'],
    },
    shrink: {
      true: ['translate-[0 -1,5px]', 'scale-75', 'origin-top-left', 'max-w-[133%]'],
      false: [],
    },
    disableAnimation: {
      true: [],
      false: [
        'transition-color duration-shorter ease-out',
        'transition-transform duration-shorter ease-out',
        'transition-max-width duration-shorter ease-out',
      ],
    },
    variant: {
      filled: [
        // Chrome's autofill feature gives the input field a yellow background.
        // Since the input field is behind the label in the HTML tree,
        // the input field is drawn last and hides the label with an opaque background color.
        // zIndex: 1 will raise the label above opaque background-colors of input.
        'z-[1]',
        'pointer-events-none',
        'translate-[12px 16px]',
        'scale-100',
        'max-w-[calc(100% - 24px)]',
      ],
      outlined: [
        // see comment above on filled.zIndex
        'z-[1]',
        'pointer-events-none',
        'translate-[14px 16px]',
        'scale-100',
        'max-w-[calc(100% - 24px)]',
      ],
    },
    size: {
      small: '',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      size: 'small',
      className: ['translate-[12px 13px]', 'scale-100'],
    },
    {
      variant: 'filled',
      shrink: true,
      className: [
        'select-none',
        'pointer-events-auto',
        'translate-[12px 7px]',
        'scale-75',
        'max-w-[calc(100% - 24px)]',
      ],
    },
    {
      variant: 'filled',
      shrink: true,
      size: 'small',
      className: ['translate-[12px 4px]', 'scale-75'],
    },
    {
      variant: 'outlined',
      size: 'small',
      className: ['translate-[14px 9px]', 'scale-100'],
    },
    {
      variant: 'outlined',
      shrink: true,
      className: [
        'translate-[14px -9px]',
        'scale-75',
        // Theoretically, we should have (8+5)*2/0.75 = 34px
        // but it feels a better when it bleeds a bit on the left, so 32px.
        'max-w-[calc(133% - 24px)]',
      ],
    },
  ],
});

const InputLabel = React.forwardRef(function InputLabel(inProps, ref) {
  const props = useDefaultProps({ name: 'JrInputLabel', props: inProps });
  const {
    disableAnimation = false,
    margin,
    shrink: shrinkProp,
    variant,
    className,
    ...other
  } = props;

  const jrFormControl = useFormControl();

  let shrink = shrinkProp;
  if (typeof shrink === 'undefined' && jrFormControl) {
    shrink = jrFormControl.filled || jrFormControl.focused || jrFormControl.adornedStart;
  }

  const fcs = formControlState({
    props,
    jrFormControl,
    states: ['size', 'variant', 'required', 'focused'],
  });

  return (
    <InputLabelRoot
      data-shrink={shrink}
      ref={ref}
      className={mergeStyles(
        'JrInputLabel-root',
        inputLabelRootVariants({
          formControl: !!jrFormControl,
          size: fcs.size,
          shrink,
          disableAnimation,
          variant: fcs.variant,
          size: fcs.variant,
        }),
        className,
      )}
      {...other}
    />
  );
});

export default InputLabel;
