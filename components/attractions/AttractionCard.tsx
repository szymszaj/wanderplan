import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { Attraction } from '@/types/attraction.types'

interface AttractionCardProps extends Attraction {}

export function AttractionCard({
  name,
  image,
  kinds,
  wikipediaUrl,
  description,
}: AttractionCardProps) {
  const displayKinds = kinds
    .filter((k) => k && k !== 'interesting_places')
    .slice(0, 3)
    .map((k) => k.replace(/_/g, ' '))

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100">
      <div className="relative h-44 w-full overflow-hidden bg-orange-50">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
            <span className="text-6xl opacity-60">🏛️</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-bold text-stone-800 line-clamp-2">{name}</h3>

        {displayKinds.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {displayKinds.map((kind) => (
              <span
                key={kind}
                className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-600 capitalize"
              >
                {kind}
              </span>
            ))}
          </div>
        )}

        {description && (
          <p className="text-sm text-stone-500 line-clamp-2">{description}</p>
        )}

        {wikipediaUrl && (
          <a
            href={wikipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Read more
          </a>
        )}
      </div>
    </div>
  )
}
