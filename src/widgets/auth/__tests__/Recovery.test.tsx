import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyToken } from '@/screens/auth/api/verify-email';
import { handlePasswordChange, handleSendCode } from '@/screens/auth/model/recovery.actions';
import {Recovery} from "@/screens/auth";

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/screens/auth/api/verify-email', () => ({
  verifyToken: jest.fn(),
}));

jest.mock('@/screens/auth/model/recovery.actions', () => ({
  handleSendCode: jest.fn(),
  handlePasswordChange: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockRouterReplace = jest.fn();
const mockRouterBack = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockUseRouter.mockReturnValue({
    replace: mockRouterReplace,
    back: mockRouterBack,
  });
});

jest.mock('@/shared/lib', () => ({
  auth: jest.fn(),
  signUp: jest.fn()
}));

describe('Recovery', () => {
  it('renders email input by default when no token is in params', () => {
    mockUseSearchParams.mockReturnValue({
      get: () => null,
      has: () => false,
    });

    render(<Recovery />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отправить код/i })).toBeInTheDocument();
  });


  it('renders token validation UI when token is in URL params', async () => {
    mockUseSearchParams.mockReturnValue({
      get: () => 'token123',
      has: () => true,
    });

    (verifyToken as jest.Mock).mockResolvedValue(true);

    render(<Recovery />);

    expect(screen.getByText(/проверка токена/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(verifyToken).toHaveBeenCalledWith('token123');
    });
  });

  it('shows error if token is invalid', async () => {
    mockUseSearchParams.mockReturnValue({
      get: () => 'bad-token',
      has: () => true,
    });

    (verifyToken as jest.Mock).mockResolvedValue(false);

    render(<Recovery />);

    await waitFor(() => {
      expect(screen.getByText(/неверный токен/i)).toBeInTheDocument();
    });
  });

  it('sends code when email is submitted', async () => {
    mockUseSearchParams.mockReturnValue({
      get: () => null,
      has: () => false,
    });

    (handleSendCode as jest.Mock).mockResolvedValue({ status: 200 });

    render(<Recovery />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /отправить код/i }));

    await waitFor(() => {
      expect(handleSendCode).toHaveBeenCalledWith('user@example.com');
      expect(screen.getByText(/отправлены на указанную почту/i)).toBeInTheDocument();
    });
  });

  it('changes password and redirects on success', async () => {
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => (key === 'token' ? 'valid-token' : null),
      has: (key: string) => key === 'token',
    });

    (verifyToken as jest.Mock).mockResolvedValue(true);
    (handlePasswordChange as jest.Mock).mockResolvedValue({ status: 200 });

    render(<Recovery />);

    const passwordInput = await screen.findByPlaceholderText("Пароль");
    const confirmInput = await screen.findByPlaceholderText("Повторите пароль");

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /сменить пароль/i }));

    await waitFor(() => {
      expect(handlePasswordChange).toHaveBeenCalled();
      expect(mockRouterReplace).toHaveBeenCalledWith('/sign-in');
    });
  });

  it('navigates back when clicking "Назад"', () => {
    mockUseSearchParams.mockReturnValue({
      get: () => null,
      has: () => false,
    });

    render(<Recovery />);
    fireEvent.click(screen.getByRole('button', { name: /назад/i }));
    expect(mockRouterBack).toHaveBeenCalled();
  });

});
