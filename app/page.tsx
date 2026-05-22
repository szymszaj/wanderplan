"use client";

import { Results } from "@/components/results";
import { useTripSearch } from "@/hooks/useTripSearch";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";

function SearchSection({
  searchState,
}: {
  searchState: ReturnType<typeof useTripSearch>;
}) {
  const { formData, setFormData, loading, error, search } = searchState;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Destination"
              type="text"
              placeholder="e.g. Rome, Bali, Barcelona..."
              value={formData.city}
              onChange={(e) =>
                setFormData((f) => ({ ...f, city: e.target.value }))
              }
            />
          </div>
          <Input
            label="From"
            type="date"
            min={today}
            value={formData.dateFrom}
            onChange={(e) =>
              setFormData((f) => ({ ...f, dateFrom: e.target.value }))
            }
          />
          <Input
            label="To"
            type="date"
            min={formData.dateFrom || today}
            value={formData.dateTo}
            onChange={(e) =>
              setFormData((f) => ({ ...f, dateTo: e.target.value }))
            }
          />
          <div className="sm:col-span-2">
            <Input
              label="Max hotel budget (PLN / night)"
              type="number"
              min={1}
              step={50}
              placeholder="e.g. 400"
              value={formData.budget || ""}
              onChange={(e) =>
                setFormData((f) => ({ ...f, budget: Number(e.target.value) }))
              }
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

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
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const searchState = useTripSearch();
  const { results, loading } = searchState;

  return (
    <>
      <section className="pt-20 pb-4 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-stone-800 md:text-6xl">
          Where to next?
        </h1>
        <p className="mt-3 text-stone-400 text-lg">
          Weather · Attractions · Hotels — all in one search.
        </p>
      </section>

      <SearchSection searchState={searchState} />

      {results && !loading && (
        <div className="border-t border-orange-100">
          <Results result={results} />
        </div>
      )}
    </>
  );
}
