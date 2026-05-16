'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center rounded-2xl border border-emerald-800 bg-emerald-950/30 p-10">
          <span className="text-5xl">✉️</span>
          <h2 className="mt-4 text-2xl font-bold text-white">Check your email</h2>
          <p className="mt-3 text-slate-400">
            We sent a confirmation link to <strong className="text-white">{email}</strong>.
            Click it to activate your account.
          </p>
          <Link href="/(auth)/login" className="mt-6 inline-block text-indigo-400 hover:text-indigo-300 font-medium">
            Back to login →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-800/50">
            <Plane className="h-7 w-7 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="text-slate-400">Start planning and saving your trips.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-black/30"
        >
          <div className="flex flex-col gap-5">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="mt-6">
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? <><Spinner size="sm" /> Creating account…</> : 'Create account'}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/(auth)/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
