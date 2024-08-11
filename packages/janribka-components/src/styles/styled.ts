'use client';
import createStyled from '@janribka/system/createStyled';

import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';
import rootShouldForwardProp from './rootShouldForwardProp';

export { default as slotShouldForwardProp } from './slotShouldForwardProp';
export { default as rootShouldForwardProp } from './rootShouldForwardProp';

const rootShouldForwardPropRetyped = rootShouldForwardProp as (props: PropertyKey) => boolean;

const styled = createStyled({
  themeId: THEME_ID,
  defaultTheme,
  rootShouldForwardProp: rootShouldForwardPropRetyped,
});

export default styled;
