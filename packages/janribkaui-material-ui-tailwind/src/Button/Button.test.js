// Button.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from 'mocha';
import Button from '@janribkaui/material-ui-tailwind/Button';

describe('Button component', () => {
  // Test, zda se komponenta renderuje správně
  test('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  // // Test kliknutí na tlačítko
  // test('calls onClick handler when clicked', () => {
  //   const handleClick = jest.fn();
  //   render(<Button onClick={handleClick}>Click me</Button>);
  //   const buttonElement = screen.getByText('Click me');

  //   fireEvent.click(buttonElement);
  //   expect(handleClick).toHaveBeenCalledTimes(1);
  // });

  // // Test různých variant tlačítka
  // test('applies correct CSS classes based on variant', () => {
  //   const { rerender } = render(<Button variant="primary">Primary Button</Button>);
  //   const primaryButton = screen.getByText('Primary Button');
  //   expect(primaryButton).toHaveClass('bg-blue-500');

  //   rerender(<Button variant="secondary">Secondary Button</Button>);
  //   const secondaryButton = screen.getByText('Secondary Button');
  //   expect(secondaryButton).toHaveClass('bg-gray-500');
  // });

  // // Test disabled stavu
  // test('button is disabled when disabled prop is true', () => {
  //   render(<Button disabled>Disabled Button</Button>);
  //   const buttonElement = screen.getByText('Disabled Button');
  //   expect(buttonElement).toBeDisabled();
  // });
  // test('renders children correctly', () => {
  //   render(<Button>Click me</Button>);
  //   expect(screen.getByText('Click me')).toBeInTheDocument();
  // });

  // test('applies startIcon correctly', () => {
  //   render(<Button startIcon={<span>Start Icon</span>}>Click me</Button>);
  //   expect(screen.getByText('Start Icon')).toBeInTheDocument();
  // });

  // test('applies endIcon correctly', () => {
  //   render(<Button endIcon={<span>End Icon</span>}>Click me</Button>);
  //   expect(screen.getByText('End Icon')).toBeInTheDocument();
  // });

  // test('applies disabled state correctly', () => {
  //   render(<Button disabled>Click me</Button>);
  //   expect(screen.getByRole('button')).toBeDisabled();
  // });
});
