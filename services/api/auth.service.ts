import { supabase, User } from '@/lib/supabase';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User | null;
  session: any;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    
    // Store session in localStorage
    if (data.session) {
      localStorage.setItem('supabase.auth.token', data.session.access_token);
    }
    
    return data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('supabase.auth.token');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('supabase.auth.token');
    if (!token) return false;
    
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return !!session;
  },
}; 