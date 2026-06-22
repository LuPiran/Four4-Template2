import { HiStar } from 'react-icons/hi'
import { ScrollReveal } from '../common/ScrollReveal'
import { reviews } from '../../data/reviews'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <HiStar
          key={i}
          className={`size-4 ${i < count ? 'text-brand-gold-dark' : 'text-brand-gold/25'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-brand-warm py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center" animation="blur">
          <span className="section-kicker">Testimonials</span>
          <h2 className="section-title">What our customers say</h2>
          <p className="mt-3 text-sm text-brand-teal/65 md:text-base">
            Real reviews from people who experienced our premium products.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <ScrollReveal key={review.id} delay={index * 90} animation="blur">
              <article className="testimonial-card-v2 group h-full rounded-2xl border border-brand-gold/25 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="size-11 rounded-xl object-cover ring-2 ring-brand-gold/30 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div>
                    <p className="text-sm font-semibold text-brand-teal">{review.name}</p>
                    <p className="text-[11px] text-brand-teal/50">{review.product}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Stars count={review.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-teal/70">&ldquo;{review.text}&rdquo;</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
