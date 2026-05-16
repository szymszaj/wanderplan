import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'indigo'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-700 text-slate-300',
  success: 'bg-emerald-900/50 text-emerald-400 border border-emerald-800',
  warning: 'bg-amber-900/50 text-amber-400 border border-amber-800',
  error: 'bg-red-900/50 text-red-400 border border-red-800',
  indigo: 'bg-indigo-900/50 text-indigo-300 border border-indigo-800',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
