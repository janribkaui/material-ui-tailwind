'use client';
import * as React from 'react';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStyles } from '../utils';
import { tv } from 'tailwind-variants';
import { keyframes, css } from 'styled-components';

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
    ? css`animate-[${circularRotateKeyframe} 1.4s linear infinite]`
    : null;

const dashAnimation =
  typeof circularDashKeyframe !== 'string'
    ? css`animate-[${circularDashKeyframe} 1.4s ease-in-out infinite]`
    : null;

const circularProgressRootVariants = tv({
  base: 'inline-block',
  variants: {
    variant: {
      determinate: ['transition-transform'],
      indeterminate:
        rotateAnimation || css`animate-[${circularRotateKeyframe} 1.4s linear infinite]`,
    },
    color: {
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
      indeterminate: dashAnimation || css`animate-[${circularRotateKeyframe} 1.4s linear infinite]`,
    },
  },
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
    <span
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
        <circle
          className={mergeStyles(
            'JrCircularProgress-circle',
            circularProgressCircleVariants({ variant: variant, color: color }),
          )}
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </span>
  );
});

export default CircularProgress;
