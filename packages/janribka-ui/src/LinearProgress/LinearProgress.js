'use client';
import * as React from 'react';
import { useRtl } from '@janribka/system/RtlProvider';
import { useDefaultProps } from '../DefaultPropsProvider';
import { tv } from 'tailwind-variants';
import styled, { keyframes, css } from 'styled-components';
import { mergeStyles } from '../utils';

const TRANSITION_DURATION = 4; // seconds

const indeterminate1Keyframe = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const indeterminate1Animation =
  typeof indeterminate1Keyframe !== 'string'
    ? css`
        animation: ${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `
    : null;

const indeterminate2Keyframe = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`;
const indeterminate2Animation =
  typeof indeterminate2Keyframe !== 'string'
    ? css`
        animation: ${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `
    : null;

const bufferKeyframe = keyframes`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;
const bufferAnimation =
  typeof bufferKeyframe !== 'string'
    ? css`
        animation: ${bufferKeyframe} 3s infinite linear;
      `
    : null;

const LinearProgressRoot = styled.span({
  '@media: print': {
    colorAdjust: 'exact',
  },
});

const linearProgressRootVariants = tv({
  base: [
    'relative',
    'overflow-hidden',
    'block',
    'h-1',
    'z-0', // Fix Safari's bug during composition of different paint.
  ],
  variants: {
    color: {
      primary: ['bg-primary/[0.38]', 'dark:bg-primary/[0.5]'],
      secondary: ['bg-secondary/[0.38]', 'dark:bg-secondary/[0.5]'],
      info: ['bg-info/[0.38]', 'dark:bg-info/[0.5]'],
      success: ['bg-success/[0.38]', 'dark:bg-success/[0.5]'],
      warning: ['bg-warning/[0.38]', 'dark:bg-warning/[0.5]'],
      error: ['bg-error/[0.38]', 'dark:bg-error/[0.5]'],
      inherit: ['bg-inherit/[0.38]', 'dark:bg-inherit/[0.5]'],
    },
    variant: {
      determinate: '',
      indeterminate: '',
      buffer: 'bg-transparent',
      query: 'rotate-180',
    },
  },
  compoundVariants: [
    {
      color: 'inherit',
      variant: 'determinate',
      className: [
        "before:content-['']",
        'before:absolute',
        'before:left-0',
        'before:top-0',
        'before:right-0',
        'before:bottom-0',
        'before:bg-current',
        'before:opacity-30',
      ],
    },
    {
      color: 'inherit',
      variant: 'indeterminate',
      className: [
        "before:content-['']",
        'before:absolute',
        'before:left-0',
        'before:top-0',
        'before:right-0',
        'before:bottom-0',
        'before:bg-current',
        'before:opacity-30',
      ],
    },
    {
      color: 'inherit',
      variant: 'query',
      className: [
        "before:content-['']",
        'before:absolute',
        'before:left-0',
        'before:top-0',
        'before:right-0',
        'before:bottom-0',
        'before:bg-current',
        'before:opacity-30',
      ],
    },
  ],
});

const LinearProgressDashed =
  styled.span`
    background-size: 10px 10px;
    background-position: 0 -23px;
    background-image: radial-gradient(currentColor 0%, currentColor 16%, transparent 42%);
    ${bufferAnimation}
  ` ||
  `animation: ${bufferKeyframe} 3s infinite linear;
`;

const linearProgressDashedVariants = tv({
  base: ['absolute', 'mt-0', 'h-full', 'w-full'],
  variants: {
    color: {
      primary: ['text-primary/[0.38]', 'dark:text-primary/[0.5]'],
      secondary: ['text-secondary/[0.38]', 'dark:text-secondary/[0.5]'],
      info: ['text-info/[0.38]', 'dark:text-info/[0.5]'],
      success: ['text-success/[0.38]', 'dark:text-success/[0.5]'],
      warning: ['text-warning/[0.38]', 'dark:text-warning/[0.5]'],
      error: ['text-error/[0.38]', 'dark:text-error/[0.5]'],
      inherit: ['opacity-30'],
    },
  },
});

const LinearProgressBar1 =
  styled.span`
  transition-duration: 0.2s;
    &.variant-determinate, &.variant-buffer {
      transition-duration: 0.${TRANSITION_DURATION}s;
    }
    &.variant-indeterminate, &.variant-query {    
        ${indeterminate1Animation}` ||
  `animation: ${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite
  }
`;

const linearProgressBar1Variants = tv({
  base: [
    'w-full',
    'absolute',
    'left-0',
    'bottom-0',
    'top-0',
    'transition-transform',
    'ease-linear',
    'origin-left',
  ],
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      inherit: 'bg-current',
    },
    variant: {
      determinate: ['variant-determinate'],
      indeterminate: ['w-auto', 'variant-indeterminate'],
      buffer: ['z-[1]', 'variant-buffer'],
      query: ['w-auto', 'variant-query'],
    },
  },
});

const LinearProgressBar2 =
  styled.span`
  transition-duration: 0.2s;
  &.variant-buffer {  
    transition-duration: 0.${TRANSITION_DURATION}s;      
  }
  &.variant-indeterminate, &.variant-query {
        ${indeterminate2Animation}` ||
  `animation: ${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite
  }
`;

