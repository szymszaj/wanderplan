'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import type { navContent } from '@/content/nav.content'

type NavContent = typeof navContent
interface NavProps extends NavContent {}

export function Nav({ logo }: NavProps) {
  useAuth()

  return (
    <nav className="border-b border-orange-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-stone-800">
          <span className="text-xl">🌴</span>
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            {logo}
          </span>
        </Link>
      </div>
    </nav>
  )
}
