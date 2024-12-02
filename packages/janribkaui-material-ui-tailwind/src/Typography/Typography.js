'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useDefaultProps } from '../DefaultPropsProvider';
import styled from 'styled-components';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

export const TypographyRoot = styled.span`
  text-align: ${(props) => (props.$align !== 'inherit' ? 'var(--Typography-textAlign)' : null)};
`;
// TODO: Add typography and color variants
const typographyRootVariants = tv({
  base: [],
  variants: {
    noWrap: {
      true: ['overflow-hidden', 'text-ellipsis', ' whitespace-nowrap'],
      false: '',
    },
    gutterBottom: {
      true: 'mb-[0.35em]',
      false: '',
    },
  },
});

const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p',
};

const Typography = React.forwardRef(function Typography(inProps, ref) {
  const { color, ...props } = useDefaultProps({ props: inProps, name: 'JrTypography' });
  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;

  const Component =
    component ||
    (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) ||
    'span';

  return (
    <TypographyRoot
      as={Component}
      ref={ref}
      $align={align}
      className={mergeStyles(
        'JrTypography-root',
        typographyRootVariants({ noWrap, gutterBottom }),
        className,
      )}
      style={{
        ...(align !== 'inherit' && { '--Typography-textAlign': align }),
        ...other.style,
      }}
      {...other}
    />
  );
});

Typography.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes.oneOfType([
    PropTypes.oneOf([
      'error',
      'info',
      'primary',
      'secondary',
      'success',
      'textDisabled',
      'textPrimary',
      'textSecondary',
      'warning',
    ]),
    PropTypes.shape({
      '__@iterator@94': PropTypes.func.isRequired,
      anchor: PropTypes.func.isRequired,
      at: PropTypes.func.isRequired,
      big: PropTypes.func.isRequired,
      blink: PropTypes.func.isRequired,
      bold: PropTypes.func.isRequired,
      codePointAt: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      endsWith: PropTypes.func.isRequired,
      fixed: PropTypes.func.isRequired,
      fontcolor: PropTypes.func.isRequired,
      fontsize: PropTypes.func.isRequired,
      charAt: PropTypes.func.isRequired,
      charCodeAt: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      italics: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      link: PropTypes.func.isRequired,
      localeCompare: PropTypes.func.isRequired,
      match: PropTypes.func.isRequired,
      matchAll: PropTypes.func.isRequired,
      normalize: PropTypes.func.isRequired,
      padEnd: PropTypes.func.isRequired,
      padStart: PropTypes.func.isRequired,
      repeat: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      search: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      small: PropTypes.func.isRequired,
      split: PropTypes.func.isRequired,
      startsWith: PropTypes.func.isRequired,
      strike: PropTypes.func.isRequired,
      sub: PropTypes.func.isRequired,
      substr: PropTypes.func.isRequired,
      substring: PropTypes.func.isRequired,
      sup: PropTypes.func.isRequired,
      toLocaleLowerCase: PropTypes.func.isRequired,
      toLocaleUpperCase: PropTypes.func.isRequired,
      toLowerCase: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      toUpperCase: PropTypes.func.isRequired,
      trim: PropTypes.func.isRequired,
      trimEnd: PropTypes.func.isRequired,
      trimLeft: PropTypes.func.isRequired,
      trimRight: PropTypes.func.isRequired,
      trimStart: PropTypes.func.isRequired,
      valueOf: PropTypes.func.isRequired,
    }),
  ]),
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: PropTypes.oneOf([
    'body1',
    'body2',
    'button',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'inherit',
    'overline',
    'subtitle1',
    'subtitle2',
  ]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: PropTypes.shape({
    body1: PropTypes.string,
    body2: PropTypes.string,
    button: PropTypes.string,
    caption: PropTypes.string,
    h1: PropTypes.string,
    h2: PropTypes.string,
    h3: PropTypes.string,
    h4: PropTypes.string,
    h5: PropTypes.string,
    h6: PropTypes.string,
    inherit: PropTypes.string,
    overline: PropTypes.string,
    subtitle1: PropTypes.string,
    subtitle2: PropTypes.string,
  }),
};

export default Typography;
