'use client';
import * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';
import InputBase from '../InputBase';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import { InputBaseRoot, InputBaseInput } from '../InputBase/InputBase';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const InputRoot = styled(InputBaseRoot)`
  .hover {
    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      // TODO: Use tailwind hover-none instead
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    }
  }

  .hover-dark {
    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      // TODO: Use tailwind hover-none instead
      border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    }
  }
`;

const inputRootVariants = tv({
  base: [
    'border-b-[rgba(0, 0, 0, 0.42)] dark:border-b-[rgba(255, 255, 255, 0.7)]',
    'relative',
    'before:border-b-[1px] before:border-b-solid',
    'before:border-b-[rgba(0, 0, 0, 0.42)] dark:border-b-[rgba(255, 255, 255, 0.7)]',
    'before:left-0',
    'before:bottom-0',
    'before:right-0',
    "before:content-['\\00a0']",
    'before:absolute',
    'before:transition-border-bottom-color before:duration-shorter',
    'before:pointer-events-none',
    'hover-not-has-[input:disabled]:border-b-[2px] hover-not-has-[input:disabled]:border-b-solid hover-not-has-[input:disabled]:border-b-text-primary',
    'hover-not-has-[input:disabled]:hover dark:hover-not-has-[input:disabled]:hover-dark',
    'has-[input:disabled]:border-b-dotted',
  ],
  variants: {
    formControl: {
      true: ['[&:has(+label) + &]:mt-[16px]'],
      false: [],
    },
    disableUnderline: {
      true: [
        "after:left-0 after:bottom-0 after:right-0 after:content-[''] after:absolute after:scale-x-0",
        'after:transition-transform after:duration-shorter after:ease-out',
        'has-[input:focused]:after:scale-x-100 has-[input:focused]:after:translate-x-0',
      ],
      false: [],
    },
    error: {
      true: ['before:border-b-error', 'after:border-b-error'],
      false: [
        'hover:before:border-b-[2px] hover:before:border-b-solid hover:before:border-b-text-primary',
        'hover:hover dark:hover:hover-dark',
      ],
    },
    color: {
      primary: [],
      secondary: [],
      info: [],
      success: [],
      warning: [],
      error: [],
    },
  },
  compoundVariants: [
    {
      disableUnderline: false,
      color: 'primary',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-primary',
    },
    {
      disableUnderline: false,
      color: 'secondary',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-secondary',
    },
    {
      disableUnderline: false,
      color: 'info',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-info',
    },
    {
      disableUnderline: false,
      color: 'success',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-success',
    },
    {
      disableUnderline: false,
      color: 'warning',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-warning',
    },
    {
      disableUnderline: false,
      color: 'error',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-error',
    },
  ],
  defaultVariants: { formControl: false, disableUnderline: false },
});

const InputInput = styled(InputBaseInput)``;

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrInput' });
  const {
    disableUnderline = false,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    slotProps,
    slots = {},
    type = 'text',
    ...other
  } = props;

  const ownerState = { disableUnderline };
  const inputComponentsProps = { root: { ownerState } };

  const componentsProps =
    (slotProps ?? componentsPropsProp)
      ? deepmerge(slotProps ?? componentsPropsProp, inputComponentsProps)
      : inputComponentsProps;

  const inputRoot = React.cloneElement(InputRoot, {
    className: mergeStyles(
      'JrInput-root',
      inputRootVariants({
        formControl: props.formControl,
        disableUnderline: props.disableUnderline,
      }),
    ),
  });

  const inputInput = React.cloneElement(InputInput, {
    className: 'JrInput-input',
  });

  const RootSlot = slots.root ?? components.Root ?? inputRoot;
  const InputSlot = slots.input ?? components.Input ?? inputInput;
  React.cloneElement;
  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      slotProps={componentsProps}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
    />
  );
});

if (Input) {
  Input.jrName = 'Input';
}

export default Input;
