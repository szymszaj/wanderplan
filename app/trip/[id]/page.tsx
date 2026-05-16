import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Results } from '@/components/results'
import type { SavedTrip } from '@/types/trip.types'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface TripPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: TripPageProps) {
  return { title: `Trip Details – WanderPlan` }
}

export default async function TripPage({ params }: TripPageProps) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/(auth)/login')
  }

  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    notFound()
  }

  const trip = data as SavedTrip

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/trips"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Trips
        </Link>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{trip.city}</h1>
            <p className="mt-1 text-slate-400">
              {format(new Date(trip.date_from + 'T12:00:00'), 'MMM d')} –{' '}
              {format(new Date(trip.date_to + 'T12:00:00'), 'MMM d, yyyy')} ·{' '}
              {trip.budget} PLN/night
            </p>
          </div>
        </div>
      </div>

      <Results result={trip.result_json} />
    </div>
  )
}
