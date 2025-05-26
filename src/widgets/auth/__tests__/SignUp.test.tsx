import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { SignUp } from '@/screens/auth/ui/SignUp';
import {signUp} from "@/shared/lib";

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock('@/shared/lib', () => ({
  auth: jest.fn(),
  signUp: jest.fn()
}));

describe('SignUp', () => {
  it('shows both user and organization forms on toggle', () => {
    render(<SignUp />);
    fireEvent.click(screen.getByText(/организация/i));
    expect(screen.getByLabelText(/название организации/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/спортсмен/i));
    expect(screen.getByLabelText(/фамилия/i)).toBeInTheDocument();
  });

  it('does not submit the form if required fields are empty', async () => {
    render(<SignUp />);

    fireEvent.click(screen.getByRole('button', { name: /далее/i }));

    await waitFor(() => {
      expect(signUp).not.toHaveBeenCalled();
    });
  });
});
