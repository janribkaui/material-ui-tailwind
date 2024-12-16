'use client';
// @inheritedComponent IconButton
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';
import SwitchBase from '../internal/SwitchBase';

const SwitchRoot = styled.span`
  @media print {
    color-adjust: exact;
  }
`;

const switchRootVariants = tv({
  base: [
    'group',
    'inline-flex',
    `w-[58px]`, // 34 + 12 *2
    `h-[38px]`, // 14 + 12 *2
    'overflow-hidden',
    'p-[12px]',
    'box-border',
    'relative',
    'shrink-0',
    'z-0', // Reset the stacking context.
    'align-middle', // For correct alignment with the text.
  ],
  variants: {
    edge: {
      start: ['ml-[-8px]'],
      end: ['mr-[-8px]'],
    },
    size: {
      small: ['w-[40px]', 'h-[24px]', 'p-[7px]'],
      medium: [''],
    },
  },
});

const SwitchSwitchBase = styled(SwitchBase)`
  .hover {
    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      // TODO: Use tailwind hover-none instead
      background-color: transparent;
    }
  }

  // .hover-checked {
  //     // Reset on touch devices, it doesn't add specificity
  //     @media (hover: none) {
  //       background-color: transparent;
  //   }
  // }
`;

const switchSwitchBaseVariants = tv({
  base: [
    'absolute',
    'top-0',
    'left-0',
    'z-[1]', // Render above the focus ripple.
    'text-common-white dark:text-grey-300',
    'has-[input:checked]:translate-x-[20px]',
    'transition-left duration-shortest',
    'transition-transform duration-shortest',
    '[&_input]:-left-full',
    '[&_input]:w-[300%]',
    'hover:bg-action-active/hover hover:hover',
  ],
  variants: {
    color: {
      primary: 'has-[input:checked]:text-primary hover:has-[input:checked]:bg-primary/hover',
      secondary: 'has-[input:checked]:text-secondary hover:has-[input:checked]:bg-secondary/hover',
      info: 'has-[input:checked]:text-info hover:has-[input:checked]:bg-info/hover',
      success: 'has-[input:checked]:text-success hover:has-[input:checked]:bg-success/hover',
      warning: 'has-[input:checked]:text-warning hover:has-[input:checked]:bg-warning/hover',
      error: 'has-[input:checked]:text-error hover:has-[input:checked]:bg-error/hover',
    },
    size: {
      small: ['p-[4px]', 'has-[input:checked]:translate-x-[16px]'],
    },
    disabled: {
      true: [
        'text-grey-100 dark:text-grey-600',
        'has-[input:checked]:text-opacity-[0.38] dark:text-opacity-[0.45]',
      ],
      false: [],
    },
  },
  defaultVariants: { disabled: false },
});

const SwitchTrack = styled.span``;

const switchTrackVariants = tv({
  base: [
    'h-full',
    'w-full',
    'rounded-[7px]',
    'z-[-1]',
    'transition-opacity duration-shorter',
    'transition-background-color duration-shorter',
    'bg-common-black dark:bg-common-white',
    'opacity-[0.38] dark:opacity-[0.3]',
    'group-has-[input:checked]:opacity-50',
  ],
  variants: {
    color: {
      primary: 'group-has-[input:checked]:bg-primary ',
      secondary: 'group-has-[input:checked]:bg-secondary',
      info: 'group-has-[input:checked]:bg-info',
      success: 'group-has-[input:checked]:bg-success',
      warning: 'group-has-[input:checked]:bg-warning',
      error: 'group-has-[input:checked]:bg-error',
    },
    disabled: {
      true: ['!opacity-[0.12] dark:!opacity-[0.2]'],
      false: [],
    },
  },
  defaultVariants: { disabled: false },
});

const SwitchThumb = styled.span``;

const switchThumbVariants = tv({
  base: [
    'shadow-1',
    'bg-current',
    'w-[20px]',
    'h-[20px]',
    'rounded-[50%]',
    'relative',
    'before:absolute before:content-[""] before:inset-0 before:bg-common-white before:z-[-1] before:rounded-full',
  ],
  variants: {
    size: {
      small: ['w-[16px]', 'h-[16px]'],
    },
  },
});

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrSwitch' });
  const { className, color = 'primary', edge = false, size = 'medium', ...other } = props;

  const icon = (
    <SwitchThumb className={mergeStyles('JrSwitch-thumb', switchThumbVariants({ size }))} />
  );

  return (
    <SwitchRoot
      className={mergeStyles('JrSwitch-root', switchRootVariants({ edge, size, color }), className)}
    >
      <SwitchSwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        className={mergeStyles(
          'JrSwitch-switchBase',
          switchSwitchBaseVariants({ color, size, disabled: props.disabled }),
        )}
        ref={ref}
        {...other}
      />
      <SwitchTrack
        className={mergeStyles(
          'JrSwitch-track',
          switchTrackVariants({ color, disabled: props.disabled }),
        )}
      />
    </SwitchRoot>
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOf([
    'default',
    'error',
    'info',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
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
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Switch;
