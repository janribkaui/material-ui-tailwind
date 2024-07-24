import * as React from 'react';

export interface RtlProviderProps {
  children?: React.ReactNode;
  value?: boolean;
}
// TODO: Definice objektů zde nejsou potřeba, odstranit ze všech d.ts souborů
// declare const RtlProvider: React.FC<RtlProviderProps>;
export const useRtl: () => boolean;

// export default RtlProvider;
