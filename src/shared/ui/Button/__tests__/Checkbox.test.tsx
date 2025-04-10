import React from 'react';
import { render, screen } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';

jest.mock('@/shared/ui/Icons/Icon', () => ({
  Icon: ({ name, size, color }: { name: string; size: number; color: string }) => (
    <div data-testid={`icon-${name}`} data-size={size} data-color={color} />
  )
}));

describe('Checkbox Component', () => {
  it('should render correctly with default props', () => {
    render(<Checkbox text="Test Checkbox" />);

    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox',  { hidden: true })).not.toBeChecked();
  });

  it('should reflect checked state', () => {
    const handleChange = jest.fn();
    render(<Checkbox text="Test" checked={true} onChange={handleChange} />);
    expect(screen.getByRole('checkbox', { hidden: true })).toBeChecked();
  });

  it('should toggle when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox text="Test" />);

    const checkbox = screen.getByRole('checkbox', { hidden: true });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox text="Test" disabled={true} />);

    const checkbox = screen.getByRole('checkbox', { hidden: true });
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should update when props.checked changes', () => {
    const { rerender } = render(<Checkbox text="Test" checked={false} onClick={jest.fn()}/>);
    expect(screen.getByRole('checkbox', { hidden: true })).not.toBeChecked();

    rerender(<Checkbox text="Test" checked={true} onClick={jest.fn()}/>);
    expect(screen.getByRole('checkbox', { hidden: true })).toBeChecked();
  });

  it("shows and hides tooltip on mouse enter/leave", async () => {
    const user = userEvent.setup();

    render(<Checkbox text="Test Checkbox" tooltipText="Tooltip content" />);

    const infoIcon = screen.getByTestId("icon-info");

    expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();

    await user.hover(infoIcon);
    expect(await screen.findByText("Tooltip content")).toBeInTheDocument();
    await user.unhover(infoIcon);
    expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
  });
});
