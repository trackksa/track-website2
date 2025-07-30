import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow access to /admin/login without token
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }
  const token = request.cookies.get('admin-token');
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};