import { TripCard } from './TripCard'
import type { SavedTrip } from '@/types/trip.types'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PlusCircle } from 'lucide-react'

interface TripsListProps {
  trips: SavedTrip[]
}

export function TripsList({ trips }: TripsListProps) {
  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <span className="text-6xl">🗺️</span>
        <div>
          <h2 className="text-2xl font-bold text-white">No trips yet</h2>
          <p className="mt-2 text-slate-400">
            Start planning your first adventure and save it here.
          </p>
        </div>
        <Link href="/">
          <Button variant="primary" size="md">
            <PlusCircle className="h-4 w-4" />
            Plan a trip
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
    </div>
  )
}
