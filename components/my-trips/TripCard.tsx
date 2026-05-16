import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowRight, Calendar, MapPin, Wallet } from 'lucide-react'
import type { SavedTrip } from '@/types/trip.types'

interface TripCardProps extends SavedTrip {}

export function TripCard({ id, city, date_from, date_to, budget, created_at }: TripCardProps) {
  const formattedFrom = format(new Date(date_from + 'T12:00:00'), 'MMM d')
  const formattedTo = format(new Date(date_to + 'T12:00:00'), 'MMM d, yyyy')
  const savedOn = format(new Date(created_at), 'MMM d, yyyy')

  return (
    <Link href={`/trip/${id}`} className="group block">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-900/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              {city}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">Saved on {savedOn}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-600 transition-all duration-200 group-hover:text-indigo-400 group-hover:translate-x-1" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="h-4 w-4 text-indigo-400" />
            <span>
              {formattedFrom} – {formattedTo}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Wallet className="h-4 w-4 text-indigo-400" />
            <span>Budget: {budget} PLN/night</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
