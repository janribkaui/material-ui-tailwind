'use client';

import * as React from 'react';

import mergeStyles from '@janribka/utils/mergeStyles';

import { keyframes, styled } from '../zero-styled';
import { rippleChildVariants } from './rippleChildVariants';
import RippleProps from './RippleProps';
import { rippleVariants } from './rippleVariants';

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

const RippleStyled = styled('span', {})`
  $.animation-visible {
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions?.easing.easeInOut};
  }
  $.animation-pulsate {
    animation-duration: ${({ theme }) => theme.transitions?.duration.shorter}ms;
  }
`;

const RippleChildStyled = styled('span', {})`
  &.animation-leaving {
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions?.easing.easeInOut};
  }

  &.animation-pulsate {
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme }) => theme.transitions?.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;

/**
 * @ignore - internal component.
 */
function Ripple(props: RippleProps) {
  const {
    className,
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
    className,
    rippleVariants({ rippleVisible: true, ripplePulsate: pulsate }),
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
