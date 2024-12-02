import * as React from 'react';

export default function isJrElement(element: any, jrNames: readonly string[]): boolean {
  return (
    React.isValidElement(element) &&
    jrNames.indexOf(
      // For server components `jrName` is available in element.type._payload.value.jrName
      // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
      // eslint-disable-next-line no-underscore-dangle
      (element.type as any).jrName ?? (element.type as any)?._payload?.value?.jrName,
    ) !== -1
  );
}
