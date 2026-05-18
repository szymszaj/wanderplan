import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { WeatherDay as WeatherDayType } from "@/types/weather.types";

interface WeatherDayProps extends WeatherDayType {
  className?: string;
}

export function WeatherDay({
  date,
  emoji,
  tempMin,
  tempMax,
  description,
  className,
}: WeatherDayProps) {
  const displayDate = format(new Date(date + "T12:00:00"), "EEE, MMM d");

  return (
    <div
      className={cn(
        "flex min-w-[148px] flex-col items-center gap-3 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-orange-100",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
        {displayDate}
      </p>
      <span className="text-5xl" role="img" aria-label={description}>
        {emoji}
      </span>
      <div className="text-center">
        <p className="text-lg font-bold text-stone-800">
          {tempMax}°{" "}
          <span className="font-normal text-stone-400">/ {tempMin}°</span>
        </p>
        <p className="mt-1 text-xs capitalize text-stone-400">{description}</p>
      </div>
    </div>
  );
}
