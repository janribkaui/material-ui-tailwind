import { useRef } from "react";

const D3SButtonBase = (props: D3SButtonBaseProps) => {
  // References
  const refButton = useRef<HTMLButtonElement>(null);

  // Props
  const { children, disabled, className, size, variant, radius, ...restProps } =
    props;

  // Ripple effect
  useRipple(refButton);

  return (
    <button
      ref={refButton}
      disabled={disabled}
      aria-disabled={disabled}
      className={mergeStyles(
        className,
        d3SButtonBaseVariants({
          size: size,
          variant: variant,
          radius: radius,
          disabled: disabled,
        })
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default D3SButtonBase;
