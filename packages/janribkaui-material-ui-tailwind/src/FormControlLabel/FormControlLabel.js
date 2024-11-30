'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
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
  ],
  variants: {
    labelPlacement: {
      start: ['flex-row-reverse', 'ml-[1rem]', 'mr-[0.688rem]'],
      top: ['flex-col-reverse', 'ml-[1rem]'],
      bottom: ['flex-col', 'ml-[1rem]'],
    },
    disabled: {
      true: ['cursor-default', 'has-[.JrTypography-root]:text-action-disabled'],
      false: [],
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
    error,
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
  });

  let label = labelProp;

  // TODO: Pridat styly pro body1. N2jak se to mus9 nastavot z typography a disabled
  if (label != null && label.type !== Typography && !disableTypography) {
    label = (
      <TypographySlot
        component="span"
        className={mergeStyles('JrFormControlLabel-label')}
        {...typographySlotProps}
      >
        {label}
      </TypographySlot>
    );
  }

  return (
    <FormControlLabelRoot
      className={mergeStyles(
        'JrFormControlLabel-root',
        formControlLabelVariants({ labelPlacement, disabled }),
        className,
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
              asteriskComponentVariants({ error: fcs.error }),
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

FormControlLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  componentsProps: PropTypes.shape({
    typography: PropTypes.object,
  }),
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    typography: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    typography: PropTypes.elementType,
  }),
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default FormControlLabel;
