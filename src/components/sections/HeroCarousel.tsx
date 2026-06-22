import { useCallback, useEffect, useState } from 'react'
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { heroBanners } from '../../data/banners'
import { gradientGold } from '../../styles/colors'

const AUTOPLAY_MS = 6000

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animating, setAnimating] = useState(false)

  const total = heroBanners.length

  const goTo = useCallback(
    (index: number) => {
      if (animating) return
      setAnimating(true)
      setActiveIndex((index + total) % total)
      window.setTimeout(() => setAnimating(false), 650)
    },
    [animating, total],
  )

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(goNext, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [paused, goNext, activeIndex])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  return (
    <section
      className="hero-carousel-v2 relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Promotional banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-carousel-stage relative">
        {heroBanners.map((banner, index) => {
          const isActive = index === activeIndex
          const Icon = banner.icon

          return (
            <article
              key={banner.id}
              aria-hidden={!isActive}
              className={`hero-banner-gold absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? 'z-10 translate-y-0 scale-100 opacity-100'
                  : index < activeIndex
                    ? 'z-0 -translate-y-6 scale-[0.98] opacity-0'
                    : 'z-0 translate-y-6 scale-[0.98] opacity-0'
              }`}
            >
              <div className="hero-gold-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
              <div
                className="animate-gold-orbit pointer-events-none absolute -top-20 right-[-4rem] size-56 rounded-full bg-white/30 blur-3xl md:size-80"
                aria-hidden="true"
              />
              <div
                className="animate-gold-drift pointer-events-none absolute bottom-[-5rem] left-[-3rem] size-64 rounded-full bg-brand-gold-light/40 blur-3xl md:size-96"
                aria-hidden="true"
              />

              <div className="hero-carousel-content relative mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 pb-20 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
                <div
                  className={`order-1 mx-auto w-full max-w-xl text-center md:mx-0 md:max-w-none md:text-left ${
                    isActive ? 'animate-hero-text-in' : 'opacity-0'
                  }`}
                >
                  <span
                    className="inline-flex max-w-full items-center gap-2 rounded-lg border border-brand-teal/10 bg-white/70 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-brand-teal uppercase shadow-sm backdrop-blur-sm sm:text-xs"
                  >
                    <HiOutlineSparkles className="animate-wobble size-3.5 shrink-0 text-brand-gold-dark" />
                    <span className="truncate">{banner.badge}</span>
                  </span>

                  <h2 className="mt-5 text-[1.75rem] leading-[1.12] font-bold text-brand-teal sm:text-3xl md:text-4xl lg:text-5xl">
                    {banner.title}
                    <span className="mt-2 block bg-linear-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light bg-clip-text text-[1.45rem] text-transparent sm:text-2xl md:text-3xl lg:text-4xl">
                      {banner.titleAccent}
                    </span>
                  </h2>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand-teal/70 sm:text-base md:mx-0 md:max-w-lg">
                    {banner.description}
                  </p>

                  {banner.promoLabel && (
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                      <span
                        className="animate-gold-pulse rounded-xl px-4 py-2 text-xl font-bold text-brand-teal shadow-md sm:text-2xl"
                        style={{ background: gradientGold }}
                      >
                        {banner.promoLabel}
                      </span>
                      {banner.promoOld && (
                        <span className="text-sm text-brand-teal/45 line-through">{banner.promoOld}</span>
                      )}
                      {banner.promoNew && (
                        <span className="text-lg font-semibold text-brand-teal">{banner.promoNew}</span>
                      )}
                    </div>
                  )}
                </div>

                <div
                  className={`hero-carousel-visual order-2 flex items-center justify-center ${
                    isActive ? 'animate-hero-visual-in' : 'opacity-0'
                  }`}
                >
                  <div className="hero-hex-frame relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52 md:h-60 md:w-60">
                    <div className="hero-hex-ring animate-hex-spin absolute inset-0" aria-hidden="true" />
                    <div className="hero-hex-ring hero-hex-ring--reverse animate-hex-spin-reverse absolute inset-3 sm:inset-4" aria-hidden="true" />
                    <div className="relative flex size-[78%] items-center justify-center rounded-3xl border border-white/60 bg-white/75 shadow-[0_20px_50px_-12px_rgba(197,160,89,0.55)] backdrop-blur-sm">
                      <div
                        className="flex size-[72%] items-center justify-center rounded-2xl shadow-inner"
                        style={{ background: gradientGold }}
                      >
                        <Icon className="size-[44%] text-brand-teal" />
                      </div>
                    </div>
                    {banner.floatingTag && (
                      <span className="animate-float-badge absolute -top-2 right-0 max-w-[9.5rem] truncate rounded-lg bg-brand-teal px-3 py-1.5 text-[10px] font-bold text-brand-gold-light shadow-lg sm:max-w-none sm:text-xs">
                        {banner.floatingTag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous banner"
        className="hero-carousel-arrow absolute top-[42%] left-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-brand-teal/15 bg-white/80 text-brand-teal shadow-md transition-all hover:scale-105 hover:bg-white md:top-1/2 md:left-6"
      >
        <HiOutlineArrowLeft className="size-5" />
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next banner"
        className="hero-carousel-arrow absolute top-[42%] right-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-brand-teal/15 bg-white/80 text-brand-teal shadow-md transition-all hover:scale-105 hover:bg-white md:top-1/2 md:right-6"
      >
        <HiOutlineArrowRight className="size-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {heroBanners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Go to banner ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-500 ${
              index === activeIndex
                ? 'h-2 w-8 bg-brand-teal'
                : 'size-2 bg-brand-teal/25 hover:bg-brand-teal/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
