import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from "react";
import {SignInUserForm} from "@/widgets/auth/ui/SignInUserForm";

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock('@/shared/lib', () => ({
  auth: () => {},
  submit: async (formData: FormData) => {
    const password = formData.get("password") as string

    if (password == "wrongpassword") return "Неверный пароль"
  },
}));

describe('SignIn', () => {
  it('renders email and password inputs', () => {
    render(<SignInUserForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
  });

  it('shows error on wrong credentials', async () => {
    render(<SignInUserForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Вход/i }));

    await waitFor(() =>
      expect(screen.getByText(/неверный пароль/i)).toBeInTheDocument()
    );
  });

  it('redirects to profile on good credentials', async () => {
    render(<SignInUserForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'goodpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Вход/i }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/profile');
    });
  });
});
