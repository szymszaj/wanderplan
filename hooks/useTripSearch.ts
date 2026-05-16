'use client'

import { useState, useCallback } from 'react'
import type { TripFormData, TripResult } from '@/types/trip.types'

interface UseTripSearchReturn {
  formData: TripFormData
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>
  results: TripResult | null
  loading: boolean
  error: string | null
  search: () => Promise<void>
  reset: () => void
}

const initialFormData: TripFormData = {
  city: '',
  dateFrom: '',
  dateTo: '',
  budget: 300,
}

export function useTripSearch(): UseTripSearchReturn {
  const [formData, setFormData] = useState<TripFormData>(initialFormData)
  const [results, setResults] = useState<TripResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async () => {
    if (!formData.city || !formData.dateFrom || !formData.dateTo) {
      setError('Please fill in all required fields.')
      return
    }
    if (formData.budget <= 0) {
      setError('Budget must be greater than 0.')
      return
    }

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const [weatherRes, attractionsRes, hotelsRes] = await Promise.allSettled([
        fetch('/api/weather', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            city: formData.city,
            dateFrom: formData.dateFrom,
            dateTo: formData.dateTo,
          }),
        }),
        fetch('/api/attractions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city: formData.city }),
        }),
        fetch('/api/hotels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            city: formData.city,
            dateFrom: formData.dateFrom,
            dateTo: formData.dateTo,
            budget: formData.budget,
          }),
        }),
      ])

      const weather =
        weatherRes.status === 'fulfilled' && weatherRes.value.ok
          ? await weatherRes.value.json()
          : []

      const attractions =
        attractionsRes.status === 'fulfilled' && attractionsRes.value.ok
          ? await attractionsRes.value.json()
          : []

      const hotels =
        hotelsRes.status === 'fulfilled' && hotelsRes.value.ok
          ? await hotelsRes.value.json()
          : []

      setResults({
        city: formData.city,
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo,
        budget: formData.budget,
        weather,
        attractions,
        hotels,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [formData])

  const reset = useCallback(() => {
    setFormData(initialFormData)
    setResults(null)
    setError(null)
  }, [])

  return { formData, setFormData, results, loading, error, search, reset }
}
