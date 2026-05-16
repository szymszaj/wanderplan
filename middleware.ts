import { NextResponse, type NextRequest } from 'next/server'

// AUTH DISABLED — Supabase session middleware is implemented but not active.
// To enable: restore Supabase createServerClient logic and set NEXT_PUBLIC_SUPABASE_* env vars.
export function middleware(request: NextRequest) {
  return NextResponse.next({ request })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
