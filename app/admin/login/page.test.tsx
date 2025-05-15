// Mock modules before importing the component
const mockSignInWithPassword = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  __esModule: true,
}));
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  __esModule: true,
}));
jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ auth: { signInWithPassword: mockSignInWithPassword } }),
  __esModule: true,
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('AdminLogin', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    mockSignInWithPassword.mockReset();
  });

  it('renders email and password fields and login button', () => {
    const AdminLogin = require('./page').default;
    render(<AdminLogin />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument();
  });

  it('allows typing in email and password fields', () => {
    const AdminLogin = require('./page').default;
    render(<AdminLogin />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mật khẩu/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('123456');
  });

  it('calls supabase and shows success toast on successful login', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });
    const AdminLogin = require('./page').default;
    const toast = require('react-hot-toast');
    const nextNav = require('next/navigation');
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));
    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: '123456',
      });
      expect(toast.success).toHaveBeenCalledWith('Đăng nhập thành công!');
      expect(nextNav.useRouter().push).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  it('shows error toast on failed login', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: { message: 'Sai thông tin' } });
    const AdminLogin = require('./page').default;
    const toast = require('react-hot-toast');
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'fail@example.com' } });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Sai thông tin');
    });
  });
});