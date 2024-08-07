export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  //   shape?: ShapeOptions;
  //   breakpoints?: BreakpointsOptions;
  direction?: Direction;
  //   mixins?: unknown;
  palette?: Record<string, any>;
  // shadows?: unknown;
  //   spacing?: SpacingOptions;
  transitions?: unknown;
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
  transitions?: unknown;
  // components?: Record<string, any>;
  // typography?: unknown;
  // zIndex?: unknown;
  // applyStyles: ApplyStyles<'light' | 'dark'>;
}
