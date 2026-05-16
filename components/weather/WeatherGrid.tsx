import { WeatherDay } from './WeatherDay'
import type { WeatherDay as WeatherDayType } from '@/types/weather.types'

interface WeatherGridProps {
  days: WeatherDayType[]
}

export function WeatherGrid({ days }: WeatherGridProps) {
  if (days.length === 0) {
    return (
      <p className="text-slate-400 italic">
        No weather data available for the selected dates.
      </p>
    )
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
      {days.map((day) => (
        <WeatherDay key={day.date} {...day} />
      ))}
    </div>
  )
}
