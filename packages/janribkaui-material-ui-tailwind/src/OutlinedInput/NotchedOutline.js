'use client';
import * as React from 'react';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const NotchedOutlineRoot = styled.fieldset``;

const notchedOutlineRootVariants = tv({
  base: [
    'text-left',
    'absolute',
    'bottom-0',
    'right-0',
    'top-[-5px]',
    'left-0',
    'm-0',
    'py-0',
    'px-[8px]',
    'pointer-events-none',
    'rounded-[inherit]',
    'border-solid',
    'border-[1px]',
    'overflow-hidden',
    'min-w-[0%]',
  ],
});

const NotchedOutlineLegend = styled.legend`
  float: unset; // Fix conflict with bootstrap
`;

const notchedOutlineLegendVariants = tv({
  base: [
    'w-auto', // Fix conflict with bootstrap
    'overflow-hidden', // Fix Horizontal scroll when label too long
  ],
  variants: {
    withLabel: {
      true: [
        'block', // Fix conflict with normalize.css and sanitize.css
        'p-0',
        'h-[11px]', // sync with `lineHeight` in `legend` styles
        'text-[0.75rem]',
        'invisible',
        'max-w-[0.01px]',
        'transition-max-width duration-[50ms] ease-out',
        'whitespace-nowrap',
        '[&>span]:px-[5px]',
        '[&>span]:inline-block',
        '[&>span]:opacity-0',
        '[&>span]:visible',
      ],
      false: [
        'p-0',
        'leading-[11px]', // sync with `height` in `legend` styles,
        'transition-width duration-[150ms] ease-out',
      ],
    },
    notched: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    {
      withLabel: true,
      notched: true,
      className: ['max-w-full', 'transition-max-width duration-[100ms] ease-out delay-[50ms]'],
    },
  ],
});

/**
 * @ignore - internal component.
 */
export default function NotchedOutline(props) {
  const { children, classes, className, label, notched, ...other } = props;
  const withLabel = label != null && label !== '';

  return (
    <NotchedOutlineRoot
      aria-hidden
      className={mergeStyles(notchedOutlineRootVariants({ withLabel, notched }), className, '')}
      {...other}
    >
      <NotchedOutlineLegend className={notchedOutlineLegendVariants({})}>
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {withLabel ? (
          <span>{label}</span>
        ) : (
          // notranslate needed while Google Translate will not fix zero-width space issue
          <span className="notranslate" aria-hidden>
            &#8203;
          </span>
        )}
      </NotchedOutlineLegend>
    </NotchedOutlineRoot>
  );
}
