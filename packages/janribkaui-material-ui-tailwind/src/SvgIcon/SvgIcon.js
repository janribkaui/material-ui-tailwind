'use client';
import * as React from 'react';
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

if (SvgIcon) {
  SvgIcon.jrName = 'SvgIcon';
}

export default SvgIcon;
