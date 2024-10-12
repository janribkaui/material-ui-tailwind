// Button.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies startIcon correctly', () => {
    render(<Button startIcon={<span>Start Icon</span>}>Click me</Button>);
    expect(screen.getByText('Start Icon')).toBeInTheDocument();
  });

  test('applies endIcon correctly', () => {
    render(<Button endIcon={<span>End Icon</span>}>Click me</Button>);
    expect(screen.getByText('End Icon')).toBeInTheDocument();
  });

  test('applies disabled state correctly', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
