'use client';
import * as React from 'react';
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

export default Typography;
