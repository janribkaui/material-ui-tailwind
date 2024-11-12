<h1 align="center">JanRibka UI</h1>

JanRibka is an open-source React component library for react projects with tailwind that implements Google's [Material Design](https://m2.material.io/design/introduction/)

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/janribkaui/material-ui-tailwind/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@janribkaui/material-ui-tailwind/latest.svg)](https://www.npmjs.com/package/@janribkaui/material-ui-tailwind)
[![npm downloads](https://img.shields.io/npm/dm/@janribkaui/material-ui-tailwind.svg)](https://www.npmjs.com/package/@janribkaui/material-ui-tailwind)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/janribkaui/material-ui-tailwind.svg)](https://isitmaintained.com/project/janribkaui/material-ui-tailwind 'Average time to resolve an issue')

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
- Checkbox
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
  theme: {
    extend: {
      colors: {
        primary: {
          light: blue[400],
          DEFAULT: blue[700],
          dark: blue[800],
        },
        secondary: {
          light: purple[300],
          DEFAULT: purple[500],
          dark: purple[700],
        },
      },
    },
  },
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

### Checkbox

#### Basic checkbox

```ts
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';

const App = () => {
    const labelCheckbox = { inputProps: { 'aria-label': 'Basic checkbox' } };

    return (
        <>
            <Checkbox {...labelCheckbox} defaultChecked />
            <Checkbox {...labelCheckbox} />
            <Checkbox {...labelCheckbox} disabled />
            <Checkbox {...labelCheckbox} disabled checked />
        </>
    )
}
```

#### Label

```ts
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';
import FormGroup from '@janribkaui/material-ui-tailwind/FormGroup';
import FormControlLabel from '@janribkaui/material-ui-tailwind/FormControlLabel';

const App = () => {
    const labelCheckbox = { inputProps: { 'aria-label': 'Label checkbox' } };

    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
            <FormControlLabel required control={<Checkbox />} label="Required" />
            <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
    )
}
```

#### Size

```ts
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';

const App = () => {
    const labelCheckbox = { inputProps: { 'aria-label': 'Size checkbox' } };

    return (
        <>
            <Checkbox {...labelCheckbox} defaultChecked size="small" />
            <Checkbox {...labelCheckbox} defaultChecked />
            <Checkbox {...labelCheckbox} defaultChecked className="[&_.JrSvgIcon-root]:!text-3xl" />
            <Checkbox {...labelCheckbox} defaultChecked size="large" />
        </>
    )
}
```

#### Color

```ts
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';

const App = () => {
    const labelCheckbox = { inputProps: { 'aria-label': 'Colored checkbox' } };

    return (
        <>
            <Checkbox {...labelCheckbox} defaultChecked />
            <Checkbox {...labelCheckbox} defaultChecked color="secondary" />
            <Checkbox {...labelCheckbox} defaultChecked color="success" />
            <Checkbox {...labelCheckbox} defaultChecked color="default" />
            <Checkbox {...labelCheckbox} defaultChecked
              className="text-dark-secondary has-[input:checked]:text-dark-secondary-dark"
            />
        </>
    )
}
```

#### Icon

```ts
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';

const App = () => {
    import { FaRegBookmark } from 'react-icons/fa';
    import { FaBookmark } from 'react-icons/fa';
    import { MdOutlineFavoriteBorder } from 'react-icons/md';
    import { MdOutlineFavorite } from 'react-icons/md';

    const labelCheckbox = { inputProps: { 'aria-label': 'Icon Checkbox' } };

    return (
        <>
            <Checkbox {...labelCheckbox} icon={<MdOutlineFavoriteBorder className="relative" />} checkedIcon={<MdOutlineFavorite />} />
            <Checkbox {...labelCheckbox} icon={<FaRegBookmark />} checkedIcon={<FaBookmark />} />
        </>
    )
}
```

#### Controlled

```ts
import * as React from 'react';
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';

const App = () => {
    const [checked, setChecked] = React.useState(true);

    const handleOnChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Checkbox
            checked={checked}
            onChange={handleOnChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    )
}
```

#### Label placement

```ts
import * as React from 'react';
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';
import FormControl from '@janribkaui/material-ui-tailwind/FormControl';
import FormLabel from '@janribkaui/material-ui-tailwind/FormLabel';
import FormGroup from '@janribkaui/material-ui-tailwind/FormGroup';
import FormControlLabel from '@janribkaui/material-ui-tailwind/FormControlLabel';

const App = () => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Label placement</FormLabel>
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="Start"
                    labelPlacement="end"
                    disabled
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox />}
                    label="Top"
                    labelPlacement="top"
                />
            </FormGroup>
        </FormControl>
    )
}
```

#### Group

```ts
import * as React from 'react';
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';
import FormControl from '@janribkaui/material-ui-tailwind/FormControl';
import FormLabel from '@janribkaui/material-ui-tailwind/FormLabel';
import FormGroup from '@janribkaui/material-ui-tailwind/FormGroup';
import FormControlLabel from '@janribkaui/material-ui-tailwind/FormControlLabel';

const App = () => {
    const [state, setState] = React.useState({
        item1: true,
        item2: false,
        item3: false,
    });

    const error =
        [
            state.item1,
            state.item2,
            state.item3,
        ].some(f => !f);

    const handleOnChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <FormControl
            required
            error={error}
            component="fieldset"
            variant="standard"
            className="m-6"
        >
            <FormLabel component="legend">Pick all</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.item1}
                            onChange={handleOnChange}
                            name="item1"
                        />
                    }
                    label="Item 1"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.item2}
                            onChange={handleOnChange}
                            name="item2"
                        />
                    }
                    label="Item 2"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.item3}
                            onChange={handleOnChange}
                            name="item3"
                        />
                    }
                    label="Item 3"
                />
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
    )
}
```

#### Indeterminate

```ts
import * as React from 'react';
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';
import FormControlLabel from '@janribkaui/material-ui-tailwind/FormControlLabel';

const App = () => {
    const [checked, setChecked] = React.useState([true, false]);

    const handleOnChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleOnChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleOnChange3 = (event) => {
            setChecked([checked[0], event.target.checked]);
    };

    const children = (
        <div className="flex flex-col ml-3">
        <FormControlLabel
            label="Child 1"
            control={
                <Checkbox checked={checked[0]} onChange={handleOnChange2} />
            }
        />
        <FormControlLabel
            label="Child 2"
            control={
                <Checkbox checked={checked[1]} onChange={handleOnChange3} />
            }
        />
        </div>
    );

    return (
          <>
            <FormControlLabel
                label="Parent"
                control={
                    <Checkbox
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0] !== checked[1]}
                    onChange={handleOnChange1}
                    />
                }
            />
            {children}
          </>
    );
}
```

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discuss JanRibka UI on GitHub](https://github.com/janribkaui/material-ui-tailwind/discussions)

## Contributing

If you're interested in contributing to JanRibka UI, please read our [contributing docs](https://github.com/janribkaui/material-ui-tailwind/blob/master/CONTRIBUTING.md) **before submitting a pull request**.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/janribkaui/material-ui-tailwind/blob/HEAD/LICENSE).

## Security

For details of supported versions and contact details for reporting security issues, please refer to the [security policy](https://github.com/janribkaui/material-ui-tailwind/security/policy).
