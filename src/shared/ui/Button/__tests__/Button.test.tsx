import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
  test('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('applies correct styles based on props', () => {
    render(<Button palette="orange" variant="secondary" size="S">Styled</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/border-orange-50/); // или другой точный класс
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button').querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('renders left and right icons', () => {
    render(<Button leftIcon="chevronLeft" rightIcon="chevronRight">With Icons</Button>);
    const button = screen.getByRole('button');
    // Проверяем наличие иконок по тегу или классу
    expect(button.querySelectorAll('svg').length).toBe(2); // зависит от реализации Icon
  });
});
