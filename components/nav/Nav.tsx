'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Plane } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import type { navContent } from '@/content/nav.content'

type NavContent = typeof navContent

interface NavProps extends NavContent {}

export function Nav({ logo, links, loginLabel, logoutLabel, registerLabel }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()

  const visibleLinks = links.filter((l) => !l.requiresAuth || user)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <Plane className="h-6 w-6 text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {logo}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* AUTH DISABLED — login/register buttons hidden, uncomment when Supabase is enabled */}

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden border-t border-slate-800 bg-slate-900 transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="flex flex-col gap-2 px-4 py-4">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-slate-300 hover:text-white font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* AUTH DISABLED — mobile auth buttons hidden */}
        </div>
      </div>
    </nav>
  )
}
