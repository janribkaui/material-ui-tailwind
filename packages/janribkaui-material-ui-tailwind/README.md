<h1 align="center">JanRibka UI</h1>

JanRibka is an open-source React component library for react projects with tailwind that implements Google's [Material Design](https://m2.material.io/design/introduction/)

<p align="center">
    <a href="https://www.npmjs.com/package/@janribkaui/material-ui-tailwind">
        <img alt="NPM Version" src="https://badgen.net/npm/v/@janribkaui/material-ui-tailwind" />
    </a>
    <a href="https://github.com/nextui-org/@janribkaui/material-ui-tailwind/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/@janribkaui/material-ui-tailwind?style=flat" alt="License">
    </a>
</p>

## Installation

To use material-ui-tailwind in your project, you can install it as a dependency:

```bash
yarn add @janribkaui/material-ui-tailwind
# or
npm i @janribkaui/material-ui-tailwind
# or
pnpm add @janribkaui/material-ui-tailwind
```

## Components

- Button
- Loading button
- Icon button
- Circular progress
- Linear progress
- Still working on new components

## Usage

### Tailwind config

```ts
import type { Config } from 'tailwindcss';
import twConfigBase from '@janribkaui/material-ui-tailwind/tailwind.config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@janribkaui/material-ui-tailwind/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [twConfigBase],
};

export default config;
```

### Button

```ts
import Button from '@janribkaui/material-ui-tailwind/Button';
import { AiFillAndroid } from 'react-icons/ai';
import { TbArrowBigRightLinesFilled } from 'react-icons/tb';

const App = () => {
    return (
        <>
            <Button
                size="small"
                startIcon={<AiFillAndroid />}
                endIcon={<TbArrowBigRightLinesFilled />}
            >
                Small
            </Button>
            <Button size="small" variant="outlined" disabled>
                Small
            </Button>
        </>
    )
}
```

### Loading button

```ts
import LoadingButton from '@janribkaui/material-ui-tailwind/LoadingButton';
import { AiFillAndroid } from 'react-icons/ai';

const App = () => {
    return (
        <>
            <LoadingButton
              loading={loading}
              variant="contained"
              size="medium"
              fullWidth
              loadingPosition="end"
              endIcon={<AiFillAndroid />}
            >
              Fetch data
            </LoadingButton>
            <LoadingButton loading loadingIndicator="Loading…" variant="outlined" size="small">
              Fetch data
            </LoadingButton>
        </>
    )
}
```

### Icon button

```ts
import IconButton from '@janribkaui/material-ui-tailwind/IconButton';
import { AiFillAndroid } from 'react-icons/ai';

const App = () => {
    return (
        <>
            <IconButton>
                <AiFillAndroid />
            </IconButton>
            <IconButton size="small" color="secondary">
                <AiFillAndroid />
            </IconButton>
        </>
    )
}
```

### Circular progress

```ts
import CircularProgress from '@janribkaui/material-ui-tailwind/CircularProgress';

const App = () => {
    return (
        <>
            <CircularProgress color="success" size="3rem" />

            <CircularProgress variant="determinate" value={25} size={40} />
        </>
    )
}
```

### Linear progress

```ts
import LinearProgress from '@janribkaui/material-ui-tailwind/LinearProgress';

const App = () => {
    return (
        <>
            <LinearProgress color="secondary" />

            <LinearProgress variant="determinate" value={progress} />

            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
        </>
    )
}
```

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discuss JanRibka UI on GitHub](https://github.com/janribkaui/material-ui-tailwind/discussions)

## Contributing

If you're interested in contributing to JanRibka UI, please read our [contributing docs](https://github.com/janribkaui/material-ui-tailwind/blob/main/janribkaui/CONTRIBUTING.md) **before submitting a pull request**.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).

## Security

For details of supported versions and contact details for reporting security issues, please refer to the [security policy](https://github.com/janribkaui/material-ui-tailwind/security/policy).
