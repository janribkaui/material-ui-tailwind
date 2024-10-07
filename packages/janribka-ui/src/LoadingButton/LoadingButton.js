'use client';
import * as React from 'react';
import { unstable_useId as useId, mergeStyles } from '@janribka/ui/utils';
import { useDefaultProps } from '@janribka/ui/DefaultPropsProvider';
import Button from '@janribka/ui/Button';
import { ButtonGroupContext } from '@janribka/ui/ButtonGroup';
import CircularProgress from '@janribka/ui/CircularProgress';
import resolveProps from '@janribka/utils/resolveProps';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';

const LoadingButtonRoot = styled(Button)`
  &.loading-true {
    & .JrButton-startIcon,
    & .JrButton-endIcon {
      opacity: 0;
    }
  }
`;

const loadingButtonRootVariants = tv({
  base: ['inline-flex'],
  variants: {
    loadingPosition: {
      start: [],
      end: [],
      center: [
        'transition-background-color',
        'transition-box-shadow',
        'transition-border-color',
        'duration-short',
      ],
    },
    loading: {
      true: ['loading-true'],
      false: [],
    },
    fullWidth: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    {
      loadingPosition: 'center',
      loading: 'true',
      className: 'text-transparent',
    },
  ],
});

const LoadingButtonLoadingIndicator = styled('span')``;

const loadingButtonLoadingIndicatorVariants = tv({
  base: ['absolute', 'visible', 'flex'],
  variants: {
    loadingPosition: {
      start: [],
      end: [],
      center: ['left-1/2', ' -translate-x-1/2', ' text-action-disabled'],
    },
    size: { small: [], medium: [], large: [] },
    variant: { text: [], outlined: [], contained: [] },
    fullWidth: { true: [], false: [] },
  },
  // Vsechny varianty tu nemusi byt
  compoundVariants: [
    { loadingPosition: 'start', size: 'small', className: ['left-2.5'] },
    { loadingPosition: 'start', size: 'medium', className: ['left-3.5'] },
    { loadingPosition: 'start', size: 'large', className: ['left-3.5'] },
    { loadingPosition: 'start', fullWidth: 'true', className: ['relative', '-left-2.5'] },
    { variant: 'text', loadingPosition: 'start', className: ['left-2.5'] },
    { loadingPosition: 'end', size: 'small', className: ['left-2.5'] },
    { loadingPosition: 'end', size: 'medium', className: ['right-3.5'] },
    { loadingPosition: 'end', size: 'large', className: ['right-3.5'] },
    { loadingPosition: 'end', fullWidth: 'true', className: ['relative', '-right-2.5'] },
    { variant: 'text', loadingPosition: 'end', className: ['right-2.5'] },
  ],
});

const LoadingButtonLabel = styled('span')`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const loadingButtonLabelVariants = tv({
  // base: ['transition-opacity', 'duration-short', 'opacity-0'],
  // variants: {
  //   loading: {
  //     true: [''],
  //     false: [],
  //   },
  //   loadingPosition: {
  //     start: [],
  //     end: [],
  //     center: [],
  //   },
  //   fullWidth: {
  //     true: [],
  //     false: [],
  //   },
  // },
  // compoundVariants: [
  //   {
  //     loadingPosition: 'start',
  //     fullWidth: 'true',
  //     loading: 'true',
  //     className: ['transition-opacity', 'duration-short', 'opacity-0', '-mr-2'],
  //   },
  //   {
  //     loadingPosition: 'end',
  //     fullWidth: 'true',
  //     loading: 'true',
  //     className: ['transition-opacity', 'duration-short', 'opacity-0', '-ml-2'],
  //   },
  // ],
});

const LoadingButton = React.forwardRef(function LoadingButton(inProps, ref) {
  const contextProps = React.useContext(ButtonGroupContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'JrLoadingButton' });
  const {
    children,
    disabled = false,
    id: idProp,
    loading = false,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    variant = 'text',
    size = 'medium',
    fullWidth = false,
    ...other
  } = props;

  const id = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress aria-labelledby={id} color="inherit" size={16} />
  );

  const loadingButtonLoadingIndicator = loading ? (
    <LoadingButtonLoadingIndicator
      className={
        (mergeStyles('JrLoadingButton-loadingIndicator'),
        loadingButtonLoadingIndicatorVariants({
          loadingPosition,
          size,
          variant,
          fullWidth,
        }))
      }
    >
      {loadingIndicator}
    </LoadingButtonLoadingIndicator>
  ) : null;

  return (
    <LoadingButtonRoot
      disabled={disabled || loading}
      className={mergeStyles(
        'JrLoadingButton-root',
        loadingButtonRootVariants({ loadingPosition, loading, fullWidth }),
      )}
      id={id}
      ref={ref}
      {...other}
      variant={variant}
    >
      {loadingPosition === 'end' ? (
        <LoadingButtonLabel
          className={mergeStyles(
            'JrLoadingButton-label',
            loadingButtonLabelVariants({ loading, loadingPosition, fullWidth }),
          )}
        >
          {children}
        </LoadingButtonLabel>
      ) : (
        loadingButtonLoadingIndicator
      )}

      {loadingPosition === 'end' ? (
        loadingButtonLoadingIndicator
      ) : (
        <LoadingButtonLabel
          className={mergeStyles(
            'JrLoadingButton-label',
            loadingButtonLabelVariants({ loading, loadingPosition, fullWidth }),
          )}
        >
          {children}
        </LoadingButtonLabel>
      )}
    </LoadingButtonRoot>
  );
});

export default LoadingButton;
