import { useProductModal } from '../../context/ProductModalContext'
import {
  HiOutlineBeaker,
  HiOutlineCheckBadge,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { ScrollReveal } from '../common/ScrollReveal'
import { BrandLogo } from '../common/BrandLogo'
import {
  brandLineShowcase,
  experienceSteps,
  galleryImages,
  productCategories,
  storeIntro,
  storePillars,
} from '../../data/storeStory'
import { gradientGold } from '../../styles/colors'

const pillarIcons = [HiOutlineSparkles, HiOutlineBeaker, HiOutlineCheckBadge]

export function AboutStoreSection() {
  const { openProduct } = useProductModal()
  const marqueeImages = [...galleryImages, ...galleryImages]

  return (
    <section id="about" className="overflow-hidden bg-brand-warm">
      {/* Intro + collage */}
      <div className="relative py-20">
        <div
          className="animate-gold-orbit pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-brand-gold/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal animation="blur">
              <span className="section-kicker">{storeIntro.overline}</span>
              <h2 className="section-title lg:text-[2.6rem] lg:leading-tight">
                {storeIntro.title}
              </h2>
              {storeIntro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-relaxed text-brand-teal/65 md:text-base">
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="rounded-full px-6 py-2.5 text-xs font-semibold text-brand-teal transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: gradientGold }}
                >
                  View catalog
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-brand-gold/40 bg-white/70 px-6 py-2.5 text-xs font-semibold text-brand-teal transition-all hover:border-brand-gold hover:bg-white"
                >
                  Talk to our team
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="blur" delay={120}>
              <div className="about-collage relative mx-auto aspect-[4/5] max-w-md">
                {storeIntro.collageImages.map((item, index) => (
                  <div
                    key={item.src}
                    className={`about-collage-item absolute overflow-hidden rounded-2xl border-4 border-white shadow-xl ${item.className} ${
                      index === 0 ? 'animate-float' : index === 1 ? 'animate-float-delayed' : 'animate-bounce-subtle'
                    }`}
                  >
                    <img src={item.src} alt={item.alt} className="size-full object-cover" loading="lazy" />
                  </div>
                ))}
                <div className="animate-glow-pulse absolute -bottom-4 left-1/2 z-0 size-40 -translate-x-1/2 rounded-full bg-brand-gold/20 blur-2xl" aria-hidden="true" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Linhas de marca */}
      <div className="border-y border-brand-gold/20 bg-brand-warm-deep/40 py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <ScrollReveal className="text-center" animation="blur">
            <span className="section-kicker">Our lines</span>
            <h3 className="section-title">Eight colors, eight purposes</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-teal/60">
              Each Polisupport line has a visual identity and a clear benefit — choose the color that
              matches your moment.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-2 items-stretch gap-3 md:grid-cols-4 xl:grid-cols-8">
            {brandLineShowcase.map((line, index) => (
              <ScrollReveal key={line.line} delay={index * 60} animation="scale" className="h-full">
                <div className="brand-line-card group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div
                    className="relative flex h-20 shrink-0 items-end justify-center pb-2 transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundColor: line.color }}
                  >
                    <span className="text-sm font-bold tracking-widest text-brand-gold-light uppercase">
                      {line.label}
                    </span>
                    <div className="brand-line-pattern absolute inset-0 opacity-30" aria-hidden="true" />
                  </div>
                  <p className="flex min-h-[4.75rem] flex-1 items-center justify-center px-2 py-2.5 text-center text-[10px] leading-snug text-brand-teal/60">
                    {line.meaning}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Pilares com imagens */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal className="mx-auto max-w-2xl text-center" animation="blur">
            <span className="section-kicker">Quality</span>
            <h3 className="section-title">What makes our products unique</h3>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {storePillars.map((pillar, index) => {
              const Icon = pillarIcons[index]
              return (
                <ScrollReveal key={pillar.title} delay={index * 100} animation="blur">
                  <article className="store-pillar-card group overflow-hidden rounded-2xl border border-brand-gold/20 bg-white/80 shadow-sm backdrop-blur-sm">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-brand-teal/75 via-brand-gold-dark/25 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-xl bg-brand-gold text-brand-teal shadow-md transition-transform duration-500 group-hover:-translate-y-1">
                        <Icon className="size-5" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold text-brand-teal">{pillar.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-brand-teal/60">{pillar.description}</p>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="stats-gold-panel py-20 text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <ScrollReveal className="mx-auto max-w-2xl text-center" animation="blur">
            <span className="section-kicker bg-white/25 text-white">Formats</span>
            <h3 className="section-title text-white">Find the right product for you</h3>
            <p className="mt-3 text-sm text-white/70">
              Six categories designed for different moments — from morning to night, topical to oral use.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, index) => (
              <ScrollReveal key={category.key} delay={index * 80} animation="fade-up">
                <a
                  href="#products"
                  className="category-showcase-card group flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-white/10"
                >
                  <div className="relative w-28 shrink-0 overflow-hidden sm:w-32">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{category.label}</h4>
                      <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-bold text-brand-gold-light">
                        {category.productCount}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/65">{category.description}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Galeria animada */}
      <div className="py-16">
        <ScrollReveal className="mx-auto max-w-6xl px-6 text-center lg:px-10" animation="blur">
          <span className="section-kicker">Gallery</span>
          <h3 className="section-title">The Polisupport experience</h3>
        </ScrollReveal>

        <ScrollReveal className="gallery-marquee mt-10" delay={100}>
          <div className="gallery-track flex w-max gap-4 px-4">
            {marqueeImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="gallery-image-card relative h-48 w-72 shrink-0 overflow-hidden rounded-2xl shadow-md sm:h-56 sm:w-80"
              >
                <img src={src} alt="" className="size-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-brand-gold-dark/0 transition-colors duration-500 hover:bg-brand-gold-dark/15" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Jornada + logo */}
      <div className="border-t border-brand-gold/20 bg-white/60 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <ScrollReveal animation="blur">
                <span className="section-kicker">How it works</span>
                <h3 className="section-title">From selection to delivery, care at every step</h3>
              </ScrollReveal>

              <div className="mt-10 space-y-6">
                {experienceSteps.map((step, index) => (
                  <ScrollReveal key={step.step} delay={index * 90} animation="blur">
                    <div className="experience-step group flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-xs font-bold text-brand-teal shadow-md transition-transform duration-500 group-hover:scale-110">
                          {step.step}
                        </span>
                        {index < experienceSteps.length - 1 && (
                          <div className="experience-step-line mt-2 w-px flex-1 bg-brand-gold/30" aria-hidden="true" />
                        )}
                      </div>
                      <div className="pb-4">
                        <h4 className="font-semibold text-brand-teal">{step.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-brand-teal/60">{step.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal animation="blur" delay={200}>
              <div className="about-brand-panel mx-auto max-w-xs rounded-3xl border border-brand-gold/30 bg-brand-warm-deep/80 p-8 text-center shadow-lg backdrop-blur-sm">
                <BrandLogo size="lg" className="mx-auto" />
                <p className="mt-4 text-sm leading-relaxed text-brand-teal/65">
                  Premium Wellness — where nature meets scientific precision.
                </p>
                <button
                  type="button"
                  onClick={() => openProduct('1')}
                  className="mt-6 inline-block rounded-full px-5 py-2 text-xs font-semibold text-brand-teal transition-transform hover:scale-105"
                  style={{ background: gradientGold }}
                >
                  Explore a product
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
