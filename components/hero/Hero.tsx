import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
}

export function Hero({ title, subtitle, ctaText }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-800 bg-indigo-950/60 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur-sm">
          ✈️ Your next adventure awaits
        </div>

        <h1
          className={cn(
            'mt-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl'
          )}
        >
          {title.split(' ').map((word, i) =>
            i >= 2 ? (
              <span key={i} className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {' '}{word}
              </span>
            ) : (
              <span key={i}>{i > 0 ? ' ' : ''}{word}</span>
            )
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
          {subtitle}
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#search"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:from-indigo-600 hover:to-violet-700 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            {ctaText}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
