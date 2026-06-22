import { ScrollReveal } from '../common/ScrollReveal'
import { useCountUp } from '../../hooks/useCountUp'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const stats = [
  { label: 'Products in catalog', value: 50, suffix: '+' },
  { label: 'Happy customers', value: 12000, suffix: '+' },
  { label: 'Orders processed', value: 48000, suffix: '+' },
  { label: 'Average rating', value: 49, suffix: '/5', divisor: 10 },
]

function StatItem({
  label,
  value,
  suffix,
  divisor = 1,
  active,
}: {
  label: string
  value: number
  suffix: string
  divisor?: number
  active: boolean
}) {
  const count = useCountUp(value, active)
  const display = divisor > 1 ? (count / divisor).toFixed(1) : count.toLocaleString('en-US')

  return (
    <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-6 text-center backdrop-blur-sm">
      <p className="text-3xl font-bold text-white md:text-4xl">
        {display}
        <span className="text-brand-warm">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-white/80">{label}</p>
    </div>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section id="stats" ref={ref} className="stats-gold-panel relative overflow-hidden py-16">
      <div
        className="animate-gold-orbit pointer-events-none absolute -top-16 left-1/4 size-72 rounded-full bg-white/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-gold-drift pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-brand-teal/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center" animation="blur">
          <span className="section-kicker bg-white/25 text-white">By the numbers</span>
          <h2 className="section-title text-white">Trust built at scale</h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 80} animation="blur">
              <StatItem
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                divisor={stat.divisor}
                active={isVisible}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
