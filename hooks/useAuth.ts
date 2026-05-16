'use client'

// AUTH DISABLED — Supabase auth is implemented but not active.
// To enable: restore the full implementation from git history and set NEXT_PUBLIC_SUPABASE_* env vars.
export function useAuth() {
  return {
    user: null,
    loading: false,
    signOut: async () => {},
  }
}
