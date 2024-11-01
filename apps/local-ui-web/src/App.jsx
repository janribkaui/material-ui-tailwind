import * as React from 'react';

import Button from '@janribkaui/material-ui-tailwind/Button';
import { AiFillAndroid } from 'react-icons/ai';
import { TbArrowBigRightLinesFilled } from 'react-icons/tb';
import IconButton from '@janribkaui/material-ui-tailwind/IconButton';
import CircularProgress from '@janribkaui/material-ui-tailwind/CircularProgress';
import LinearProgress from '@janribkaui/material-ui-tailwind/LinearProgress';
import LoadingButton from '@janribkaui/material-ui-tailwind/LoadingButton';
import Checkbox from '@janribkaui/material-ui-tailwind/Checkbox';
import Typography from '@janribkaui/material-ui-tailwind/Typography';
import FormGroup from '@janribkaui/material-ui-tailwind/FormGroup';
import FormControlLabel from '@janribkaui/material-ui-tailwind/FormControlLabel';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { MdOutlineFavorite } from 'react-icons/md';

function LinearProgressWithLabel(props) {
  return (
    <div className="flex items-center">
      <div className="w-full mr-0.5">
        <LinearProgress variant="determinate" {...props} />
      </div>
      <div className="min-w-9">
        <span className="text-secondary">{`${Math.round(props.value)}%`}</span>
      </div>
    </div>
  );
}

