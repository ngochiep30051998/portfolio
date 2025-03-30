"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import "../globals.css"
import { useSupabase } from '@/lib/supabase/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const { supabase, user, loading } = useSupabase();

  useEffect(() => {
    if (loading) return;

    if (!user && !isLoginPage) {
      router.push('/admin/login');
      return;
    }

    if (user && isLoginPage) {
      router.push('/admin/dashboard');
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={async () => {
                  try {
                    await supabase.auth.signOut();
                    router.push('/admin/login');
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}