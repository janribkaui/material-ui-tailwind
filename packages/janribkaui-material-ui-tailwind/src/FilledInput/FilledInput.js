'use client';
import * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';
import refType from '@mui/utils/refType';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import InputBase from '../InputBase';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from 'styled-components';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import filledInputClasses, { getFilledInputUtilityClass } from './filledInputClasses';
import {
  rootOverridesResolver as inputBaseRootOverridesResolver,
  inputOverridesResolver as inputBaseInputOverridesResolver,
  InputBaseRoot,
  InputBaseInput,
} from '../InputBase/InputBase';
import { capitalize } from '../utils';
import { tv } from 'tailwind-variants';

const FilledInputRoot = styled(InputBaseRoot)``;

const filledInputRootVariants = tv({
  base: ['relative', 'bg-filledInput-bg dark:bg-filledInput-bg'],
});

const FilledInputInput = styled(InputBaseInput, {
  name: 'MuiFilledInput',
  slot: 'Input',
  overridesResolver: inputBaseInputOverridesResolver,
})(
  memoTheme(({ theme }) => ({
    paddingTop: 25,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    ...(!theme.vars && {
      '&:-webkit-autofill': {
        WebkitBoxShadow: theme.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
        WebkitTextFillColor: theme.palette.mode === 'light' ? null : '#fff',
        caretColor: theme.palette.mode === 'light' ? null : '#fff',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      },
    }),
    ...(theme.vars && {
      '&:-webkit-autofill': {
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      },
      [theme.getColorSchemeSelector('dark')]: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #266798 inset',
          WebkitTextFillColor: '#fff',
          caretColor: '#fff',
        },
      },
    }),
    variants: [
      {
        props: {
          size: 'small',
        },
        style: {
          paddingTop: 21,
          paddingBottom: 4,
        },
      },
      {
        props: ({ ownerState }) => ownerState.hiddenLabel,
        style: {
          paddingTop: 16,
          paddingBottom: 17,
        },
      },
      {
        props: ({ ownerState }) => ownerState.startAdornment,
        style: {
          paddingLeft: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.endAdornment,
        style: {
          paddingRight: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.hiddenLabel && ownerState.size === 'small',
        style: {
          paddingTop: 8,
          paddingBottom: 9,
        },
      },
      {
        props: ({ ownerState }) => ownerState.multiline,
        style: {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    ],
  })),
);

const FilledInput = React.forwardRef(function FilledInput(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiFilledInput' });

  const {
    disableUnderline = false,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    hiddenLabel, // declare here to prevent spreading to DOM
    inputComponent = 'input',
    multiline = false,
    slotProps,
    slots = {},
    type = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    disableUnderline,
    fullWidth,
    inputComponent,
    multiline,
    type,
  };

  const filledInputComponentsProps = { root: { ownerState }, input: { ownerState } };

  const componentsProps =
    (slotProps ?? componentsPropsProp)
      ? deepmerge(filledInputComponentsProps, slotProps ?? componentsPropsProp)
      : filledInputComponentsProps;

  const RootSlot = slots.root ?? components.Root ?? FilledInputRoot;
  const InputSlot = slots.input ?? components.Input ?? FilledInputInput;

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

if (FilledInput) {
  FilledInput.jrName = 'Input';
}

export default FilledInput;
