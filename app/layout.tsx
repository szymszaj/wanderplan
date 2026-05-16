import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/nav'
import { navContent } from '@/content/nav.content'

export const metadata: Metadata = {
  title: 'WanderPlan – Travel Planner',
  description:
    'Plan your perfect trip with live weather forecasts, top attractions, and hotel deals all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <Nav {...navContent} />
        <main className="flex-1">{children}</main>
        <footer className="mt-20 border-t border-slate-800 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <span className="font-semibold text-slate-400">WanderPlan</span>
            <span>© {new Date().getFullYear()} WanderPlan. All rights reserved.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