function App() {
  const [progress, setProgress] = React.useState(0);
  const [progressNumber, setProgressNumber] = React.useState(0);
  const [progressLinear, setProgressLinear] = React.useState(0);
  const [progressBuffer, setProgressBuffer] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgressLinear((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressBufferRef = React.useRef(() => {});
  React.useEffect(() => {
    progressBufferRef.current = () => {
      if (progress === 100) {
        setProgressBuffer(0);
        setBuffer(10);
      } else {
        setProgressBuffer(progressBuffer + 1);
        if (buffer < 100 && progressBuffer % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressBufferRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgressNumber((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>H4</h4>
      <h5>H5</h5>
      <h6>H6</h6>

      <div className="ml-3 mt-3 flex gap-3 w-full">
        <div className="w-full flex gap-4">
          <div className="">
            <Typography variant="h1" gutterBottom>
              h1. Heading
            </Typography>
            <Typography variant="h2" gutterBottom>
              h2. Heading
            </Typography>
            <Typography variant="h3" gutterBottom>
              h3. Heading
            </Typography>
            <Typography variant="h4" gutterBottom>
              h4. Heading
            </Typography>
            <Typography variant="h5" gutterBottom>
              h5. Heading
            </Typography>
            <Typography variant="h6" gutterBottom>
              h6. Heading
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur
            </Typography>
            <Typography variant="body1" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
              cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="body2" gutterBottom>
              body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
              cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="button" gutterBottom className="block">
              button text
            </Typography>
            <Typography variant="caption" gutterBottom className="block">
              caption text
            </Typography>
            <Typography variant="overline" gutterBottom className="block">
              overline text
            </Typography>
          </div>
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3 w-full">
        <div className="w-full flex gap-4">
          <div className="w-1/3">
            <Checkbox {...labelCheckbox} defaultChecked />
            <Checkbox {...labelCheckbox} />
            <Checkbox {...labelCheckbox} disabled />
            <Checkbox {...labelCheckbox} disabled checked />
          </div>

          <div className="w-1/3">
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
              <FormControlLabel required control={<Checkbox />} label="Required" />
              <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
            </FormGroup>
          </div>

          <div className="w-1/3">
            <Checkbox {...labelCheckbox} defaultChecked size="small" />
            <Checkbox {...labelCheckbox} defaultChecked />
            <Checkbox {...labelCheckbox} defaultChecked className="[&_.JrSvgIcon-root]:!text-3xl" />
            <Checkbox {...labelCheckbox} defaultChecked size="large" />
          </div>
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3 w-full">
        <div className="w-full flex gap-4">
          <div className="w-1/3">
            <Checkbox {...labelCheckbox} defaultChecked />
            <Checkbox {...labelCheckbox} defaultChecked color="secondary" />
            <Checkbox {...labelCheckbox} defaultChecked color="success" />
            <Checkbox {...labelCheckbox} defaultChecked color="default" />
            <Checkbox
              {...labelCheckbox}
              defaultChecked
              className="text-dark-secondary has-[input:checked]:text-dark-secondary-dark"
            />
          </div>

          <div className="w-1/3">
            <Checkbox
              {...labelCheckbox}
              icon={<MdOutlineFavoriteBorder />}
              checkedIcon={<MdOutlineFavorite />}
            />
            <Checkbox {...labelCheckbox} icon={<FaRegBookmark />} checkedIcon={<FaBookmark />} />
          </div>
        </div>
      </div>

      <Button size="small" onClick={() => setLoading(true)}>
        Set Loading
      </Button>
      <Button size="medium" onClick={() => setLoading(false)}>
        Reset Loading
      </Button>

      <Button className="ml-6" variant="contained" href="#contained-buttons">
        Link
      </Button>

      <div className="ml-3 mt-3 flex gap-3 w-full">
        <div className="w-full flex gap-4">
          <div className="w-1/3">
            <LoadingButton
              loading={loading}
              variant="outlined"
              size="medium"
              fullWidth
              loadingPosition="start"
              startIcon={<AiFillAndroid />}
            >
              Submit
            </LoadingButton>
            <LoadingButton
              loading={loading}
              variant="contained"
              size="medium"
              fullWidth
              loadingPosition="start"
              startIcon={<AiFillAndroid />}
            >
              Fetch data
            </LoadingButton>
            <LoadingButton
              loading={loading}
              variant="outlined"
              size="medium"
              fullWidth
              loadingPosition="end"
              endIcon={<AiFillAndroid />}
            >
              Submit
            </LoadingButton>
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
          </div>
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3">
        <div className="w-full flex gap-4">
          <div>
            <LoadingButton loading variant="outlined" size="small">
              Submit
            </LoadingButton>
            <LoadingButton loading loadingIndicator="Loading…" variant="outlined" size="small">
              Fetch data
            </LoadingButton>
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<AiFillAndroid />}
              variant="outlined"
              size="small"
            >
              Save
            </LoadingButton>
            <LoadingButton
              loading
              loadingPosition="end"
              endIcon={<AiFillAndroid />}
              variant="outlined"
              size="small"
            >
              Save
            </LoadingButton>
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div>
            <LoadingButton loading={loading} variant="outlined" size="medium">
              Submit
            </LoadingButton>
            <LoadingButton
              loading={loading}
              loadingIndicator="Loading…"
              variant="outlined"
              size="medium"
            >
              Fetch data
            </LoadingButton>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<AiFillAndroid />}
              variant="contained"
              size="medium"
            >
              Save
            </LoadingButton>
            <LoadingButton
              loading={loading}
              loadingPosition="end"
              endIcon={<AiFillAndroid />}
              variant="contained"
              size="medium"
            >
              Save
            </LoadingButton>
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div>
            <LoadingButton loading={loading} variant="outlined" size="large">
              Submit
            </LoadingButton>
            <LoadingButton
              loading={loading}
              loadingIndicator="Loading…"
              variant="outlined"
              size="large"
            >
              Fetch data
            </LoadingButton>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<AiFillAndroid />}
              variant="outlined"
              size="large"
            >
              Save
            </LoadingButton>
            <LoadingButton
              loading={loading}
              loadingPosition="end"
              endIcon={<AiFillAndroid />}
              variant="outlined"
              size="large"
            >
              Save
            </LoadingButton>
          </div>
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3">
        <div className="w-full">
          <LinearProgress />
        </div>
        <div className="w-full">
          <LinearProgress color="secondary" />
        </div>
        <div className="w-full">
          <LinearProgress color="success" />
        </div>
        <div className="w-full text-grey-500">
          <LinearProgress color="inherit" />
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3">
        <div className="w-full">
          <LinearProgress variant="determinate" value={progressLinear} />
        </div>
        <div className="w-full">
          <LinearProgress variant="buffer" value={progressBuffer} valueBuffer={buffer} />
        </div>
        <div className="w-full">
          <LinearProgressWithLabel value={progressNumber} />
        </div>
        <div className="w-full text-error">
          <LinearProgress color="inherit" />
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3">
        <div className="text-grey-500">
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </div>
        <div>
          <CircularProgress size="30px" />
          <CircularProgress size={40} />
          <CircularProgress size="3rem" />
        </div>
        <div>
          <CircularProgress variant="determinate" value={25} />
          <CircularProgress variant="determinate" value={50} />
          <CircularProgress variant="determinate" value={75} />
          <CircularProgress variant="determinate" value={100} />
          <CircularProgress variant="determinate" value={progress} />
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3">
        <div>
          <IconButton>
            <TbArrowBigRightLinesFilled />
          </IconButton>
          <IconButton disabled>
            <TbArrowBigRightLinesFilled />
          </IconButton>
          <IconButton color="secondary">
            <TbArrowBigRightLinesFilled />
          </IconButton>
          <IconButton color="primary">
            <TbArrowBigRightLinesFilled />
          </IconButton>
        </div>
        <div>
          <IconButton size="small">
            <TbArrowBigRightLinesFilled />
          </IconButton>
          <IconButton>
            <TbArrowBigRightLinesFilled />
          </IconButton>
          <IconButton size="large">
            <TbArrowBigRightLinesFilled />
          </IconButton>
        </div>
      </div>

      <div className="ml-3 mt-3 flex gap-3">
        <div>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
        <div className=" ">
          <Button size="small" variant="contained">
            Small
          </Button>
          <Button size="medium" variant="contained">
            Medium
          </Button>
          <Button size="large" variant="contained">
            Large
          </Button>
        </div>
        <div>
          <Button size="small" variant="outlined">
            Small
          </Button>
          <Button variant="outlined">Medium</Button>
          <Button size="large" variant="outlined">
            Large
          </Button>
        </div>
      </div>
      <div className="ml-3 mt-3 flex gap-3">
        <div>
          <Button size="small" disabled>
            Small
          </Button>
          <Button size="medium" disabled>
            Medium
          </Button>
          <Button size="large" disabled>
            Large
          </Button>
        </div>
        <div className=" ">
          <Button size="small" variant="contained" disabled>
            Small
          </Button>
          <Button size="medium" variant="contained" disabled>
            Medium
          </Button>
          <Button size="large" variant="contained" disabled>
            Large
          </Button>
        </div>
        <div>
          <Button size="small" variant="outlined" disabled>
            Small
          </Button>
          <Button variant="outlined" disabled>
            Medium
          </Button>
          <Button size="large" variant="outlined" disabled>
            Large
          </Button>
        </div>
      </div>
      <div className="ml-3 mt-3 flex gap-3">
        <div>
          <Button
            size="small"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Small
          </Button>
          <Button
            size="medium"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Medium
          </Button>
          <Button
            size="large"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Large
          </Button>
        </div>
        <div className=" ">
          <Button
            size="small"
            variant="contained"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Small
          </Button>
          <Button
            size="medium"
            variant="contained"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Medium
          </Button>
          <Button
            size="large"
            variant="contained"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Large
          </Button>
        </div>
        <div>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Small
          </Button>
          <Button
            variant="outlined"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Medium
          </Button>
          <Button
            size="large"
            variant="outlined"
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Large
          </Button>
        </div>
      </div>
      <div className="ml-3 mt-3 flex gap-3">
        <div>
          <Button
            size="small"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Small
          </Button>
          <Button
            size="medium"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Medium
          </Button>
          <Button
            size="large"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Large
          </Button>
        </div>
        <div className=" ">
          <Button
            size="small"
            variant="contained"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Small
          </Button>
          <Button
            size="medium"
            variant="contained"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Medium
          </Button>
          <Button
            size="large"
            variant="contained"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Large
          </Button>
        </div>
        <div>
          <Button
            size="small"
            variant="outlined"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Small
          </Button>
          <Button
            variant="outlined"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Medium
          </Button>
          <Button
            size="large"
            variant="outlined"
            disabled
            startIcon={<AiFillAndroid />}
            endIcon={<TbArrowBigRightLinesFilled />}
          >
            Large
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
