import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[icon]

  return (
    <div
      className={cn(
        'group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-indigo-800 hover:bg-slate-900/80 hover:-translate-y-1',
        className
      )}
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-800/50">
        {IconComponent ? (
          <IconComponent className="h-6 w-6 text-indigo-400" />
        ) : (
          <span className="text-2xl">{icon}</span>
        )}
      </div>
      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}
