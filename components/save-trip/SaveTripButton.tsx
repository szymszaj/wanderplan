'use client'

// AUTH DISABLED — SaveTripButton is fully implemented but hidden until Supabase is enabled.
// To enable: restore this component's render logic and activate useAuth.
import type { TripResult } from '@/types/trip.types'

interface SaveTripButtonProps {
  tripResult: TripResult
}

export function SaveTripButton({ tripResult: _tripResult }: SaveTripButtonProps) {
  return null
}
