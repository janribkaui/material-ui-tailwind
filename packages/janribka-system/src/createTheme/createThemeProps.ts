import { Transitions, TransitionsOptions } from '../createTransitions';

export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  //   shape?: ShapeOptions;
  //   breakpoints?: BreakpointsOptions;
  direction?: Direction;
  //   mixins?: unknown;
  palette?: Record<string, any>;
  // shadows?: unknown;
  //   spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  //   components?: Record<string, any>;
  //   typography?: unknown;
  //   zIndex?: Record<string, number>;
}

export interface Theme {
  // shape: Shape;
  // breakpoints: Breakpoints;
  direction: Direction;
  mixins?: unknown;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  // shadows?: unknown;
  // spacing: Spacing;
  transitions?: Transitions;
  // components?: Record<string, any>;
  // typography?: unknown;
  // zIndex?: unknown;
  // applyStyles: ApplyStyles<'light' | 'dark'>;
}
