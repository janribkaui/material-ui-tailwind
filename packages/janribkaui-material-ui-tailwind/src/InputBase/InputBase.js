'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
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

InputBase.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
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
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * @ignore
   */
  renderSuffix: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
};

export default InputBase;
