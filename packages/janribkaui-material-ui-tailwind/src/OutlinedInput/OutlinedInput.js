'use client';
import * as React from 'react';
import NotchedOutline from './NotchedOutline';
import useFormControl from '../FormControl/useFormControl';
import formControlState from '../FormControl/formControlState';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import InputBase, { InputBaseRoot, InputBaseInput } from '../InputBase/InputBase';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const OutlinedInputRoot = styled(InputBaseRoot)``;

const outlinedInputRootVariants = tv({});

const NotchedOutlineRoot = styled(NotchedOutline)``;

const notchedOutlineRootVariants = tv({});

const OutlinedInputInput = styled(InputBaseInput)``;

const outlinedInputInputVariants = tv({});

const OutlinedInput = React.forwardRef(function OutlinedInput(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiOutlinedInput' });
  const {
    components = {},
    fullWidth = false,
    inputComponent = 'input',
    label,
    multiline = false,
    notched,
    slots = {},
    type = 'text',
    ...other
  } = props;

  const classes = useUtilityClasses(props);

  const jrFormControl = useFormControl();
  const fcs = formControlState({
    props,
    jrFormControl,
    states: ['color', 'disabled', 'error', 'focused', 'hiddenLabel', 'size', 'required'],
  });

  const outlinedInputRoot = React.forwardRef(OutlinedInputRoot, {
    className: mergeStyles('JrOutlinedInput-root', outlinedInputRootVariants({})),
  });

  const outlinedInputInput = React.forwardRef(OutlinedInputInput, {
    className: mergeStyles('JrOutlinedInput-input', outlinedInputInputVariants({})),
  });

  const RootSlot = slots.root ?? components.Root ?? outlinedInputRoot;
  const InputSlot = slots.input ?? components.Input ?? outlinedInputInput;

  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      renderSuffix={(state) => (
        <NotchedOutlineRoot
          className={mergeStyles('JrOutlinedInput-notchedOutline', notchedOutlineRootVariants({}))}
          label={
            label != null && label !== '' && fcs.required ? (
              <React.Fragment>
                {label}
                &thinsp;{'*'}
              </React.Fragment>
            ) : (
              label
            )
          }
          notched={
            typeof notched !== 'undefined'
              ? notched
              : Boolean(state.startAdornment || state.filled || state.focused)
          }
        />
      )}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
    />
  );
});

if (OutlinedInput) {
  OutlinedInput.jrName = 'Input';
}

export default OutlinedInput;
