'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId, mergeStyles } from '@janribkaui/material-ui-tailwind/utils';
import { useDefaultProps } from '@janribkaui/material-ui-tailwind/DefaultPropsProvider';
import Button from '@janribkaui/material-ui-tailwind/Button';
import { ButtonGroupContext } from '@janribkaui/material-ui-tailwind/ButtonGroup';
import CircularProgress from '@janribkaui/material-ui-tailwind/CircularProgress';
import resolveProps from '@janribkaui/utils/resolveProps';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';

const LoadingButtonRoot = styled(Button)`
  &.loading-true {
    & .JrButton-startIcon,
    & .JrButton-endIcon {
      opacity: 0;
    }

    &.start-fullWidth-loading {
      & .JrButton-startIcon,
      & .JrButton-endIcon {
        margin-right: -0.5rem;
      }
    }
    &.end-fullWidth-loading {
      & .JrButton-startIcon,
      & .JrButton-endIcon {
        margin-left: -0.5rem;
      }
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
      loading: true,
      className: ['text-transparent', 'disabled:text-transparent'],
    },
    {
      loadingPosition: 'start',
      fullWidth: true,
      loading: true,
      className: ['start-fullWidth-loading'],
    },
    {
      loadingPosition: 'end',
      fullWidth: true,
      loading: true,
      className: ['end-fullWidth-loading'],
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
  compoundVariants: [
    { loadingPosition: 'start', size: 'small', className: ['left-2.5'] },
    { loadingPosition: 'start', size: 'medium', className: ['left-3.5'] },
    { loadingPosition: 'start', size: 'large', className: ['left-3.5'] },
    { loadingPosition: 'start', fullWidth: true, className: ['relative', '-left-2.5'] },
    { variant: 'text', loadingPosition: 'start', className: ['left-2.5'] },
    { loadingPosition: 'end', size: 'small', className: ['right-2.5'] },
    { loadingPosition: 'end', size: 'medium', className: ['right-3.5'] },
    { loadingPosition: 'end', size: 'large', className: ['right-3.5'] },
    { loadingPosition: 'end', fullWidth: true, className: ['relative', '-right-2.5'] },
    { variant: 'text', loadingPosition: 'end', className: ['right-2.5'] },
  ],
});

const LoadingButtonLabel = styled('span')`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const loadingButtonLabelVariants = tv({});

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
      size={size}
      fullWidth={fullWidth}
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

LoadingButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};

export default LoadingButton;
