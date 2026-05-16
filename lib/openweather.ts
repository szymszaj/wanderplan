import type { WeatherDay } from '@/types/weather.types'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function iconToEmoji(icon: string): string {
  const code = icon.slice(0, 2)
  const map: Record<string, string> = {
    '01': '☀️',
    '02': '⛅',
    '03': '☁️',
    '04': '☁️',
    '09': '🌧️',
    '10': '🌦️',
    '11': '⛈️',
    '13': '❄️',
    '50': '🌫️',
  }
  return map[code] ?? '🌡️'
}

export async function fetchWeatherForecast(
  city: string,
  dateFrom: string,
  dateTo: string
): Promise<WeatherDay[]> {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY
  if (!apiKey) throw new Error('OPENWEATHERMAP_API_KEY is not set')

  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&cnt=40`
  const res = await fetch(url)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenWeatherMap error ${res.status}: ${text}`)
  }

  const data = await res.json()

  const from = new Date(dateFrom)
  const to = new Date(dateTo)
  to.setHours(23, 59, 59)

  // Group 3-hour slots by day and aggregate
  const dayMap = new Map<
    string,
    { temps: number[]; descriptions: string[]; icons: string[] }
  >()

  for (const item of data.list) {
    const dt = new Date(item.dt * 1000)
    if (dt < from || dt > to) continue
    const dateKey = dt.toISOString().slice(0, 10)

    if (!dayMap.has(dateKey)) {
      dayMap.set(dateKey, { temps: [], descriptions: [], icons: [] })
    }
    const entry = dayMap.get(dateKey)!
    entry.temps.push(item.main.temp_min, item.main.temp_max)
    entry.descriptions.push(item.weather[0].description)
    entry.icons.push(item.weather[0].icon)
  }

  const days: WeatherDay[] = []
  for (const [date, { temps, descriptions, icons }] of dayMap) {
    const tempMin = Math.round(Math.min(...temps))
    const tempMax = Math.round(Math.max(...temps))
    const icon = icons[Math.floor(icons.length / 2)] ?? '01d'
    const description =
      descriptions[Math.floor(descriptions.length / 2)] ?? 'clear sky'

    days.push({
      date,
      tempMin,
      tempMax,
      description,
      icon,
      emoji: iconToEmoji(icon),
    })
  }

  return days.sort((a, b) => a.date.localeCompare(b.date))
}
