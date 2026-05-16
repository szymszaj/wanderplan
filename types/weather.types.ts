export interface WeatherDay {
  date: string        // YYYY-MM-DD
  tempMin: number     // Celsius
  tempMax: number     // Celsius
  description: string
  icon: string        // OpenWeatherMap icon code e.g. "01d"
  emoji: string       // Derived emoji for display
}

export interface WeatherForecast {
  city: string
  days: WeatherDay[]
}
