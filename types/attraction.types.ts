export interface Attraction {
  xid: string
  name: string
  kinds: string[]
  description?: string
  image?: string
  wikipediaUrl?: string
  lat: number
  lon: number
  rate?: number
}
