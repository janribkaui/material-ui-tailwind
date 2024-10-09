'use client';
import * as React from 'react';

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

export default DefaultPropsProvider;

export function useDefaultProps<Props extends Record<string, any>>(params: {
  props: Props;
  name: string;
}) {
  return useSystemDefaultProps(params) as Props;
}
