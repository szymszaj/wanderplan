import { FeatureCard } from './FeatureCard'

interface Feature {
  icon: string
  emoji: string
  title: string
  description: string
}

interface FeaturesSectionProps {
  features: Feature[]
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section id="how" className="py-24 bg-[#fffbf5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
            How it works
          </span>
          <h2 className="text-4xl font-extrabold text-stone-800 md:text-5xl">
            Plan smarter,{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              travel better
            </span>
          </h2>
          <p className="mt-4 text-lg text-stone-500">
            Everything you need for the perfect trip — in seconds.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
