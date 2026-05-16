import { NextRequest, NextResponse } from 'next/server'
import { fetchWeatherForecast } from '@/lib/openweather'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { city, dateFrom, dateTo } = body

    if (!city || typeof city !== 'string') {
      return NextResponse.json({ error: 'city is required' }, { status: 400 })
    }
    if (!dateFrom || !dateTo) {
      return NextResponse.json(
        { error: 'dateFrom and dateTo are required' },
        { status: 400 }
      )
    }

    const days = await fetchWeatherForecast(city, dateFrom, dateTo)
    return NextResponse.json(days)
  } catch (error) {
    console.error('[weather] Error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
