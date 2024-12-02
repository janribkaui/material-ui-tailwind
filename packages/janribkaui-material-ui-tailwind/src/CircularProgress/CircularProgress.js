'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStyles } from '../utils';
import { tv } from 'tailwind-variants';
import styled, { keyframes, css } from 'styled-components';

const SIZE = 44;

const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const rotateAnimation =
  typeof circularRotateKeyframe !== 'string'
    ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      `
    : null;

const dashAnimation =
  typeof circularDashKeyframe !== 'string'
    ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      `
    : null;

const CircularProgressRoot =
  styled.span`
  &.variant-indeterminate {
    ${rotateAnimation}` ||
  `animation: ${circularRotateKeyframe} 1.4s linear infinite
  }
`;

const CircularProgressCircle =
  styled.circle`
    &.variant-indeterminate {
      stroke-dasharray: 80px, 200px;
      stroke-dashoffset: 0;
      &.disable-shrink {
        ${dashAnimation}` ||
  `animation: ${circularDashKeyframe} 1.4s linear infinite
      }   
    }
`;

const circularProgressRootVariants = tv({
  base: 'inline-block',
  variants: {
    variant: {
      determinate: ['transition-transform'],
      indeterminate: 'variant-indeterminate',
    },
    color: {
      // TODO: Přidat custom color a tam si každý může nadefinovat svou. Nebo do color přidat properu string. To samé pro ostatní varianty
      primary: 'text-primary',
      secondary: 'text-secondary',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      inherit: 'text-inherit',
    },
  },
});

const circularProgressCircleVariants = tv({
  base: 'stroke-current',
  variants: {
    variant: {
      determinate: ['transition-transform'],
      indeterminate: 'variant-indeterminate',
    },
    disableShrink: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'indeterminate', disableShrink: false, className: 'disable-shrink' },
  ],
});

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = React.forwardRef(function CircularProgress(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrCircularProgress' });
  const {
    className,
    color = 'primary',
    disableShrink = false,
    size = 40,
    style,
    thickness = 3.6,
    value = 0,
    variant = 'indeterminate',
    ...other
  } = props;

  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }

  return (
    <CircularProgressRoot
      className={circularProgressRootVariants({ variant: variant, color: color })}
      style={{ width: size, height: size, ...rootStyle, ...style }}
      ref={ref}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <svg
        className="JrCircularProgress-svg block"
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <CircularProgressCircle
          className={mergeStyles(
            'JrCircularProgress-circle',
            circularProgressCircleVariants({
              variant: variant,
              color: color,
              disableShrink: disableShrink,
            }),
          )}
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </CircularProgressRoot>
  );
});

CircularProgress.propTypes /* remove-proptypes */ = {
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
    'error',
    'info',
    'inherit',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: PropTypes.bool,
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
};

export default CircularProgress;
