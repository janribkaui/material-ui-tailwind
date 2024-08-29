'use client';
import { CreateJRStyled } from '@janribka/system';
import createStyled from '@janribka/system/createStyled';

import { Theme } from './createTheme';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';
import rootShouldForwardProp from './rootShouldForwardProp';

export { default as slotShouldForwardProp } from './slotShouldForwardProp';
export { default as rootShouldForwardProp } from './rootShouldForwardProp';

const rootShouldForwardPropRetyped = rootShouldForwardProp as (props: PropertyKey) => boolean;

const styled: CreateJRStyled<Theme> = createStyled({
  themeId: THEME_ID,
  defaultTheme,
  rootShouldForwardProp: rootShouldForwardPropRetyped,
});

export default styled;
