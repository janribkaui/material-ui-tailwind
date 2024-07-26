import React from 'react';

import { InternalStandardProps as StandardProps } from '../types/baseProps';

type RippleProps = {
  /**
   * Override or extend the styles applied to the component.
   */
  className?: string;
  /**
   * @ignore - injected from TransitionGroup
   */
  in?: boolean;
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: () => void;
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: boolean;
  /**
   * Diameter of the ripple.
   */
  rippleSize: number;
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: number;
  /**
   * Vertical position of the ripple center.
   */
  rippleY: number;
  /**
   * exit delay
   */
  timeout: number;
};

export default RippleProps;
