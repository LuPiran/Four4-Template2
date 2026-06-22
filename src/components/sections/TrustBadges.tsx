import { ScrollReveal } from '../common/ScrollReveal'
import { trustBadges } from '../../data/trust'

export function TrustBadges() {
  return (
    <section className="border-y border-brand-gold/20 bg-brand-warm-deep/60 py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <ScrollReveal key={badge.title} delay={index * 70} animation="blur">
                <div className="trust-badge-card group flex flex-col items-center rounded-2xl border border-brand-gold/25 bg-white/70 p-4 text-center backdrop-blur-sm">
                  <div className="relative mb-3 flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-gold-light to-brand-gold shadow-md">
                    <Icon className="size-6 text-brand-teal transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                  </div>
                  <p className="text-xs font-bold tracking-wide text-brand-teal uppercase">{badge.title}</p>
                  <p className="mt-0.5 text-[11px] text-brand-teal/55">{badge.subtitle}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
