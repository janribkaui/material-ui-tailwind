'use client';
// @inheritedComponent IconButton
import * as React from 'react';
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
      primary: 'has-[input:checked]:text-primary',
      secondary: 'has-[input:checked]:text-secondary',
      info: 'has-[input:checked]:text-info',
      success: 'has-[input:checked]:text-success',
      warning: 'has-[input:checked]:text-warning',
      error: 'has-[input:checked]:text-error',
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
    'bg-common-black/[0.38] dark:bg-common-white/[0.3]',
  ],
  variants: {
    color: {
      primary: 'group-has-[input:checked]:bg-primary group-has-[input:checked]:opacity-50',
      secondary: 'group-has-[input:checked]:bg-secondary group-has-[input:checked]:opacity-50',
      info: 'group-has-[input:checked]:bg-info group-has-[input:checked]:opacity-50',
      success: 'group-has-[input:checked]:bg-success group-has-[input:checked]:opacity-50',
      warning: 'group-has-[input:checked]:bg-warning group-has-[input:checked]:opacity-50',
      error: 'group-has-[input:checked]:bg-error group-has-[input:checked]:opacity-50',
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
  base: ['shadow-1', 'bg-current', 'w-[20px]', 'h-[20px]', 'rounded-[50%]'],
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

export default Switch;
