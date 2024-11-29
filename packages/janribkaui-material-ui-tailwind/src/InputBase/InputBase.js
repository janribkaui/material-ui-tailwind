'use client';
import * as React from 'react';
import JrError from '@janribkaui/internal-babel-macros/JrError.macro';
import TextareaAutosize from '../TextareaAutosize';
import isHostComponent from '../utils/isHostComponent';
import formControlState from '../FormControl/formControlState';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import { styled, keyframes } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import { isFilled } from './utils';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const jrAutoFillKeyframe = keyframes`
  from {
    display: block;    
  } 
`;

const jrAutoFillCancelKeyframe = keyframes`
  from {
    display: block;    
  }
`;

const InputBaseRoot = styled(div)``;

const inputBaseRootVariants = tv({
  base: [
    'JrInputBase-root',
    'font-normal',
    'text-base',
    'tracking-[0.00938em]',
    'text-text-primary',
    "leading-['1.4375em']",
    'box-border',
    'relative',
    'cursor-text',
    'inline-flex',
    'items-center',
    'disabled:text-text-disabled disabled:cursor-default',
  ],
  variants: {
    multiline: {
      true: ['p-[4px 0 5px]'],
      false: [],
    },
    size: {
      small: [''],
      medium: [],
    },
    fullWidth: {
      true: ['w-full'],
      false: [],
    },
  },
  compoundVariants: [
    {
      multiline: true,
      size: 'small',
      className: ['pt-1'],
    },
  ],
});

const InputBaseInput = styled(input)`
  font: inherit;
  background: none;
  -webkit-tap-highlight-color: transparent;
  &::-webkit-input-placeholder {
    color: currentColor;
    opacity: 0.42;
    transition: opacity 200ms;

    &.theme-dark {
      opacity: 0.5;
    }
  }
  &::-moz-placeholder {
    color: currentColor;
    opacity: 0.42;
    transition: opacity 200ms;

    &.theme-dark {
      opacity: 0.5;
    }
  } // Firefox 19+
  &::-ms-input-placeholder {
    color: currentColor;
    opacity: 0.42;
    transition: opacity 200ms;

    &.theme-dark {
      opacity: 0.5;
    }
  } // Edge
  &:focus {
    outline: 0;
  }
  // Reset Firefox invalid required input style
  &:invalid {
    box-shadow: none;
  }
  &::-webkit-search-decoration {
    // Remove the padding when type=search.
    -webkit-appearance: none;
  }
  // Show and hide the placeholder logic
  label[data-shrink='false'] + .MuiFormControl-root & {
    &::-webkit-input-placeholder {
      opacity: 0 !important;
    }
    &::-moz-placeholder {
      opacity: 0 !important;
    } // Firefox 19+
    &::-ms-input-placeholder {
      opacity: 0 !important;
    } // Edge
    &:focus::-webkit-input-placeholder {
      opacity: 0.42;
      &.theme-dark {
        opacity: 0.5;
      }
    }
    &:focus::-moz-placeholder {
      opacity: 0.42;
      &.theme-dark {
        opacity: 0.5;
      }
    } // Firefox 19+
    &:focus::-ms-input-placeholder {
      opacity: 0.42;
      &.theme-dark {
        opacity: 0.5;
      }
    } // Edge
  }
  &.disable-injection-disabled {
    animation-name: ${jrAutoFillCancelKeyframe};
    animation-duration: 10ms;
    &:-webkit-autofill {
      animation-name: ${jrAutoFillKeyframe};
      animation-duration: 5000s;
    }
  }
  &.type-search {
    -moz-appearance: textfield;
  }
`;

