import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '@/shared/ui/Input/Dropdown';

jest.mock('@/shared/ui', () => ({
  Icon: ({name, size, className}: { name: string, size: string, className: string}) => (
    <div data-testid="mock-icon" className={className}>
      {name}-{size}
    </div>
  ),
}));

describe('Dropdown Component', () => {
  const mockItems = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Cherry' },
  ];

  const defaultProps = {
    items: mockItems,
    selectedItems: [],
    onItemSelected: jest.fn(),
    placeholder: 'Select an item',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with placeholder text when no items are selected', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByText('Select an item')).toBeInTheDocument();
  });

  test('displays selected item names when items are selected', () => {
    const selectedItems = [mockItems[0], mockItems[1]];
    render(<Dropdown {...defaultProps} selectedItems={selectedItems} />);
    expect(screen.getByText('Apple, Banana')).toBeInTheDocument();
  });

  test('opens dropdown menu when clicked', async () => {
    render(<Dropdown {...defaultProps} />);

    const dropdownContainer = screen.getByText('Select an item').closest('div');

    const dropdownMenu = screen.getByTestId('list');
    expect(dropdownMenu).toHaveClass('max-h-0');
    expect(dropdownMenu).toHaveClass('opacity-0');

    fireEvent.click(dropdownContainer!);

    expect(dropdownMenu).toHaveClass('max-h-[300px]');
    expect(dropdownMenu).toHaveClass('opacity-100');

    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  test('closes dropdown after selecting an item when multiple=false', () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.click(screen.getByText('Select an item'));

    const dropdownMenu = screen.getByTestId('list');

    const bananaItem = screen.getByText('Banana');
    fireEvent.click(bananaItem);

    expect(defaultProps.onItemSelected).toHaveBeenCalledWith(mockItems[1]);
    expect(dropdownMenu).toHaveClass('max-h-0');
    expect(dropdownMenu).toHaveClass('opacity-0');
  });

  test('keeps dropdown open after selecting an item when multiple=true', () => {
    render(<Dropdown {...defaultProps} multiple={true} />);

    fireEvent.click(screen.getByText('Select an item'));

    const dropdownMenu = screen.getByTestId('list');
    const bananaItem = screen.getByText('Banana');
    fireEvent.click(bananaItem);

    expect(dropdownMenu).toHaveClass('max-h-[300px]');
    expect(dropdownMenu).toHaveClass('opacity-100');
  });

  test('closes when clicking outside the dropdown', () => {
    render(
      <div>
        <div data-testid="outside-element">Outside Element</div>
        <Dropdown {...defaultProps} />
      </div>
    );

    fireEvent.click(screen.getByText('Select an item'));

    const dropdownMenu = screen.getByTestId('list');

    expect(dropdownMenu).toHaveClass('max-h-[300px]');
    expect(dropdownMenu).toHaveClass('opacity-100');

    fireEvent.mouseDown(screen.getByTestId('outside-element'));

    expect(dropdownMenu).toHaveClass('max-h-0');
    expect(dropdownMenu).toHaveClass('opacity-0');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Dropdown {...defaultProps} disabled={true} />);

    const dropdownContainer = screen.getByText('Select an item').closest('div')!.parentElement;

    fireEvent.click(screen.getByText('Select an item'));

    const dropdownMenu = screen.getByTestId('list');

    expect(dropdownMenu).toHaveClass('max-h-0');
    expect(dropdownMenu).toHaveClass('opacity-0');
    expect(dropdownContainer).toHaveClass('opacity-70');
  });

  test('handles empty items array gracefully', () => {
    render(<Dropdown {...defaultProps} items={[]} />);

    // Should show placeholder
    expect(screen.getByText('Select an item')).toBeInTheDocument();

    // Click to try to open dropdown
    fireEvent.click(screen.getByText('Select an item'));

    // No items should be found
    const dropdownMenu = screen.getByTestId('list');
    expect(dropdownMenu.children.length).toBe(0);
  });

  test('applies custom className to container', () => {
    render(<Dropdown {...defaultProps} className="custom-class" />);

    const container = screen.getByText('Select an item').closest('div')!.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  test('has correct opacity when items.length === 1', () => {
    render(<Dropdown {...defaultProps} items={[mockItems[0]]} />);

    const container = screen.getByText('Select an item').closest('div')!.parentElement;
    expect(container).toHaveClass('opacity-70');
  });
});
