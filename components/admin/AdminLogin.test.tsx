import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminLogin from '@/components/admin/AdminLogin';

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: jest.fn(({ email, password }) => {
        if (email === 'fail@example.com') {
          return Promise.resolve({ error: { message: 'Invalid credentials' } });
        }
        return Promise.resolve({ error: null });
      }),
    },
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('AdminLogin', () => {
  it('renders email and password fields and login button', () => {
    render(<AdminLogin />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument();
  });

  it('allows typing in email and password fields', () => {
    render(<AdminLogin />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mật khẩu/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('123456');
  });

  it('calls supabase and shows success toast on successful login', async () => {
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));
    await waitFor(() => {
      expect(require('react-hot-toast').default.success).toHaveBeenCalledWith('Đăng nhập thành công!');
    });
  });

  it('shows error toast on failed login', async () => {
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'fail@example.com' } });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));
    await waitFor(() => {
      expect(require('react-hot-toast').default.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });
});
