'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { useTripSearch } from '@/hooks/useTripSearch'

interface TripFormExternalProps {
  onResults: (results: ReturnType<typeof useTripSearch>['results']) => void
  onSearchStart: () => void
}

// Export hook and form separately so page can access results
export { useTripSearch }

export function TripForm({
  onChange,
}: {
  onChange?: (search: ReturnType<typeof useTripSearch>) => void
}) {
  const searchState = useTripSearch()
  const { formData, setFormData, loading, error, search } = searchState

  // Bubble state up to parent
  if (onChange) {
    onChange(searchState)
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <section id="search" className="py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-black/30">
          <h2 className="mb-2 text-2xl font-bold text-white">Find your trip</h2>
          <p className="mb-8 text-slate-400">Enter your destination and preferences to get started.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Destination city"
                type="text"
                placeholder="e.g. Paris, Tokyo, Barcelona"
                value={formData.city}
                onChange={(e) => setFormData((f) => ({ ...f, city: e.target.value }))}
              />
            </div>
            <Input
              label="From date"
              type="date"
              min={today}
              value={formData.dateFrom}
              onChange={(e) => setFormData((f) => ({ ...f, dateFrom: e.target.value }))}
            />
            <Input
              label="To date"
              type="date"
              min={formData.dateFrom || today}
              value={formData.dateTo}
              onChange={(e) => setFormData((f) => ({ ...f, dateTo: e.target.value }))}
            />
            <div className="sm:col-span-2">
              <Input
                label="Max budget (PLN / night)"
                type="number"
                min={1}
                step={50}
                placeholder="300"
                value={formData.budget || ''}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, budget: Number(e.target.value) }))
                }
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={search}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Searching…
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Find my trip
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
