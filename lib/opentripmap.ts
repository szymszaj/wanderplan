import type { Attraction } from '@/types/attraction.types'

const BASE_URL = 'https://api.opentripmap.com/0.1/en'

interface GeoResponse {
  hits: Array<{
    point: { lat: number; lng: number }
  }>
}

interface OtmFeature {
  properties: {
    xid: string
    name: string
    kinds: string
    rate: number
    wikipedia?: string
    image?: string
    point: { lat: number; lon: number }
  }
}

interface OtmFeatureCollection {
  features: OtmFeature[]
}

async function getCityCoords(
  city: string,
  apiKey: string
): Promise<{ lat: number; lon: number }> {
  const url = `${BASE_URL}/places/geoname?name=${encodeURIComponent(city)}&apikey=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`OpenTripMap geoname error ${res.status}`)
  const data = await res.json()
  if (!data.lat || !data.lon) throw new Error('City not found in OpenTripMap')
  return { lat: data.lat, lon: data.lon }
}

export async function fetchAttractions(
  city: string,
  limit = 12
): Promise<Attraction[]> {
  const apiKey = process.env.OPENTRIPMAP_API_KEY
  if (!apiKey) throw new Error('OPENTRIPMAP_API_KEY is not set')

  const { lat, lon } = await getCityCoords(city, apiKey)

  const url = `${BASE_URL}/places/radius?radius=5000&lon=${lon}&lat=${lat}&kinds=interesting_places&rate=2&format=geojson&limit=${limit}&apikey=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`OpenTripMap radius error ${res.status}`)

  const data: OtmFeatureCollection = await res.json()

  const attractions: Attraction[] = data.features
    .filter((f) => f.properties.name)
    .map((f) => ({
      xid: f.properties.xid,
      name: f.properties.name,
      kinds: f.properties.kinds
        ? f.properties.kinds.split(',').map((k) => k.trim()).slice(0, 4)
        : [],
      image: f.properties.image ?? undefined,
      wikipediaUrl: f.properties.wikipedia
        ? `https://en.wikipedia.org/wiki/${f.properties.wikipedia}`
        : undefined,
      lat: f.properties.point.lat,
      lon: f.properties.point.lon,
      rate: f.properties.rate,
    }))

  return attractions
}
