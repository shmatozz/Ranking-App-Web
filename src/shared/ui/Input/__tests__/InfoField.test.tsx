import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InfoField } from '@/shared/ui/Input/InfoField';

jest.mock('@/shared/ui', () => ({
  Icon: jest.fn(({ name, color }) => <span data-testid={`icon-${name}`} style={{ color }} />),
  IconButton: jest.fn(({ icon, onClick, isLoading }) => (
    <button
      data-testid={`icon-button-${icon}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {icon}
    </button>
  )),
  TextInput: jest.fn(({ id, title, type }) => (
    <div data-testid="text-input">
      <label htmlFor={id}>{title}</label>
      <input id={id} type={type} defaultValue="" />
    </div>
  )),
}));

describe('InfoField Component', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    title: 'Test Field',
    value: 'Test Value',
    editable: false,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    render(<InfoField {...defaultProps} />);

    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-edit')).not.toBeInTheDocument();
  });

  it('should show loading state when isLoading is true', () => {
    render(<InfoField {...defaultProps} isLoading={true}/>);

    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toHaveClass('animate-pulse');
  });

  it('should show edit icon when editable is true', () => {
    render(<InfoField {...defaultProps} editable={true} />);

    expect(screen.getByTestId('icon-edit')).toBeInTheDocument();
  });

  it('should switch to edit mode when edit icon is clicked', async () => {
    const user = userEvent.setup();
    render(<InfoField {...defaultProps} editable={true} />);

    await user.click(screen.getByTestId('icon-edit'));
    expect(screen.getByTestId('text-input')).toBeInTheDocument();
    expect(screen.getByTestId('icon-button-submit')).toBeInTheDocument();
    expect(screen.getByTestId('icon-button-close')).toBeInTheDocument();
  });

  it('should call onSubmit with new value when submitted', async () => {
    const user = userEvent.setup();
    render(<InfoField {...defaultProps} editable={true} />);

    await user.click(screen.getByTestId('icon-edit'));

    const input = screen.getByRole('textbox');
    await user.type(input, 'New Value');

    await user.click(screen.getByTestId('icon-button-submit'));
    expect(mockOnSubmit).toHaveBeenCalledWith('New Value');
  });

  it('should exit edit mode when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<InfoField {...defaultProps} editable={true} />);

    await user.click(screen.getByTestId('icon-edit'));
    expect(screen.getByTestId('text-input')).toBeInTheDocument();

    await user.click(screen.getByTestId('icon-button-close'));
    expect(screen.queryByTestId('text-input')).not.toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('should disable submit button when submitLoading is true', async () => {
    const user = userEvent.setup();
    render(<InfoField {...defaultProps} editable={true} submitLoading={true} />);

    await user.click(screen.getByTestId('icon-edit'));
    expect(screen.getByTestId('icon-button-submit')).toBeDisabled();
  });

  it('should render correct input type', async () => {
    const user = userEvent.setup();
    render(<InfoField {...defaultProps} editable={true} type="email" />);

    await user.click(screen.getByTestId('icon-edit'));
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('should show loading state when value is undefined', () => {
    render(<InfoField {...defaultProps} value={undefined} />);
    expect(screen.getByText('some value')).toHaveClass('animate-pulse');
  });
});
