import { expect } from 'chai';
import * as React from 'react';

import { createRenderer, screen, simulateKeyboardDevice } from '@janribkaui/internal-test-utils';
import Button from '@janribkaui/material-ui-tailwind/Button';

import * as ripple from '../../test/ripple';

describe('Button component', () => {
  const { render, renderToString } = createRenderer();

  it('should render with the root and textPrimary classes', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary');
  });

  it('startIcon and endIcon should have icon class', () => {
    const { getByRole } = render(
      <Button startIcon={<span>start icon</span>} endIcon={<span>end icon</span>}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');
    const startIcon = button.querySelector(`.JrButton-startIcon`);
    const endIcon = button.querySelector(`.JrButton-endIcon`);
    expect(startIcon).to.have.class('JrButton-icon');
    expect(endIcon).to.have.class('JrButton-icon');
  });

  it('should add the appropriate color class to root element based on color prop', () => {
    const { getByTestId } = render(
      <React.Fragment>
        <Button color="inherit" data-testid="color-inherit">
          Hello World
        </Button>
        <Button color="primary" data-testid="color-primary">
          Hello World
        </Button>
        <Button color="secondary" data-testid="color-secondary">
          Hello World
        </Button>
        <Button color="success" data-testid="color-success">
          Hello World
        </Button>
        <Button color="error" data-testid="color-error">
          Hello World
        </Button>
        <Button color="info" data-testid="color-info">
          Hello World
        </Button>
        <Button color="warning" data-testid="color-warning">
          Hello World
        </Button>
      </React.Fragment>,
    );

    expect(getByTestId('color-inherit')).to.have.class('text-inherit');
    expect(getByTestId('color-primary')).to.have.class('text-primary');
    expect(getByTestId('color-secondary')).to.have.class('text-secondary');
    expect(getByTestId('color-success')).to.have.class('text-success');
    expect(getByTestId('color-error')).to.have.class('text-error');
    expect(getByTestId('color-info')).to.have.class('text-info');
    expect(getByTestId('color-warning')).to.have.class('text-warning');
  });

  it('can render a text primary button', () => {
    const { getByRole } = render(<Button color="primary">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary');
    expect(button).not.to.have.class('text-secondary');
  });

  it('should render a text secondary button', () => {
    const { getByRole } = render(<Button color="secondary">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary');
    expect(button).to.have.class('text-secondary');
  });

  it('should render a text success button', () => {
    render(<Button color="success">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary');
    expect(button).not.to.have.class('text-secondary');
    expect(button).not.to.have.class('text-error');
    expect(button).not.to.have.class('text-info');
    expect(button).not.to.have.class('text-warning');
    expect(button).to.have.class('text-success');
  });

  it('should render a text error button', () => {
    render(<Button color="error">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary');
    expect(button).not.to.have.class('text-secondary');
    expect(button).not.to.have.class('text-success');
    expect(button).not.to.have.class('text-info');
    expect(button).not.to.have.class('text-warning');
    expect(button).to.have.class('text-error');
  });

  it('should render a text info button', () => {
    render(<Button color="info">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary');
    expect(button).not.to.have.class('text-secondary');
    expect(button).not.to.have.class('text-success');
    expect(button).not.to.have.class('text-error');
    expect(button).not.to.have.class('text-warning');
    expect(button).to.have.class('text-info');
  });

  it('should render a text warning button', () => {
    render(<Button color="warning">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary');
    expect(button).not.to.have.class('text-secondary');
    expect(button).not.to.have.class('text-success');
    expect(button).not.to.have.class('text-error');
    expect(button).not.to.have.class('text-info');
    expect(button).to.have.class('text-warning');
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<Button variant="outlined">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border');
    expect(button).to.have.class('border-primary/50');
    expect(button).to.have.class('border-solid');
  });

  it('should render a primary outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="primary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-primary/50');
    expect(button).to.have.class('text-primary');
  });

  it('should render a secondary outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="secondary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-secondary/50');
    expect(button).to.have.class('text-secondary');
  });

  it('should render an inherit outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="inherit">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-inherit');
    expect(button).to.have.class('text-inherit');
  });

  it('should render a success outlined button', () => {
    render(
      <Button variant="outlined" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-success/50');
    expect(button).to.have.class('text-success');
  });

  it('should render a error outlined button', () => {
    render(
      <Button variant="outlined" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-error/50');
    expect(button).to.have.class('text-error');
  });

  it('should render a info outlined button', () => {
    render(
      <Button variant="outlined" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-info/50');
    expect(button).to.have.class('text-info');
  });

  it('should render a warning outlined button', () => {
    render(
      <Button variant="outlined" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-warning/50');
    expect(button).to.have.class('text-warning');
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<Button variant="contained">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary');
    expect(button).not.to.have.class('text-secondary-contrastText');
    expect(button).to.have.class('text-primary-contrastText');
  });

  it('should render a contained primary button', () => {
    const { getByRole } = render(
      <Button variant="contained" color="primary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary-contrastText');
    expect(button).not.to.have.class('text-secondary-contrastText');
    expect(button).not.to.have.class('text-success-contrastText');
    expect(button).not.to.have.class('text-error-contrastText');
    expect(button).not.to.have.class('text-info-contrastText');
    expect(button).not.to.have.class('text-warning-contrastText');
  });

  it('should render a contained secondary button', () => {
    const { getByRole } = render(
      <Button variant="contained" color="secondary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary-contrastText');
    expect(button).to.have.class('text-secondary-contrastText');
    expect(button).not.to.have.class('text-success-contrastText');
    expect(button).not.to.have.class('text-error-contrastText');
    expect(button).not.to.have.class('text-info-contrastText');
    expect(button).not.to.have.class('text-warning-contrastText');
  });

  it('should render a contained success button', () => {
    render(
      <Button variant="contained" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary-contrastText');
    expect(button).not.to.have.class('text-secondary-contrastText');
    expect(button).to.have.class('text-success-contrastText');
    expect(button).not.to.have.class('text-error-contrastText');
    expect(button).not.to.have.class('text-info-contrastText');
    expect(button).not.to.have.class('text-warning-contrastText');
  });

  it('should render a contained error button', () => {
    render(
      <Button variant="contained" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary-contrastText');
    expect(button).not.to.have.class('text-secondary-contrastText');
    expect(button).not.to.have.class('text-success-contrastText');
    expect(button).to.have.class('text-error-contrastText');
    expect(button).not.to.have.class('text-info-contrastText');
    expect(button).not.to.have.class('text-warning-contrastText');
  });

  it('should render a contained info button', () => {
    render(
      <Button variant="contained" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary-contrastText');
    expect(button).not.to.have.class('text-secondary-contrastText');
    expect(button).not.to.have.class('text-success-contrastText');
    expect(button).not.to.have.class('text-error-contrastText');
    expect(button).to.have.class('text-info-contrastText');
    expect(button).not.to.have.class('text-warning-contrastText');
  });

  it('should render a contained warning button', () => {
    render(
      <Button variant="contained" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).not.to.have.class('text-primary-contrastText');
    expect(button).not.to.have.class('text-secondary-contrastText');
    expect(button).not.to.have.class('text-success-contrastText');
    expect(button).not.to.have.class('text-error-contrastText');
    expect(button).not.to.have.class('text-info-contrastText');
    expect(button).to.have.class('text-warning-contrastText');
  });

  it('should render a small text button', () => {
    const { getByRole } = render(<Button size="small">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('JrButton-small');
    expect(button).to.have.class('text-primary');
    expect(button).not.to.have.class('JrButton-medium');
    expect(button).not.to.have.class('JrButton-large');
  });

  it('should render a large text button', () => {
    const { getByRole } = render(<Button size="large">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary');
    expect(button).not.to.have.class('JrButton-small');
    expect(button).not.to.have.class('JrButton-medium');
    expect(button).to.have.class('JrButton-large');
  });

  it('should render a small outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" size="small">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-primary/50');
    expect(button).to.have.class('JrButton-small');
    expect(button).not.to.have.class('JrButton-medium');
    expect(button).not.to.have.class('JrButton-large');
  });

  it('should render a large outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" size="large">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('border-primary/50');
    expect(button).not.to.have.class('JrButton-small');
    expect(button).not.to.have.class('JrButton-medium');
    expect(button).to.have.class('JrButton-large');
  });

  it('should render a small contained button', () => {
    const { getByRole } = render(
      <Button variant="contained" size="small">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary-contrastText');
    expect(button).to.have.class('JrButton-small');
    expect(button).not.to.have.class('JrButton-medium');
    expect(button).not.to.have.class('JrButton-large');
  });

  it('should render a large contained button', () => {
    const { getByRole } = render(
      <Button variant="contained" size="large">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary-contrastText');
    expect(button).not.to.have.class('JrButton-small');
    expect(button).not.to.have.class('JrButton-medium');
    expect(button).to.have.class('JrButton-large');
  });

  it('should render a button with startIcon', () => {
    const { getByRole } = render(<Button startIcon={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const startIcon = button.querySelector(`.JrButton-startIcon`);

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary');
    expect(startIcon).not.to.have.class('JrButton-endIcon');
  });

  it('should render a button with endIcon', () => {
    const { getByRole } = render(<Button endIcon={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const endIcon = button.querySelector('.JrButton-endIcon');

    expect(button).to.have.class('JrButton-root');
    expect(button).to.have.class('text-primary');
    expect(endIcon).not.to.have.class('JrButton-startIcon');
  });

  it('should have a ripple', async () => {
    const { getByRole } = render(
      <Button TouchRippleProps={{ className: 'touch-ripple' }}>Hello World</Button>,
    );
    const button = getByRole('button');
    await ripple.startTouch(button);
    expect(button.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', async () => {
    const { getByRole } = render(
      <Button disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');
    await ripple.startTouch(button);
    expect(button.querySelector('.touch-ripple')).to.equal(null);
  });

  it('can disable the elevation', () => {
    const { getByRole } = render(<Button disableElevation>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class('JrButton-disableElevation');
  });

  it('should have a focusRipple', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const { getByRole } = render(
      <Button TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    simulateKeyboardDevice();
    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  it('can disable the focusRipple', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const { getByRole } = render(
      <Button
        disableFocusRipple
        TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}
      >
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    simulateKeyboardDevice();
    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  describe('server-side', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    it('should server-side render', () => {
      const { container } = renderToString(<Button>Hello World</Button>);
      expect(container.firstChild).to.have.text('Hello World');
    });
  });

  it('should automatically change the button to an anchor element when href is provided', () => {
    const { container } = render(<Button href="https://google.com">Hello</Button>);
    const button = container.firstChild;

    expect(button).to.have.property('nodeName', 'A');
    expect(button).not.to.have.attribute('role');
    expect(button).not.to.have.attribute('type');
    expect(button).to.have.attribute('href', 'https://google.com');
  });
});
