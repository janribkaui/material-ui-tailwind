import * as React from 'react';

import SystemInitColorSchemeScript from '@janribkaui/system/InitColorSchemeScript';

export const defaultConfig = {
  attribute: 'data-jr-color-scheme',
  colorSchemeStorageKey: 'jr-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'jr-mode',
} as const;

export default (function InitColorSchemeScript(props: any) {
  return <SystemInitColorSchemeScript {...defaultConfig} {...props} />;
} as typeof SystemInitColorSchemeScript);
