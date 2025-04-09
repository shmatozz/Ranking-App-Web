import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileInput } from '@/shared/ui/Input/FileInput';

describe('FileInput Component', () => {
  const defaultProps = {
    title: 'Upload Document',
    id: 'file-upload',
    name: 'document',
    accept: '.pdf,.doc,.docx',
    placeholder: 'Choose a file...'
  };

  const createFile = (name: string, type: string, size: number = 1024) => {
    const file = new File(['dummy content'], name, { type });
    Object.defineProperty(file, 'size', {
      get() { return size; }
    });
    return file;
  };

  // Mock implementation for window.URL.createObjectURL
  beforeAll(() => {
    window.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    window.URL.revokeObjectURL = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with the provided title', () => {
    render(<FileInput {...defaultProps} />);
    expect(screen.getByText('Upload Document')).toBeInTheDocument();
  });

  test('shows placeholder text when no file is selected', () => {
    render(<FileInput {...defaultProps} />);
    expect(screen.getByText('Choose a file...')).toBeInTheDocument();
  });

  test('shows default placeholder when none is provided', () => {
    render(<FileInput title="Upload Document" />);
    expect(screen.getByText('Файл не выбран')).toBeInTheDocument();
  });

  test('shows required asterisk when required prop is true', () => {
    render(<FileInput {...defaultProps} required />);
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-red-50');
  });

  test('displays error message when provided', () => {
    const errorMessage = 'Please upload a valid file';
    render(<FileInput {...defaultProps} errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('has error styling when error message is provided', () => {
    render(<FileInput {...defaultProps} errorMessage={"Error message"} />);

    const inputContainer = screen.getByTestId('container');
    expect(inputContainer).toHaveClass('border-red-70');
    expect(inputContainer).toHaveClass('bg-red-5');
  });

  test('applies blue theme by default', () => {
    render(<FileInput {...defaultProps} />);

    const inputContainer = screen.getByTestId('container');
    expect(inputContainer).toHaveClass('hover:border-blue-50');
    expect(inputContainer).toHaveClass('focus:border-blue-50');
  });

  test('applies disabled styling when disabled prop is true', () => {
    render(<FileInput {...defaultProps} disabled />);

    const inputContainer = screen.getByTestId('container');
    expect(inputContainer).toHaveClass('bg-base-5');
    expect(inputContainer).toHaveClass('cursor-not-allowed');
  });

  test('updates file name display when a file is selected', () => {
    render(<FileInput {...defaultProps} />);

    const fileInput = screen.getByTestId("file-input");

    const file = createFile('test-document.pdf', 'application/pdf');
    const files = [file];

    fireEvent.change(fileInput, { target: { files } });

    expect(screen.getByText('test-document.pdf')).toBeInTheDocument();
    expect(screen.getByText('test-document.pdf')).toHaveClass('text-base-80');
  });

  test('calls onChange prop when a file is selected', () => {
    const handleChange = jest.fn();
    render(<FileInput {...defaultProps} onChange={handleChange} />);

    const fileInput = screen.getByTestId("file-input");

    const file = createFile('test-document.pdf', 'application/pdf');
    const files = [file];

    fireEvent.change(fileInput, { target: { files } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('resets to placeholder when file selection is cleared', () => {
    render(<FileInput {...defaultProps} />);

    const fileInput = screen.getByTestId("file-input");
    const file = createFile('test-document.pdf', 'application/pdf');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('test-document.pdf')).toBeInTheDocument();

    fireEvent.change(fileInput, { target: { files: [] } });
    expect(screen.getByText('Choose a file...')).toBeInTheDocument();
  });

  test('passes through accept property to file input', () => {
    render(<FileInput {...defaultProps} />);

    const fileInput = screen.getByTestId("file-input");
    expect(fileInput).toHaveAttribute('accept', '.pdf,.doc,.docx');
  });

  test('passes through id and name properties to file input', () => {
    render(<FileInput {...defaultProps} />);

    const fileInput = screen.getByTestId("file-input");
    expect(fileInput).toHaveAttribute('id', 'file-upload');
    expect(fileInput).toHaveAttribute('name', 'document');
  });
});
