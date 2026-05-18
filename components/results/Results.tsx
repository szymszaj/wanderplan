import { WeatherGrid } from "@/components/weather";
import { AttractionsGrid } from "@/components/attractions";
import { HotelsList } from "@/components/hotels";
import type { TripResult } from "@/types/trip.types";
import { format } from "date-fns";

interface ResultsProps {
  result: TripResult;
}

function SectionHeading({
  emoji,
  title,
  count,
}: {
  emoji: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 text-2xl">
        {emoji}
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-stone-800">{title}</h2>
        {count !== undefined && (
          <p className="text-sm text-stone-400">{count} results found</p>
        )}
      </div>
      <div className="ml-4 flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent" />
    </div>
  );
}

export function Results({ result }: ResultsProps) {
  const { city, dateFrom, dateTo, budget, weather, attractions, hotels } =
    result;

  const formattedFrom = format(new Date(dateFrom + "T12:00:00"), "MMM d");
  const formattedTo = format(new Date(dateTo + "T12:00:00"), "MMM d, yyyy");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Trip banner */}
      <div className="mb-14 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white shadow-xl shadow-orange-200">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-orange-100 uppercase tracking-wider mb-1">
              Your trip
            </p>
            <h1 className="text-4xl font-extrabold">{city} 🌍</h1>
            <p className="mt-2 text-orange-100">
              {formattedFrom} → {formattedTo}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:text-right">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-sm px-5 py-3">
              <span className="text-2xl">🏨</span>
              <div>
                <p className="text-xs text-orange-100">Max budget</p>
                <p className="text-xl font-bold">
                  {budget} PLN
                  <span className="text-sm font-normal text-orange-100">
                    /night
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <section>
          <SectionHeading
            emoji="☀️"
            title="Weather Forecast"
            count={weather.length}
          />
          <WeatherGrid days={weather} />
        </section>

        <section>
          <SectionHeading
            emoji="🗺️"
            title="Top Attractions"
            count={attractions.length}
          />
          <AttractionsGrid attractions={attractions} />
        </section>

        <section>
          <SectionHeading
            emoji="🏨"
            title="Hotels in Budget"
            count={hotels.length}
          />
          <HotelsList hotels={hotels} />
        </section>
      </div>
    </div>
  );
}
