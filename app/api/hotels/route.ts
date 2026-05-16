import { NextRequest, NextResponse } from 'next/server'
import { fetchHotels } from '@/lib/amadeus'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { city, dateFrom, dateTo, budget } = body

    if (!city || typeof city !== 'string') {
      return NextResponse.json({ error: 'city is required' }, { status: 400 })
    }
    if (!dateFrom || !dateTo) {
      return NextResponse.json(
        { error: 'dateFrom and dateTo are required' },
        { status: 400 }
      )
    }
    if (!budget || typeof budget !== 'number' || budget <= 0) {
      return NextResponse.json(
        { error: 'budget must be a positive number' },
        { status: 400 }
      )
    }

    const hotels = await fetchHotels(city, dateFrom, dateTo, budget)
    return NextResponse.json(hotels)
  } catch (error) {
    console.error('[hotels] Error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
