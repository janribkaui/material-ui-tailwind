'use client';
import * as React from 'react';
import mergeStyles from '@janribka/utils/mergeStyles';
import { tv } from 'tailwind-variants';
import styled, { keyframes } from 'styled-components';

const DURATION = 550;

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;

const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;

const RippleStyled = styled.span`
  &.animation-visible {
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ease-in-out;
  }
  &.animation-pulsate {
    animation-duration: duration-shorter;
  }
`;

const RippleChildStyled = styled.span`
  &.animation-leaving {
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ease-in-out;
  }

  &.animation-pulsate {
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;

const rippleVariants = tv({
  base: 'opacity-0 absolute',
  variants: {
    rippleVisible: { true: 'opacity-30 scale-100 animation-visible', false: '' },
    ripplePulsate: { true: 'animation-pulsate', false: '' },
  },
  defaultVariants: { rippleVisible: false, ripplePulsate: false },
});

export const rippleChildVariants = tv({
  base: 'opacity-1 block w-full h-full rounded-[50%] bg-current',
  variants: {
    childLeaving: { true: 'opacity-0 animation-leaving', false: '' },
    pulsate: {
      true: 'absolute top-0 left-0 animation-pulsate',
      false: '',
    },
  },
  defaultVariants: { childLeaving: false, pulsate: false },
});

/**
 * @ignore - internal component.
 */
function Ripple(props) {
  const {
    className,
    // classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout,
  } = props;
  const [leaving, setLeaving] = React.useState(false);

  const rippleClassName = mergeStyles(
    rippleVariants({ rippleVisible: true, ripplePulsate: pulsate }),
    className,
  );

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = rippleChildVariants({ childLeaving: leaving, pulsate: pulsate });

  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [onExited, inProp, timeout]);

  return (
    <RippleStyled className={rippleClassName} style={rippleStyles}>
      <RippleChildStyled className={childClassName} />
    </RippleStyled>
  );
}

export default Ripple;
