import { HotelCard } from './HotelCard'
import type { Hotel } from '@/types/hotel.types'

interface HotelsListProps {
  hotels: Hotel[]
}

export function HotelsList({ hotels }: HotelsListProps) {
  if (hotels.length === 0) {
    return (
      <p className="text-slate-400 italic">
        No hotels found within your budget. Try increasing your budget or changing dates.
      </p>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.hotelId} {...hotel} />
      ))}
    </div>
  )
}
