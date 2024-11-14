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
    'inline-flex',
    `w-[${34 + 12 * 2}px]`,
    `h-[${14 + 12 * 2}px]`,
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
      small: [
        'w-[40px]',
        'h-[24px]',
        'p-[7px]',
        '[&_.JrSwitch-thumb]:w-[16px]',
        '[&_.JrSwitch-thumb]:h-[16px]',
        '[&_.JrSwitch-switchBase]:p-[4px]',
        '[&_.JrSwitch-switchBase]:h-[16px]',
        '',
      ],
      medium: [''],
    },
  },
});
// TODO: Checked

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
    'peer',
    'absolute',
    'top-0',
    'left-0',
    'z-[1]',
    'text-common-white dark:text-grey-300',
    'transition-left duration-shortest',
    'transition-transform duration-shortest',
    'disabled:text-grey-100 dark:disabled:text-grey-600',
    '[&_input]:-left-full',
    '[&_input]:w-[300%]',
    'hover:bg-action-active/hover hover:hover',
    'checked:translate-x-[20px]',
  ],
  variants: {
    color: {
      primary: 'checked:text-primary',
      secondary: 'checked:text-secondary',
      info: 'checked:text-info',
      success: 'checked:text-success',
      warning: 'checked:text-warning',
      error: 'checked:text-error',
    },
  },
});

const SwitchTrack = styled.span``;

const switchTrackVariants = tv({
  base: [
    'h-full',
    'w-full',
    'rounded-[7px]',
    'z-[-1px]',
    'transition-opacity duration-shorter',
    'transition-background-color duration-shorter',
    'bg-common-black/[0.38] dark:bg-common-white/[0.3]',
    'peer-checked:opacity-50',
    'peer-disabled:opacity-[0.12]',
    'dark:peer-disabled:opacity-[0.2]',
  ],
});

const SwitchThumb = styled.span``;

const switchThumbVariants = tv({
  base: ['shadow-1', 'bg-current', 'w-[20px]', 'h-[20px]', 'rounded-[50%]'],
});

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrSwitch' });
  const { className, color = 'primary', edge = false, size = 'medium', ...other } = props;

  const icon = <SwitchThumb className={mergeStyles('JrSwitch-thumb', switchThumbVariants({}))} />;

  return (
    <SwitchRoot
      className={mergeStyles(
        'JrSwitch-root -left-full',
        switchRootVariants({ edge, size }),
        className,
      )}
    >
      <SwitchSwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        className={mergeStyles('JrSwitch-switchBase', switchSwitchBaseVariants({ color }))}
        ref={ref}
        {...other}
      />
      <SwitchTrack className={mergeStyles('JrSwitch-track', switchTrackVariants({}))} />
    </SwitchRoot>
  );
});

export default Switch;
