import { MapPin, Star } from 'lucide-react'
import type { Hotel } from '@/types/hotel.types'

interface HotelCardProps extends Hotel {}

const amenityEmoji: Record<string, string> = {
  WIFI: '📶',
  POOL: '🏊',
  GYM: '🏋️',
  SPA: '💆',
  PARKING: '🅿️',
  RESTAURANT: '🍽️',
  BAR: '🍸',
  AIR_CONDITIONING: '❄️',
}

export function HotelCard({
  name,
  address,
  pricePerNight,
  currency,
  amenities,
  rating,
  description,
}: HotelCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-100">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-stone-800 truncate">{name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-stone-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-400" />
            <span className="truncate">{address}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 px-3 py-1.5 text-right">
            <p className="text-xl font-extrabold text-white leading-none">
              {pricePerNight.toFixed(0)}
            </p>
            <p className="text-xs text-orange-100">{currency}/night</p>
          </div>
        </div>
      </div>

      {rating && (
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.round(rating) }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-1 text-sm text-stone-400">{rating.toFixed(1)}</span>
        </div>
      )}

      {description && (
        <p className="text-sm text-stone-500 line-clamp-2">{description}</p>
      )}

      {amenities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {amenities.slice(0, 5).map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs text-amber-700"
            >
              {amenityEmoji[amenity] ?? '✓'} {amenity.replace(/_/g, ' ').toLowerCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
