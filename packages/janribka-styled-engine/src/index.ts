'use client';

// Types
import * as CSS from 'csstype';

import { PropsOf } from '@emotion/react';
import emStyled, { StyledComponent, StyledOptions } from '@emotion/styled';

export { default as styled } from '@emotion/styled';
export * from '@emotion/styled';
// export { ThemeContext, keyframes, css } from '@emotion/react';

// export { default as StyledEngineProvider } from './StyledEngineProvider';

// export { default as GlobalStyles } from './GlobalStyles';
// export * from './GlobalStyles';

export type JRStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
> = StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

export interface SerializedStyles {
  name: string;
  styles: string;
  map?: string;
  next?: SerializedStyles;
}

export type CSSProperties = CSS.PropertiesFallback<number | string>;
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K] | ReadonlyArray<Extract<CSSProperties[K], string>>;
};

// TODO v6 - check if we can drop the unknown, as it breaks the autocomplete
// For more info on why it was added, see https://github.com/mui/material-ui/pull/26228
export type CSSPseudos = { [K in CSS.Pseudos]?: unknown | CSSObject };

// TODO v6 - check if we can drop the unknown, as it breaks the autocomplete
// For more info on why it was added, see https://github.com/mui/material-ui/pull/26228
export interface CSSOthersObject {
  [propertiesName: string]: unknown | CSSInterpolation;
}
export type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };

export interface ArrayCSSInterpolation extends ReadonlyArray<CSSInterpolation> {}

export interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

// Omit variants as a key, because we have a special handling for it
export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudos,
    Omit<CSSOthersObject, 'variants'> {}

interface CSSObjectWithVariants<Props> extends Omit<CSSObject, 'variants'> {
  variants: Array<{
    props: Props | ((props: Props) => boolean);
    style: CSSObject;
  }>;
}

export interface ComponentSelector {
  __emotion_styles: any;
}

export type Keyframes = {
  name: string;
  styles: string;
  anim: number;
  toString: () => string;
} & string;

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject;

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation;

export interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>;
}

export interface ArrayInterpolation<Props> extends ReadonlyArray<Interpolation<Props>> {}

export type Interpolation<Props> =
  | InterpolationPrimitive
  | CSSObjectWithVariants<Props>
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>;

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
  T extends object = {},
> {
  (
    ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
  ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;

  (
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
  ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
}

/** Same as StyledOptions but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<Props, ForwardedProps extends keyof Props = keyof Props> {
  label?: string;
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;
  target?: string;
}

export interface CreateJRStyled<
  JRStyledCommonProps extends {},
  JRStyledOptions,
  Theme extends object,
> {
  <
    C extends React.ComponentClass<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & JRStyledOptions,
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & JRStyledCommonProps,
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    },
    Theme
  >;

  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<PropsOf<C> & JRStyledCommonProps> & JRStyledOptions,
  ): CreateStyledComponent<
    PropsOf<C> & JRStyledCommonProps,
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    },
    Theme
  >;

  <
    C extends React.JSXElementConstructor<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & JRStyledOptions,
  ): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & JRStyledCommonProps, {}, {}, Theme>;

  <C extends React.JSXElementConstructor<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<PropsOf<C> & JRStyledCommonProps> & JRStyledOptions,
  ): CreateStyledComponent<PropsOf<C> & JRStyledCommonProps, {}, {}, Theme>;

  <
    Tag extends keyof React.JSX.IntrinsicElements,
    ForwardedProps extends
      keyof React.JSX.IntrinsicElements[Tag] = keyof React.JSX.IntrinsicElements[Tag],
  >(
    tag: Tag,
    options: FilteringStyledOptions<React.JSX.IntrinsicElements[Tag], ForwardedProps> &
      JRStyledOptions,
  ): CreateStyledComponent<
    JRStyledCommonProps,
    Pick<React.JSX.IntrinsicElements[Tag], ForwardedProps>,
    {},
    Theme
  >;

  <Tag extends keyof React.JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions<JRStyledCommonProps> & JRStyledOptions,
  ): CreateStyledComponent<JRStyledCommonProps, React.JSX.IntrinsicElements[Tag], {}, Theme>;
}

// Content
export default function styled(tag: any, options: FilteringStyledOptions<any, string>) {
  const stylesFactory = emStyled(tag, options);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles: any[]) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error(
          [
            `JR: Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
          ].join('\n'),
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(
          `MUI: the styled(${component})(...args) API requires all its args to be defined.`,
        );
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

export const internal_processStyles = (
  tag: React.ElementType,
  processor: (styles: any) => any,
): void => {
  // Emotion attaches all the styles as `__emotion_styles`.
  // Ref: https://github.com/emotion-js/emotion/blob/16d971d0da229596d6bcc39d282ba9753c9ee7cf/packages/styled/src/base.js#L186
  if (Array.isArray((tag as any).__emotion_styles)) {
    (tag as any).__emotion_styles = processor((tag as any).__emotion_styles);
  }
};

export { ThemeContext, keyframes, css } from '@emotion/react';

export { default as StyledEngineProvider } from './StyledEngineProvider';
export * from './StyledEngineProvider';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';
