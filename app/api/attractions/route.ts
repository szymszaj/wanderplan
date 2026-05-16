import { NextRequest, NextResponse } from 'next/server'
import { fetchAttractions } from '@/lib/opentripmap'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { city, limit } = body

    if (!city || typeof city !== 'string') {
      return NextResponse.json({ error: 'city is required' }, { status: 400 })
    }

    const attractions = await fetchAttractions(city, limit ?? 12)
    return NextResponse.json(attractions)
  } catch (error) {
    console.error('[attractions] Error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
