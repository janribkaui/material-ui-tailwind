'use client';

import * as React from 'react';

import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { StyledEngineProviderProps } from './StyledEngineProviderProps';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
let cache: EmotionCache | null = null;
if (typeof document === 'object') {
  cache = createCache({ key: 'css', prepend: true });
}

export default function StyledEngineProvider(props: StyledEngineProviderProps) {
  const { injectFirst, children } = props;
  return injectFirst && cache ? <CacheProvider value={cache}>{children}</CacheProvider> : children;
}
