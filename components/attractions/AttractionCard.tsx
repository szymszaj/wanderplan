import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm transition-all duration-300 hover:border-indigo-700 hover:-translate-y-1">
      {/* Image or placeholder */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-900/40 to-violet-900/40">
            <span className="text-5xl opacity-30">🗺️</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-bold text-white line-clamp-2">{name}</h3>

        {displayKinds.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {displayKinds.map((kind) => (
              <Badge key={kind} variant="indigo">
                {kind}
              </Badge>
            ))}
          </div>
        )}

        {description && (
          <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
        )}

        {wikipediaUrl && (
          <a
            href={wikipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Wikipedia
          </a>
        )}
      </div>
    </div>
  )
}