const linearProgressBar2Variants = tv({
  base: [
    'w-full',
    'absolute',
    'left-0',
    'bottom-0',
    'top-0',
    'transition-transform',
    'ease-linear',
    'origin-left',
  ],
  variants: {
    color: {
      primary: '',
      secondary: '',
      info: '',
      success: '',
      warning: '',
      error: '',
      inherit: ['opacity-30', 'bg-current'],
    },
    variant: {
      determinate: [],
      indeterminate: ['w-auto', 'variant-indeterminate'],
      buffer: ['variant-buffer', 'overflow-hidden'],
      query: ['w-auto', 'variant-query'],
    },
  },
  compoundVariants: [
    // Determinate
    {
      variant: 'determinate',
      color: 'primary',
      className: 'bg-primary',
    },
    {
      variant: 'determinate',
      color: 'secondary',
      className: 'bg-secondary',
    },
    {
      variant: 'determinate',
      color: 'info',
      className: 'bg-info',
    },
    {
      variant: 'determinate',
      color: 'success',
      className: 'bg-success',
    },
    {
      variant: 'determinate',
      color: 'warning',
      className: 'bg-warning',
    },
    {
      variant: 'determinate',
      color: 'error',
      className: 'bg-error',
    },
    // Indeterminate
    {
      variant: 'indeterminate',
      color: 'primary',
      className: 'bg-primary',
    },
    {
      variant: 'indeterminate',
      color: 'secondary',
      className: 'bg-secondary',
    },
    {
      variant: 'indeterminate',
      color: 'info',
      className: 'bg-info',
    },
    {
      variant: 'indeterminate',
      color: 'success',
      className: 'bg-success',
    },
    {
      variant: 'indeterminate',
      color: 'warning',
      className: 'bg-warning',
    },
    {
      variant: 'indeterminate',
      color: 'error',
      className: 'bg-error',
    },
    // Buffer
    {
      variant: 'buffer',
      color: 'primary',
      className: ['bg-primary/[0.38]', 'dark:bg-primary/[0.5]'],
    },
    {
      variant: 'buffer',
      color: 'error',
      className: ['bg-error/[0.38]', 'dark:bg-error/[0.5]'],
    },
    {
      variant: 'buffer',
      color: 'error',
      className: ['bg-error/[0.38]', 'dark:bg-error/[0.5]'],
    },
    {
      variant: 'buffer',
      color: 'error',
      className: ['bg-error/[0.38]', 'dark:bg-error/[0.5]'],
    },
    {
      variant: 'buffer',
      color: 'error',
      className: ['bg-error/[0.38]', 'dark:bg-error/[0.5]'],
    },
    {
      variant: 'buffer',
      color: 'error',
      className: ['bg-error/[0.38]', 'dark:bg-error/[0.5]'],
    },
    // Query
    {
      variant: 'query',
      color: 'primary',
      className: 'bg-primary',
    },
    {
      variant: 'query',
      color: 'secondary',
      className: 'bg-secondary',
    },
    {
      variant: 'query',
      color: 'info',
      className: 'bg-info',
    },
    {
      variant: 'query',
      color: 'success',
      className: 'bg-success',
    },
    {
      variant: 'query',
      color: 'warning',
      className: 'bg-warning',
    },
    {
      variant: 'query',
      color: 'error',
      className: 'bg-error',
    },
  ],
});

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const LinearProgress = React.forwardRef(function LinearProgress(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrLinearProgress' });
  const {
    className,
    color = 'primary',
    value,
    valueBuffer,
    variant = 'indeterminate',
    ...other
  } = props;
  const isRtl = useRtl();

  const rootProps = {};
  const inlineStyles = { bar1: {}, bar2: {} };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      rootProps['aria-valuemin'] = 0;
      rootProps['aria-valuemax'] = 100;
      let transform = value - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'JR: You need to provide a value prop ' +
          'when using the determinate or buffer variant of LinearProgress .',
      );
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'JR: You need to provide a valueBuffer prop ' +
          'when using the buffer variant of LinearProgress.',
      );
    }
  }

  return (
    <LinearProgressRoot
      className={mergeStyles(
        'JrLinearProgress-root',
        linearProgressRootVariants({ color: color, variant: variant }, className),
      )}
      role="progressbar"
      {...rootProps}
      ref={ref}
      {...other}
      color={color}
    >
      {variant === 'buffer' ? (
        <LinearProgressDashed
          className={mergeStyles(
            'JrLinearProgress-dashed',
            linearProgressDashedVariants({ color: color }),
          )}
        />
      ) : null}
      <LinearProgressBar1
        className={mergeStyles(
          'JrLinearProgress-bar1',
          linearProgressBar1Variants({ color: color, variant: variant }),
        )}
        style={inlineStyles.bar1}
      />
      {variant === 'determinate' ? null : (
        <LinearProgressBar2
          className={mergeStyles(
            'JrLinearProgress-bar2',
            linearProgressBar2Variants({ color: color, variant: variant }),
          )}
          style={inlineStyles.bar2}
        />
      )}
    </LinearProgressRoot>
  );
});

export default LinearProgress;
