"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import "../globals.css"
import { useSupabase } from '@/lib/supabase/client';
import Sidebar from '@/components/admin/Sidebar';

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
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}