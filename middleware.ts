import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });
  
    // Refresh session if expired
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session error:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPage = request.nextUrl.pathname === '/admin/login';
  
    if (isAdminRoute && !session && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  
    if (isLoginPage && session) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  
    return res;
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
};