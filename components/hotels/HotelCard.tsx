import { MapPin, Star, Wifi } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Hotel } from '@/types/hotel.types'

interface HotelCardProps extends Hotel {}

const amenityIcons: Record<string, string> = {
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
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-700 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white truncate">{name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{address}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-xl font-extrabold text-white">
            {pricePerNight.toFixed(0)}
            <span className="ml-1 text-sm font-normal text-slate-400">{currency}</span>
          </div>
          <div className="text-xs text-slate-500">/ night</div>
        </div>
      </div>

      {rating && (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.round(rating) }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-1 text-sm text-slate-400">{rating.toFixed(1)}</span>
        </div>
      )}

      {description && (
        <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
      )}

      {amenities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {amenities.slice(0, 5).map((amenity) => (
            <Badge key={amenity} variant="default" className="text-xs">
              {amenityIcons[amenity] ?? '✓'} {amenity.replace(/_/g, ' ').toLowerCase()}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
