import type { WeatherDay } from './weather.types'
import type { Attraction } from './attraction.types'
import type { Hotel } from './hotel.types'

export interface TripFormData {
  city: string
  dateFrom: string // ISO date string YYYY-MM-DD
  dateTo: string   // ISO date string YYYY-MM-DD
  budget: number   // PLN per night
}

export interface TripResult {
  city: string
  dateFrom: string
  dateTo: string
  budget: number
  weather: WeatherDay[]
  attractions: Attraction[]
  hotels: Hotel[]
}

export interface SavedTrip {
  id: string
  user_id: string
  city: string
  date_from: string
  date_to: string
  budget: number
  result_json: TripResult
  created_at: string
}
