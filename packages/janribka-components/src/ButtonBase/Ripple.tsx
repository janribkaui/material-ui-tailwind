'use client';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import mergeStyles from '@janribka/utils/mergeStyles';

import RippleProps from './RippleProps';
import { rippleVariants } from './rippleVariants';

const DURATION = 550;

const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const RippleChildStyled = styled.span`
  &.animation-leaving {
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${(props) => props.theme.transitions.easing.easeInOut};
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

  const rippleClassName = mergeStyles(className, rippleVariants());

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = '';
  //   const childClassName = clsx(classes.child, {
  //     [classes.childLeaving]: leaving,
  //     [classes.childPulsate]: pulsate,
  //   });

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
    <span className={'dura' + rippleClassName} style={rippleStyles}>
      <span className={childClassName} />
    </span>
  );
}

export default Ripple;
