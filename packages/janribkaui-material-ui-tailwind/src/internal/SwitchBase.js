'use client';
import * as React from 'react';
import useControlled from '../utils/useControlled';
import useFormControl from '../FormControl/useFormControl';
import ButtonBase from '../ButtonBase';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';

const SwitchBaseRoot = styled(ButtonBase)``;

const switchBaseRootVariants = tv({
  base: ['p-[0.563rem]', 'rounded-[50%]'],
  variants: {
    edge: {
      start: [],
      end: [],
    },
    size: {
      small: [],
      medium: [],
      large: [],
    },
  },
  compoundVariants: [
    {
      edge: 'start',
      size: 'small',
      className: ['-ml-[0.188rem]'],
    },
    {
      edge: 'start',
      size: 'medium',
      className: ['-ml-3'],
    },
    {
      edge: 'start',
      size: 'large',
      className: ['-ml-3'],
    },
    {
      edge: 'end',
      size: 'small',
      className: ['-mr-[0.188rem]'],
    },
    {
      edge: 'end',
      size: 'medium',
      className: ['-mr-3'],
    },
    {
      edge: 'end',
      size: 'large',
      className: ['-mr-3'],
    },
  ],
});

const SwitchBaseInput = styled('input')`
  cursor: inherit;
`;

const switchBaseInputVariants = tv({
  base: ['absolute', 'opacity-0', 'w-full', 'h-full', 'top-0', 'left-0', 'm-0', 'p-0', 'z-[1]'],
});

/**
 * @ignore - internal component.
 */
const SwitchBase = React.forwardRef(function SwitchBase(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value,
    ...other
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchBase',
    state: 'checked',
  });

  const jrFormControl = useFormControl();

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }

    if (jrFormControl && jrFormControl.onFocus) {
      jrFormControl.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }

    if (jrFormControl && jrFormControl.onBlur) {
      jrFormControl.onBlur(event);
    }
  };

  const handleInputChange = (event) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    const newChecked = event.target.checked;

    setCheckedState(newChecked);

    if (onChange) {
      // TODO v6: remove the second argument.
      onChange(event, newChecked);
    }
  };

  let disabled = disabledProp;

  if (jrFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = jrFormControl.disabled;
    }
  }

  const hasLabelFor = type === 'checkbox' || type === 'radio';

  return (
    <SwitchBaseRoot
      component="span"
      className={switchBaseRootVariants({ edge, size: props.size })}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      tabIndex={null}
      role={undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={ref}
      {...other}
    >
      <SwitchBaseInput
        autoFocus={autoFocus}
        checked={checkedProp}
        defaultChecked={defaultChecked}
        className={switchBaseInputVariants({})}
        disabled={disabled}
        id={hasLabelFor ? id : undefined}
        name={name}
        onChange={handleInputChange}
        readOnly={readOnly}
        ref={inputRef}
        required={required}
        tabIndex={tabIndex}
        type={type}
        {...(type === 'checkbox' && value === undefined ? {} : { value })}
        {...inputProps}
      />
      {checked ? checkedIcon : icon}
    </SwitchBaseRoot>
  );
});

export default SwitchBase;
