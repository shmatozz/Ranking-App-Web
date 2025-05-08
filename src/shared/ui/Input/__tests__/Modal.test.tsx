import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/shared/ui/Input/Modal';

jest.mock('@/shared/ui', () => ({
  Button: jest.fn(({ onClick, children }) => (
    <button onClick={onClick} data-testid="modal-close-button">
      {children}
    </button>
  )),
}));

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children content', () => {
    render(
      <Modal>
        <div data-testid="test-content">Test Content</div>
      </Modal>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.queryByTestId('modal-close-button')).not.toBeInTheDocument();
  });

  it('should render close button when onClose is provided', () => {
    render(
      <Modal onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );

    const closeButton = screen.getByTestId('modal-close-button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveTextContent('Закрыть');
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );

    await user.click(screen.getByTestId('modal-close-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should have proper aria attributes', () => {
    render(
      <Modal>
        <div>Test Content</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass('fixed inset-0');
  });

  it('should apply correct styling classes', () => {
    render(
      <Modal>
        <div>Test Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    const content = screen.getByTestId('modal-content');

    expect(overlay).toHaveClass('bg-base-95 bg-opacity-50');
    expect(content).toHaveClass('container-shadow');
  });

  it('should not render close button when onClose is not provided', () => {
    render(
      <Modal>
        <div>Test Content</div>
      </Modal>
    );

    expect(screen.queryByTestId('modal-close-button')).not.toBeInTheDocument();
  });
});
