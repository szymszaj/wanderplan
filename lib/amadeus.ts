import type { Hotel } from '@/types/hotel.types'

const AMADEUS_AUTH_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token'
const AMADEUS_HOTELS_URL = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city'
const AMADEUS_OFFERS_URL = 'https://test.api.amadeus.com/v3/shopping/hotel-offers'

interface AmadeusTokenResponse {
  access_token: string
  expires_in: number
}

interface AmadeusHotelRef {
  hotelId: string
  name: string
  address?: { lines?: string[]; cityCode?: string }
  amenities?: string[]
  rating?: string
}

interface AmadeusOffer {
  hotel: {
    hotelId: string
    name: string
    address?: { lines?: string[]; cityCode?: string }
    amenities?: string[]
    rating?: string
  }
  offers: Array<{
    price: { total: string; currency: string }
    room?: { description?: { text?: string } }
  }>
}

let cachedToken: string | null = null
let tokenExpiry = 0

export async function getAmadeusToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const clientId = process.env.AMADEUS_CLIENT_ID
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('AMADEUS_CLIENT_ID or AMADEUS_CLIENT_SECRET not set')
  }

  const res = await fetch(AMADEUS_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Amadeus auth error ${res.status}: ${text}`)
  }

  const data: AmadeusTokenResponse = await res.json()
  cachedToken = data.access_token
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60_000 // refresh 60s early
  return cachedToken
}

export async function fetchHotels(
  city: string,
  dateFrom: string,
  dateTo: string,
  maxBudget: number
): Promise<Hotel[]> {
  const token = await getAmadeusToken()

  // Amadeus uses IATA city codes (3-char uppercase)
  const cityCode = city.slice(0, 3).toUpperCase()

  // Step 1: get hotel list by city
  const hotelListRes = await fetch(
    `${AMADEUS_HOTELS_URL}?cityCode=${cityCode}&radius=20&radiusUnit=KM&hotelSource=ALL`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!hotelListRes.ok) {
    throw new Error(`Amadeus hotel list error ${hotelListRes.status}`)
  }

  const hotelListData = await hotelListRes.json()
  const hotelIds: string[] = (hotelListData.data as AmadeusHotelRef[])
    .slice(0, 20)
    .map((h) => h.hotelId)

  if (hotelIds.length === 0) return []

  // Step 2: get offers
  const offersRes = await fetch(
    `${AMADEUS_OFFERS_URL}?hotelIds=${hotelIds.join(',')}&checkInDate=${dateFrom}&checkOutDate=${dateTo}&adults=1&currency=PLN&bestRateOnly=true`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!offersRes.ok) {
    throw new Error(`Amadeus offers error ${offersRes.status}`)
  }

  const offersData = await offersRes.json()
  const offers: AmadeusOffer[] = offersData.data ?? []

  const hotels: Hotel[] = offers
    .filter((o) => {
      const price = parseFloat(o.offers[0]?.price?.total ?? '999999')
      return price <= maxBudget
    })
    .map((o) => ({
      hotelId: o.hotel.hotelId,
      name: o.hotel.name,
      address: o.hotel.address?.lines?.join(', ') ?? 'Address not available',
      cityCode: o.hotel.address?.cityCode ?? cityCode,
      pricePerNight: parseFloat(o.offers[0]?.price?.total ?? '0'),
      currency: o.offers[0]?.price?.currency ?? 'PLN',
      amenities: o.hotel.amenities?.slice(0, 6) ?? [],
      rating: o.hotel.rating ? parseFloat(o.hotel.rating) : undefined,
      description: o.offers[0]?.room?.description?.text,
    }))

  return hotels
}
