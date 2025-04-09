import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../Radio';

jest.mock('@/shared/ui', () => ({
  Icon: ({ name, size, color }: { name: string; size: number; color: string }) => (
    <div data-testid="icon" data-name={name} data-size={size} data-color={color}></div>
  ),
}));

describe('Radio', () => {
  it('renders with correct text', () => {
    render(<Radio text="Option A" name="group1" defaultChecked={true} />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByRole("radio", { hidden: true })).toBeChecked()
  });

  it('shows the unchecked icon by default', () => {
    render(<Radio text="Option B" name="group1" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute('data-name', 'radioBlank');
  });

  it('toggles the radio when clicked', async () => {
    const user = userEvent.setup();
    render(<Radio text="Option C" name="group1" />);
    const icon = screen.getByTestId("icon");

    expect(icon).toHaveAttribute('data-name', 'radioBlank');

    await user.click(screen.getByText("Option C"));
    expect(screen.getByTestId("icon")).toHaveAttribute('data-name', 'radioChecked');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Radio text="Option D" name="group1" disabled />);
    const icon = screen.getByTestId("icon");

    expect(icon).toHaveAttribute('data-name', 'radioBlank');
    await user.click(screen.getByText("Option D"));
    expect(screen.getByTestId("icon")).toHaveAttribute('data-name', 'radioBlank'); // Still unchanged
  });

  it('calls onClick when provided', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Radio text="Option E" name="group1" onClick={handleClick} />);

    await user.click(screen.getByText("Option E"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
