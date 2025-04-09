import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import '@testing-library/jest-dom';

jest.mock('@/shared/ui/Icons/Icon', () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <div data-testid={`icon`} data-size={size} >{name}-{size}</div>
  ),
  icons: {
    plus: {},
    arrowRight: {},
  },
}));

describe('Button component', () => {
  test('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('applies correct styles based on props', () => {
    render(<Button palette="orange" variant="secondary" size="S">Styled</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/border-orange-50/);
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

  it("renders left icon when leftIcon prop is provided", () => {
    render(<Button leftIcon="plus">Click Me</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveTextContent("plus-32");
  });

  it("renders right icon when rightIcon prop is provided", () => {
    render(<Button rightIcon="chevronRight" size={"S"}>Go</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveTextContent("chevronRight-24");
  });
});
