import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TripsList } from '@/components/my-trips'
import type { SavedTrip } from '@/types/trip.types'

export const metadata = {
  title: 'My Trips – WanderPlan',
}

export default async function TripsPage() {
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
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const trips: SavedTrip[] = error ? [] : (data as SavedTrip[])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">My Trips</h1>
        <p className="mt-2 text-slate-400">
          {trips.length > 0
            ? `You have ${trips.length} saved trip${trips.length > 1 ? 's' : ''}.`
            : 'Your saved trips will appear here.'}
        </p>
        <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
      </div>
      <TripsList trips={trips} />
    </div>
  )
}
