'use client';
import * as React from 'react';
import {
  capitalize,
  unstable_useId as useId,
  unstable_memoTheme as memoTheme,
  mergeStyles,
} from '@janribka/ui/utils';
import { useDefaultProps } from '@janribka/ui/DefaultPropsProvider';
import Button from '@mui/material/Button';
import { ButtonGroupContext } from '@janribka/ui/ButtonGroup';
import CircularProgress from '@janribka/ui/CircularProgress';
import resolveProps from '@mui/utils/resolveProps';
import { styled } from '../zero-styled';
import { tv } from 'tailwind-variants';

const LoadingButtonRoot = styled(Button)``;

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
      true: [],
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
    {
      loadingPosition: 'start',
      fullWidth: 'true',
      startIconLoadingStart: 'true',
      className: ['transition-opacity', 'duration-short', 'opacity-0', '-mr-2'],
    },
    {
      loadingPosition: 'start',
      fullWidth: 'true',
      endIconLoadingStart: 'true',
      className: ['transition-opacity', 'duration-short', 'opacity-0', '-mr-2'],
    },
    {
      loadingPosition: 'end',
      fullWidth: 'true',
      startIconLoadingStart: 'true',
      className: ['transition-opacity', 'duration-short', 'opacity-0', '-ml-2'],
    },
    {
      loadingPosition: 'end',
      fullWidth: 'true',
      endIconLoadingStart: 'true',
      className: ['transition-opacity', 'duration-short', 'opacity-0', '-ml-2'],
    },
  ],
});

const LoadingButtonLoadingIndicator = styled('span', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.loadingIndicator,
      styles[`loadingIndicator${capitalize(ownerState.loadingPosition)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
    variants: [
      {
        props: {
          loadingPosition: 'start',
          size: 'small',
        },
        style: {
          left: 10,
        },
      },
      {
        props: ({ loadingPosition, ownerState }) =>
          loadingPosition === 'start' && ownerState.size !== 'small',
        style: {
          left: 14,
        },
      },
      {
        props: {
          variant: 'text',
          loadingPosition: 'start',
        },
        style: {
          left: 6,
        },
      },
      {
        props: {
          loadingPosition: 'center',
        },
        style: {
          left: '50%',
          transform: 'translate(-50%)',
          color: (theme.vars || theme).palette.action.disabled,
        },
      },
      {
        props: {
          loadingPosition: 'end',
          size: 'small',
        },
        style: {
          right: 10,
        },
      },
      {
        props: ({ loadingPosition, ownerState }) =>
          loadingPosition === 'end' && ownerState.size !== 'small',
        style: {
          right: 14,
        },
      },
      {
        props: {
          variant: 'text',
          loadingPosition: 'end',
        },
        style: {
          right: 6,
        },
      },
      {
        props: ({ ownerState }) => ownerState.loadingPosition === 'start' && ownerState.fullWidth,
        style: {
          position: 'relative',
          left: -10,
        },
      },
      {
        props: ({ ownerState }) => ownerState.loadingPosition === 'end' && ownerState.fullWidth,
        style: {
          position: 'relative',
          right: -10,
        },
      },
    ],
  })),
);

const LoadingButtonLabel = styled.span`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const loadingButtonLabelVariants = tv({
  base: ['transition-opacity', 'duration-short', 'opacity-0'],
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
    ...other
  } = props;

  const id = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress aria-labelledby={id} color="inherit" size={16} />
  );

  const loadingButtonLoadingIndicator = loading ? (
    <LoadingButtonLoadingIndicator className={classes.loadingIndicator} ownerState={ownerState}>
      {loadingIndicator}
    </LoadingButtonLoadingIndicator>
  ) : null;

  return (
    <LoadingButtonRoot
      disabled={disabled || loading}
      className={mergeStyles('JrLoadingButton-root', loadingButtonRootVariants({}))}
      id={id}
      ref={ref}
      {...other}
      variant={variant}
    >
      {loadingPosition === 'end' ? (
        <LoadingButtonLabel
          className={mergeStyles('JrLoadingButton-label', loadingButtonLabelVariants({}))}
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
          className={mergeStyles('JrLoadingButton-label', loadingButtonLabelVariants({}))}
        >
          {children}
        </LoadingButtonLabel>
      )}
    </LoadingButtonRoot>
  );
});

export default LoadingButton;
