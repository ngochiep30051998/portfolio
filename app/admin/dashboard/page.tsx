'use client';
import { useEffect, useState } from 'react';
import { authService } from '../../../services/api/auth.service';
import { User } from '@supabase/supabase-js';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-indigo-900">Thông tin người dùng</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Email: {user?.email}</p>
            <p className="text-sm text-gray-600">Role: {user?.role}</p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-green-900">Thống kê</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Tổng số bài viết: 0</p>
            <p className="text-sm text-gray-600">Tổng số người dùng: 0</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900">Hoạt động gần đây</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Chưa có hoạt động nào</p>
          </div>
        </div>
      </div>
    </div>
  );
} 