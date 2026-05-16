import { FeatureCard } from './FeatureCard'

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesSectionProps {
  features: Feature[]
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              travel smarter
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            All the tools to research, plan, and book your trip in one dashboard.
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
