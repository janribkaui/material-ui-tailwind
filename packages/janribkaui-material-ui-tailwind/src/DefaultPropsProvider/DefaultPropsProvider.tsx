'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

import SystemDefaultPropsProvider, {
  useDefaultProps as useSystemDefaultProps,
} from '@janribkaui/system/DefaultPropsProvider';

import type { ComponentsPropsList } from '../styles/props';

function DefaultPropsProvider(
  props: React.PropsWithChildren<{
    value: { [P in keyof ComponentsPropsList]?: Partial<ComponentsPropsList[P]> };
  }>,
) {
  return <SystemDefaultPropsProvider {...props} />;
}

DefaultPropsProvider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  value: PropTypes.shape({
    JrButton: PropTypes.object,
    JrButtonBase: PropTypes.object,
    JrCircularProgress: PropTypes.object,
    JrFormControl: PropTypes.object,
    JrFormControlLabel: PropTypes.object,
    JrFormGroup: PropTypes.object,
    JrFormHelperText: PropTypes.object,
    JrFormLabel: PropTypes.object,
    JrCheckbox: PropTypes.object,
    JrIconButton: PropTypes.object,
    JrLinearProgress: PropTypes.object,
    JrSwitch: PropTypes.object,
    JrTouchRipple: PropTypes.object,
  }).isRequired,
} as any;

export default DefaultPropsProvider;

export function useDefaultProps<Props extends Record<string, any>>(params: {
  props: Props;
  name: string;
}) {
  return useSystemDefaultProps(params) as Props;
}
