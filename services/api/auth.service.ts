'use client'

import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

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
    const supabase = createClient();
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
    const supabase = createClient();
    localStorage.removeItem('supabase.auth.token');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async isAuthenticated(): Promise<boolean> {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return !!session;
  },
}; 