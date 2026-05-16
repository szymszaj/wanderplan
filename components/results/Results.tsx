import { Cloud, MapPin, Building2 } from 'lucide-react'
import { WeatherGrid } from '@/components/weather'
import { AttractionsGrid } from '@/components/attractions'
import { HotelsList } from '@/components/hotels'
import type { TripResult } from '@/types/trip.types'
import { format } from 'date-fns'

interface ResultsProps {
  result: TripResult
}

function SectionHeading({
  icon: Icon,
  title,
  count,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  count?: number
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-800/50">
        <Icon className="h-5 w-5 text-indigo-400" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {count !== undefined && (
          <p className="text-xs text-slate-500">{count} results</p>
        )}
      </div>
      <div className="ml-4 flex-1 h-px bg-gradient-to-r from-indigo-800/60 to-transparent" />
    </div>
  )
}

export function Results({ result }: ResultsProps) {
  const { city, dateFrom, dateTo, budget, weather, attractions, hotels } = result

  const formattedFrom = format(new Date(dateFrom + 'T12:00:00'), 'MMM d, yyyy')
  const formattedTo = format(new Date(dateTo + 'T12:00:00'), 'MMM d, yyyy')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Trip summary banner */}
      <div className="mb-10 rounded-2xl border border-indigo-800/50 bg-gradient-to-br from-indigo-950/60 to-violet-950/60 p-6 backdrop-blur-sm">
        <h1 className="text-3xl font-extrabold text-white">
          {city}
        </h1>
        <p className="mt-1 text-slate-400">
          {formattedFrom} → {formattedTo} · Budget: {budget} PLN/night
        </p>
      </div>

      <div className="flex flex-col gap-14">
        {/* Weather */}
        <section>
          <SectionHeading icon={Cloud} title="Weather Forecast" count={weather.length} />
          <WeatherGrid days={weather} />
        </section>

        {/* Attractions */}
        <section>
          <SectionHeading icon={MapPin} title="Top Attractions" count={attractions.length} />
          <AttractionsGrid attractions={attractions} />
        </section>

        {/* Hotels */}
        <section>
          <SectionHeading icon={Building2} title="Hotels within Budget" count={hotels.length} />
          <HotelsList hotels={hotels} />
        </section>
      </div>
    </div>
  )
}
