import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { WeatherDay as WeatherDayType } from '@/types/weather.types'

interface WeatherDayProps extends WeatherDayType {
  className?: string
}

export function WeatherDay({
  date,
  emoji,
  tempMin,
  tempMax,
  description,
  className,
}: WeatherDayProps) {
  const displayDate = format(new Date(date + 'T12:00:00'), 'EEE, MMM d')

  return (
    <div
      className={cn(
        'flex min-w-[140px] flex-col items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm transition-all duration-200 hover:border-indigo-700 hover:bg-slate-800',
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {displayDate}
      </p>
      <span className="text-4xl" role="img" aria-label={description}>
        {emoji}
      </span>
      <div className="text-center">
        <p className="text-lg font-bold text-white">
          {tempMax}° <span className="text-slate-400 font-normal">/ {tempMin}°</span>
        </p>
        <p className="mt-1 text-xs capitalize text-slate-400">{description}</p>
      </div>
    </div>
  )
}
