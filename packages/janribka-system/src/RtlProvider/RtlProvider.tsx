import * as React from 'react';

import { RtlProviderProps } from './RtlProviderProps';

const RtlContext = React.createContext<boolean | null>(null);

function RtlProvider({ value, ...props }: RtlProviderProps) {
  return <RtlContext.Provider value={value ?? true} {...props} />;
}

export const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider;
