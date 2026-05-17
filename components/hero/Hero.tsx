import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
}

export function Hero({ title, subtitle, ctaText }: HeroProps) {
  return (
    <section className="relative overflow-hidden h-[90vh] min-h-[600px] flex items-center">
      {/* Background photo */}
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85&auto=format&fit=crop"
        alt="Tropical beach"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-sm">
          ✈️ Your next adventure is waiting
        </div>

        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
          {title.split(' ').slice(0, 3).join(' ')}{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              {title.split(' ').slice(3).join(' ')}
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#search"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/50"
          >
            {ctaText} 🌍
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
          >
            How it works
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5">
            <div className="h-2 w-0.5 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  )
}
