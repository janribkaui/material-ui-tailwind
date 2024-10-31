'use client';
import * as React from 'react';
import { useFormControl } from '../FormControl';
import { useDefaultProps } from '../DefaultPropsProvider';
import Typography from '../Typography';
import formControlState from '../FormControl/formControlState';
import useSlot from '../utils/useSlot';
import { styled } from 'styled-components';
import { mergeStyles } from '../utils';
import { tv } from 'tailwind-variants';

const FormControlLabelRoot = styled.label`
  -webkit-tap-highlight-color: transparent;
`;

const formControlLabelVariants = tv({
  base: [
    'inline-flex',
    'items-center',
    'cursor-pointer',
    'align-middle',
    '-ml-[0.688rem]',
    'mr-[1rem]',
    'disabled:cursor-default',
    'has-[label:disabled]:text-text-disabled',
  ],
  variants: {
    labelPlacement: {
      start: ['flex-row-reverse', 'ml-[1rem]', 'mr-[0.688rem]'],
      top: ['flex-col-reverse', 'ml-[1rem]'],
      bottom: ['flex-col', 'ml-[1rem]'],
    },
  },
});

const AsteriskComponent = styled.span``;

const asteriskComponentVariants = tv({
  base: [],
  variants: {
    error: {
      true: ['text-error'],
      false: [],
    },
  },
});

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = React.forwardRef(function FormControlLabel(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrFormControlLabel' });
  const {
    checked,
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    inputRef,
    label: labelProp,
    labelPlacement = 'end',
    name,
    onChange,
    required: requiredProp,
    slots = {},
    slotProps = {},
    value,
    ...other
  } = props;

  const jrFormControl = useFormControl();

  const disabled = disabledProp ?? control.props.disabled ?? jrFormControl?.disabled;
  const required = requiredProp ?? control.props.required;

  const controlProps = {
    disabled,
    required,
  };

  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach((key) => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });

  const fcs = formControlState({
    props,
    jrFormControl,
    states: ['error'],
  });

  const externalForwardedProps = {
    slots,
    slotProps: {
      ...componentsProps,
      ...slotProps,
    },
  };

  const [TypographySlot, typographySlotProps] = useSlot('typography', {
    elementType: Typography,
    externalForwardedProps,
    ownerState,
  });

  let label = labelProp;

  if (label != null && label.type !== Typography && !disableTypography) {
    label = (
      <TypographySlot
        component="span"
        {...typographySlotProps}
        className={typographySlotProps?.className}
      >
        {label}
      </TypographySlot>
    );
  }

  return (
    <FormControlLabelRoot
      className={mergeStyles(
        'JrFormControlLabel-root',
        formControlLabelVariants({}),
        className,
        '',
      )}
      ref={ref}
      {...other}
    >
      {React.cloneElement(control, controlProps)}
      {required ? (
        <div>
          {label}
          <AsteriskComponent
            aria-hidden
            className={mergeStyles(
              'JrFormControlLabel-asterisk',
              asteriskComponentVariants({ error: props.error }),
            )}
          >
            &thinsp;{'*'}
          </AsteriskComponent>
        </div>
      ) : (
        label
      )}
    </FormControlLabelRoot>
  );
});

export default FormControlLabel;
