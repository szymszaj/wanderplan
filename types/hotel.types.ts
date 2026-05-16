export interface Hotel {
  hotelId: string
  name: string
  address: string
  cityCode: string
  pricePerNight: number
  currency: string
  amenities: string[]
  rating?: number
  description?: string
}
