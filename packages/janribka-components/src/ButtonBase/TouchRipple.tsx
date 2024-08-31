'use client';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';

import mergeStyles from '@janribka/utils/mergeStyles';
import useTimeout from '@janribka/utils/useTimeout';

import { InternalStandardProps as StandardProps } from '../index';
import Ripple from './Ripple';
import { TouchRippleClasses, TouchRippleClassKey } from './touchRippleClasses';

// Types
export { TouchRippleClassKey };

export interface StartActionOptions {
  pulsate?: boolean;
  center?: boolean;
}

export interface TouchRippleActions {
  start: (
    event?: React.SyntheticEvent,
    options?: StartActionOptions,
    callback?: () => void,
  ) => void;
  pulsate: (event?: React.SyntheticEvent) => void;
  stop: (event?: React.SyntheticEvent, callback?: () => void) => void;
}

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TouchRippleClasses>;
};

// Content

const DURATION = 550;
export const DELAY_RIPPLE = 80;

const TouchRipple = function TouchRipple(props: TouchRippleProps) {
  // Props
  const { center: centerProp = false, classes = {}, className, ref, ...restProps } = props;

  // State
  const [ripples, setRipples] = React.useState<React.ReactNode[]>([]);

  //References
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef<Function | null>(null);
  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false);
  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = React.useRef<Function | null>(null);
  const container = React.useRef<HTMLElement>(null);

  // Constants
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = useTimeout();

  // Effects
  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Handlers
  const startCommit = React.useCallback(
    (params: {
      pulsate: boolean;
      rippleX: number;
      rippleY: number;
      rippleSize: number;
      cb: any;
    }) => {
      const { pulsate, rippleX, rippleY, rippleSize, cb } = params;

      setRipples((oldRipples) => [
        ...oldRipples,
        <Ripple
          key={nextKey.current}
          timeout={DURATION}
          pulsate={pulsate}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]);
      nextKey.current += 1;
      rippleCallback.current = cb;
    },
    [classes],
  );

  const start = React.useCallback(
    (
      event: { type?: string; clientX?: number; clientY?: number; touches?: Array<any> } = {},
      options: { pulsate?: boolean; center?: boolean; fakeElement?: boolean } = {},
      cb = () => {},
    ) => {
      const {
        pulsate = false,
        center = centerProp || options.pulsate,
        fakeElement = false, // For test purposes
      } = options;

      if (event?.type === 'mousedown' && ignoringMouseDown.current) {
        ignoringMouseDown.current = false;
        return;
      }

      if (event?.type === 'touchstart') {
        ignoringMouseDown.current = true;
      }

      const element = fakeElement ? null : container.current;
      const rect = element
        ? element.getBoundingClientRect()
        : {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          };

      // Get the size of the ripple
      let rippleX;
      let rippleY;
      let rippleSize;

      if (
        center ||
        event === undefined ||
        (event.clientX === 0 && event.clientY === 0) ||
        (!event.clientX && !event.touches)
      ) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        const { clientX, clientY } =
          event.touches && event.touches.length > 0 ? event.touches[0] : event;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }

      if (center) {
        rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

        // For some reason the animation is broken on Mobile Chrome if the size is even.
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        const sizeX =
          Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
        const sizeY =
          Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
      }

      // Touche devices
      if (event?.touches) {
        // check that this isn't another touchstart due to multitouch
        // otherwise we will only clear a single timer when unmounting while two
        // are running
        if (startTimerCommit.current === null) {
          // Prepare the ripple effect.
          startTimerCommit.current = () => {
            startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
          };
          // Delay the execution of the ripple effect.
          // We have to make a tradeoff with this delay value.
          startTimer.start(DELAY_RIPPLE, () => {
            if (startTimerCommit.current) {
              startTimerCommit.current();
              startTimerCommit.current = null;
            }
          });
        }
      } else {
        startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
      }
    },
    [centerProp, startCommit, startTimer],
  );

  const pulsate = React.useCallback(() => {
    start({}, { pulsate: true });
  }, [start]);

  const stop = React.useCallback(
    (event: { type: string }, cb: Function | null) => {
      startTimer.clear();

      // The touch interaction occurs too quickly.
      // We still want to show ripple effect.
      if (event?.type === 'touchend' && startTimerCommit.current) {
        startTimerCommit.current();
        startTimerCommit.current = null;
        startTimer.start(0, () => {
          stop(event, cb);
        });
        return;
      }

      startTimerCommit.current = null;

      setRipples((oldRipples) => {
        if (oldRipples.length > 0) {
          return oldRipples.slice(1);
        }
        return oldRipples;
      });
      rippleCallback.current = cb;
    },
    [startTimer],
  );

  // Styles
  const touchRippleClassName = mergeStyles(
    className,
    'overflow-hidden pointer-events-none absolute z-0 top-0 right-0 bottom-0 left-0 rounded-[inherit]',
  );

  // Render
  React.useImperativeHandle(
    ref,
    () => ({
      pulsate,
      start,
      stop,
    }),
    [pulsate, start, stop],
  );

  return (
    <span className={touchRippleClassName} ref={container} {...restProps}>
      <TransitionGroup component={null} exit>
        {ripples}
      </TransitionGroup>
    </span>
  );
};

export default TouchRipple;
