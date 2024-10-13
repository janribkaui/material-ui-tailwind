'use client';
import * as React from 'react';
import clsx from 'clsx';
import JRError from '@janribkaui/internal-babel-macros/JRError.macro';
import TextareaAutosize from '../TextareaAutosize';
import isHostComponent from '../utils/isHostComponent';
import formControlState from '../FormControl/formControlState';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import { styled, globalCss } from 'styled-components';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import { isFilled } from './utils';
import inputBaseClasses from './inputBaseClasses';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

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

export const InputBaseInput = styled('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: inputOverridesResolver,
})(
  memoTheme(({ theme }) => {
    const light = theme.palette.mode === 'light';
    const placeholder = {
      color: 'currentColor',
      ...(theme.vars
        ? {
            opacity: theme.vars.opacity.inputPlaceholder,
          }
        : {
            opacity: light ? 0.42 : 0.5,
          }),
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
      }),
    };
    const placeholderHidden = {
      opacity: '0 !important',
    };
    const placeholderVisible = theme.vars
      ? {
          opacity: theme.vars.opacity.inputPlaceholder,
        }
      : {
          opacity: light ? 0.42 : 0.5,
        };

    return {
      font: 'inherit',
      letterSpacing: 'inherit',
      color: 'currentColor',
      padding: '4px 0 5px',
      border: 0,
      boxSizing: 'content-box',
      background: 'none',
      height: '1.4375em', // Reset 23pxthe native input line-height
      margin: 0, // Reset for Safari
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0,
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none',
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        WebkitAppearance: 'none',
      },
      // Show and hide the placeholder logic
      [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden, // Firefox 19+
        '&::-ms-input-placeholder': placeholderHidden, // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
        '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
      },
      [`&.${inputBaseClasses.disabled}`]: {
        opacity: 1, // Reset iOS opacity
        WebkitTextFillColor: (theme.vars || theme).palette.text.disabled, // Fix opacity Safari bug
      },
      variants: [
        {
          props: ({ ownerState }) => !ownerState.disableInjectingGlobalStyles,
          style: {
            animationName: 'mui-auto-fill-cancel',
            animationDuration: '10ms',
            '&:-webkit-autofill': {
              animationDuration: '5000s',
              animationName: 'mui-auto-fill',
            },
          },
        },
        {
          props: {
            size: 'small',
          },
          style: {
            paddingTop: 1,
          },
        },
        {
          props: ({ ownerState }) => ownerState.multiline,
          style: {
            height: 'auto',
            resize: 'none',
            padding: 0,
            paddingTop: 0,
          },
        },
        {
          props: {
            type: 'search',
          },
          style: {
            MozAppearance: 'textfield', // Improve type search style.
          },
        },
      ],
    };
  }),
);

const InputGlobalStyles = globalCss({
  '@keyframes mui-auto-fill': { from: { display: 'block' } },
  '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
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
        throw new JRError(
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

  const classes = useUtilityClasses(ownerState);

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
              ownerState: { ...ownerState, ...inputProps.ownerState },
            })}
            ref={handleInputRef}
            className={clsx(
              '',
              classes.input,
              {
                // TODO v6: remove this class as it duplicates with the global state class Mui-readOnly
                'MuiInputBase-readOnly': readOnly,
              },
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
