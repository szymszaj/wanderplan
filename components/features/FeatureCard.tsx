interface FeatureCardProps {
  icon: string
  title: string
  description: string
  emoji: string
}

export function FeatureCard({ title, description, emoji }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-orange-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 text-4xl">
        {emoji}
      </div>
      <h3 className="mb-3 text-xl font-bold text-stone-800">{title}</h3>
      <p className="text-stone-500 leading-relaxed">{description}</p>
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-orange-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}
