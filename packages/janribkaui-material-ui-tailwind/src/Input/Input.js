'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import deepmerge from '@mui/utils/deepmerge';
import refType from '@mui/utils/refType';
import InputBase from '../InputBase';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from 'styled-components';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import inputClasses, { getInputUtilityClass } from './inputClasses';
import {
  rootOverridesResolver as inputBaseRootOverridesResolver,
  inputOverridesResolver as inputBaseInputOverridesResolver,
  InputBaseRoot,
  InputBaseInput,
} from '../InputBase/InputBase';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';
import { color } from '@janribkaui/system';

const InputRoot = styled(InputBaseRoot)``;

const inputRootVariants = tv({
  base: ['border-b-[rgba(0, 0, 0, 0.42)] dark:border-b-[rgba(255, 255, 255, 0.7)]', 'relative'],
  variants: {
    formControl: {
      true: ['[&:has(+label) + &]:mt-[16px]'],
      false: [],
    },
    disableUnderline: {
      true: [],
      false: [],
    },
    color: {},
  },
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
      className=""
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
  Input.muiName = 'Input';
}

export default Input;
