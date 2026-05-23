import { AttractionCard } from "./AttractionCard";
import type { Attraction } from "@/types/attraction.types";

interface AttractionsGridProps {
  attractions: Attraction[];
}

export function AttractionsGrid({ attractions }: AttractionsGridProps) {
  if (attractions.length === 0) {
    return (
      <p className="text-slate-400 italic">
        No attractions found for this city.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {attractions.map((attraction) => (
        <AttractionCard key={attraction.xid} {...attraction} />
      ))}
    </div>
  );
}
