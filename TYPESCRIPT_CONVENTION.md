# TypeScript convention

## Component

> **Public components** are considered all components exported from `@janribkaui/material-ui-tailwind` or `@janribkaui/lab`.
>
> **Internal components** are considered all components that are not exported from the packages, but only used in some public component.

### `Props Interface`

- export interface `{ComponentName}Props`
- always export props interface (use `interface` over `type`) from the component file

<details>
  <summary>Public component</summary>

```ts
// Foo.tsx
export interface FooProps {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  // ...other props
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
}
```

</details>
<details>
  <summary>internal component</summary>

```ts
// Bar.tsx
export interface BarProps {
  disabled?: boolean;
  // ...other props
  startIcon?: React.ReactNode;
}
```

</details>

### `ClassKey`

- naming as `{ComponentName}ClassKey`
- export if `classes` exists in props interface using `keyof` from `{component}Classes.ts`

```ts
// fooClasses.ts
export interface FooClasses {
  ...
}

export type FooClassKey = keyof FooClasses;
// verify that FooClassKey is union of string literal
```

### `StyledComponent`

- naming using slot `{ComponentName}{Slot}`
- to extend interface of the styled component, pass argument to generic

<details>
  <summary>public component</summary>

```ts
const FooRoot = styled.div({
  // styling
});

<FooRoot className="JrFoo-root" />
```

</details>
<details>
  <summary>internal component</summary>

```ts
const BarRoot = styled.div({
  // styling
});

<BarRoot className="JrBar-root" />
```

</details>

### `Tailwind variants`

- naming using slot `{ComponentName}{Slot}Variants`

<details>
  <summary>public/internal component</summary>

```ts
const fooRootVariants = tv({
  // styling
});

<FooRoot className=mergeStyles("JrFoo-root", fooRootVariants({})) />
```

</details>
<details>
  <summary>extends interface</summary>

```ts
const barRootVariants = tv({
  extend: fooRootVariants,
  // styling
});
```

### `Component declaration`

- prefer `function Component() {}` over `React.FC`
- naming the render function in `React.forwardRef` (for devtools)
- `useThemeProps` is needed only for public component

<details>
  <summary>public component</summary>

```ts
const Foo = React.forwardRef<HTMLSpanElement, FooProps>(function Foo(inProps, ref) => {
  // pass args like this, otherwise will get error about theme at return section
  const props = useThemeProps<Theme, FooProps, 'JrFoo'>({
    props: inProps,
    name: 'JrFoo',
  });
  const { children, className, ...other } = props

  // ...implementation

  return (
    <FooRoot
      ref={ref}
      className={mergeStyles("JrFoo-root", fooRootVariants({}), className)}
      {...other}
    >
      {children}
    </FooRoot>
  )
})
```

</details>
<details>
  <summary>internal component</summary>

```ts
const classes = generateUtilityClasses('PrivateBar', ['selected']);

const BarRoot = styled.div({
  // Styles
}));

// if this component does not need React.forwardRef, don't use React.FC
const Bar = (props: BarProps) => {
  const { className, selected, ...other } = props;
  return <BarRoot className={mergeStyles("JrBar-root", bsrRootVariants({}), className)} {...other} />;
};
```

</details>