const inputBaseInputVariants = tv({
  base: [
    'tracking-inherit',
    'text-current',
    'p-[4px 0 5px]',
    'border-0',
    'box-content',
    'h-[1.4375em]', // Reset 23px the native input line-height
    'm-0', // Reset for Safari
    'block',
    // Make the flex item shrink with Firefox
    'min-w-0',
    'w-full',
    'dark:theme-dark',
    'disabled:opacity-100 disabled:webkit-text-fill-text-disabled',
  ],
  variants: {
    disableInjectingGlobalStyles: {
      true: [],
      false: ['disable-injection-disabled'],
    },
    size: {
      small: ['pt-px'],
      medium: [],
    },
    multiline: {
      true: ['h-auto', 'resize-none', 'p-0', 'pt-0'],
      false: [],
    },
    type: {
      search: ['type-search'],
    },
  },
});

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = React.forwardRef(function InputBase(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiInputBase' });
  const {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    color,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    disableInjectingGlobalStyles,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = 'input',
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    margin,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    size,
    slotProps = {},
    slots = {},
    startAdornment,
    type = 'text',
    value: valueProp,
    ...other
  } = props;

  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(
          [
            'JR: You have provided a `inputComponent` to the input component',
            'that does not correctly handle the `ref` prop.',
            'Make sure the `ref` prop is called with a HTMLInputElement.',
          ].join('\n'),
        );
      }
    }
  }, []);

  const handleInputRef = useForkRef(
    inputRef,
    inputRefProp,
    inputPropsProp.ref,
    handleInputRefWarning,
  );

  const [focused, setFocused] = React.useState(false);
  const jrFormControl = useFormControl();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (jrFormControl) {
        return jrFormControl.registerEffect();
      }

      return undefined;
    }, [jrFormControl]);
  }

  const fcs = formControlState({
    props,
    jrFormControl,
    states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
  });

  fcs.focused = jrFormControl ? jrFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!jrFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [jrFormControl, disabled, focused, onBlur]);

  const onFilled = jrFormControl && jrFormControl.onFilled;
  const onEmpty = jrFormControl && jrFormControl.onEmpty;

  const checkDirty = React.useCallback(
    (obj) => {
      if (isFilled(obj)) {
        if (onFilled) {
          onFilled();
        }
      } else if (onEmpty) {
        onEmpty();
      }
    },
    [onFilled, onEmpty],
  );

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }

    if (jrFormControl && jrFormControl.onFocus) {
      jrFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }

    if (jrFormControl && jrFormControl.onBlur) {
      jrFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new JrError(
          'JR: Expected valid input target. ' +
            'Did you use a custom `inputComponent` and forget to forward refs? ',
        );
      }

      checkDirty({
        value: element.value,
      });
    }

    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }

    // Perform in the willUpdate
    if (onChange) {
      onChange(event, ...args);
    }
  };

  // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).
  React.useEffect(() => {
    checkDirty(inputRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;

  if (multiline && InputComponent === 'input') {
    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn(
            'JR: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
      inputProps = {
        type: undefined,
        minRows: rows,
        maxRows: rows,
        ...inputProps,
      };
    } else {
      inputProps = {
        type: undefined,
        maxRows,
        minRows,
        ...inputProps,
      };
    }

    InputComponent = TextareaAutosize;
  }

  const handleAutoFill = (event) => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(event.animationName === 'mui-auto-fill-cancel' ? inputRef.current : { value: 'x' });
  };

  React.useEffect(() => {
    if (jrFormControl) {
      jrFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [jrFormControl, startAdornment]);

  const ownerState = {
    ...props,
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: jrFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type,
  };

  const Root = slots.root || components.Root || InputBaseRoot;
  const rootProps = slotProps.root || componentsProps.root || {};

  const Input = slots.input || components.Input || InputBaseInput;
  inputProps = { ...inputProps, ...(slotProps.input ?? componentsProps.input) };

  return (
    <React.Fragment>
      {!disableInjectingGlobalStyles && typeof InputGlobalStyles === 'function' && (
        // For Emotion/Styled-components, InputGlobalStyles will be a function
        // For Pigment CSS, this has no effect because the InputGlobalStyles will be null.
        <InputGlobalStyles />
      )}

      <Root
        {...rootProps}
        ref={ref}
        onClick={handleClick}
        {...other}
        {...(!isHostComponent(Root) && {
          ownerState: { ...ownerState, ...rootProps.ownerState },
        })}
        className={mergeStyles(
          inputBaseRootVariants({ multiline, size: fcs.size, fullWidth }),
          className,
        )}
      >
        {startAdornment}
        <FormControlContext.Provider value={null}>
          <Input
            aria-invalid={fcs.error}
            aria-describedby={ariaDescribedby}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            disabled={fcs.disabled}
            id={id}
            onAnimationStart={handleAutoFill}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            required={fcs.required}
            rows={rows}
            value={value}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            type={type}
            {...inputProps}
            {...(!isHostComponent(Input) && {
              as: InputComponent,
            })}
            ref={handleInputRef}
            className={mergeStyles(
              inputBaseInputVariants({
                disableInjectingGlobalStyles,
                size: fcs.size,
                multiline,
                type,
              }),
              inputProps.className,
            )}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </FormControlContext.Provider>
        {endAdornment}
        {renderSuffix
          ? renderSuffix({
              ...fcs,
              startAdornment,
            })
          : null}
      </Root>
    </React.Fragment>
  );
});

export default InputBase;
