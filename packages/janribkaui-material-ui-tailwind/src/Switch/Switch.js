'use client';
// @inheritedComponent IconButton
import * as React from 'react';
import { alpha, darken, lighten } from '@mui/system/colorManipulator';
import capitalize from '../utils/capitalize';
import SwitchBase from '../internal/SwitchBase';
import { styled } from 'styled-components';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import switchClasses from './switchClasses';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

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
        '[&_.JrSwitch-switchBase]:h-[16px]', //TODO: checked
      ],
      medium: [''],
    },
  },
});

const SwitchSwitchBase = styled(SwitchBase, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.switchBase,
      { [`& .${switchClasses.input}`]: styles.input },
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Render above the focus ripple.
    color: theme.vars
      ? theme.vars.palette.Switch.defaultColor
      : `${theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300]}`,
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
    },
    [`&.${switchClasses.disabled}`]: {
      color: theme.vars
        ? theme.vars.palette.Switch.defaultDisabledColor
        : `${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]}`,
    },
    [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
      opacity: 0.5,
    },
    [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
      opacity: theme.vars
        ? theme.vars.opacity.switchTrackDisabled
        : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`,
    },
    [`& .${switchClasses.input}`]: {
      left: '-100%',
      width: '300%',
    },
  })),
  memoTheme(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
        : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(([, value]) => value && value.main && value.light) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${switchClasses.checked}`]: {
              color: (theme.vars || theme).palette[color].main,
              '&:hover': {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                '@media (hover: none)': {
                  backgroundColor: 'transparent',
                },
              },
              [`&.${switchClasses.disabled}`]: {
                color: theme.vars
                  ? theme.vars.palette.Switch[`${color}DisabledColor`]
                  : `${
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette[color].main, 0.62)
                        : darken(theme.palette[color].main, 0.55)
                    }`,
              },
            },
            [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
              backgroundColor: (theme.vars || theme).palette[color].main,
            },
          },
        })),
    ],
  })),
);

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(
  memoTheme(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    backgroundColor: theme.vars
      ? theme.vars.palette.common.onBackground
      : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
    opacity: theme.vars
      ? theme.vars.opacity.switchTrack
      : `${theme.palette.mode === 'light' ? 0.38 : 0.3}`,
  })),
);

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})(
  memoTheme(({ theme }) => ({
    boxShadow: (theme.vars || theme).shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
  })),
);

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSwitch' });
  const { className, color = 'primary', edge = false, size = 'medium', sx, ...other } = props;

  const ownerState = {
    ...props,
    color,
    edge,
    size,
  };

  const icon = <SwitchThumb className={classes.thumb} />;

  return (
    <SwitchRoot className={mergeStyles('JrSwitch-root', switchRootVariants({}), className, '')}>
      <SwitchSwitchBase type="checkbox" icon={icon} checkedIcon={icon} ref={ref} {...other} />
      <SwitchTrack className={classes.track} />
    </SwitchRoot>
  );
});

export default Switch;
