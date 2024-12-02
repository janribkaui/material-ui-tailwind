'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStyles } from '../utils';
import { tv } from 'tailwind-variants';

const SvgIconRoot = styled('svg')`
  &.size-inherit {
    font-size: inherit;
  }
`;

export const svgIconRootVariants = tv({
  base: [
    'select-none',
    'w-[1em] h-[1em]',
    'inline-block',
    'shrink-0',
    'transition-fill',
    'duration-shorter',
    'ease-in-out',
  ],
  variants: {
    hasSvgAsChild: {
      true: [''],
      false: ['fill-current'],
    },
    fontSize: {
      inherit: ['size-inherit'],
      small: ['text-[1.25rem]'],
      medium: ['text-[1.5rem]'],
      large: ['text-[2.1875rem]'],
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      action: 'text-action-active',
      disabled: 'text-action-disabled',
    },
  },
});

const SvgIcon = React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrSvgIcon' });
  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24',
    ...other
  } = props;

  const hasSvgAsChild = React.isValidElement(children) && children.type === 'svg';

  const more = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  return (
    <SvgIconRoot
      as={component}
      className={mergeStyles(
        'JrSvgIcon-root',
        svgIconRootVariants({ hasSvgAsChild, fontSize, color }),
      )}
      focusable="false"
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      ref={ref}
      {...more}
      {...other}
      {...(hasSvgAsChild && children.props)}
    >
      {hasSvgAsChild ? children.props.children : children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </SvgIconRoot>
  );
});

SvgIcon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes.oneOf([
    'action',
    'disabled',
    'error',
    'info',
    'inherit',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes.oneOf(['inherit', 'large', 'medium', 'small']),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string,
};

if (SvgIcon) {
  SvgIcon.jrName = 'SvgIcon';
}

export default SvgIcon;
