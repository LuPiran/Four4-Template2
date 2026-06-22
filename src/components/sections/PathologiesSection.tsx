import { useState } from 'react'
import { useProductModal } from '../../context/ProductModalContext'
import { ScrollReveal } from '../common/ScrollReveal'
import {
  countProductsByPathology,
  getProductsByPathology,
  pathologies,
  type PathologyId,
} from '../../data/pathologies'

export function PathologiesSection() {
  const { openProduct } = useProductModal()
  const [activeId, setActiveId] = useState<PathologyId>('sleep')
  const activePathology = pathologies.find((item) => item.id === activeId) ?? pathologies[0]
  const relatedProducts = getProductsByPathology(activeId)
  const ActiveIcon = activePathology.icon

  return (
    <section id="wellness" className="relative overflow-hidden bg-white/70 py-20">
      <div
        className="animate-gold-drift pointer-events-none absolute -left-32 top-1/4 size-80 rounded-full bg-brand-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center" animation="blur">
          <span className="section-kicker">Wellness goals</span>
          <h2 className="section-title">The right product for every need</h2>
          <p className="mt-3 text-sm text-brand-teal/60 md:text-base">
            Our catalog is organized by wellness goals. Explore the conditions our products support
            and find the ideal formula for your routine.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <ScrollReveal animation="blur">
            <div className="grid gap-2 md:grid-cols-1">
              {pathologies.map((pathology) => {
                const Icon = pathology.icon
                const count = countProductsByPathology(pathology.id)
                const isActive = pathology.id === activeId

                return (
                  <button
                    key={pathology.id}
                    type="button"
                    onClick={() => setActiveId(pathology.id)}
                    className={`pathology-tab group flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all duration-400 ${
                      isActive
                        ? 'border-brand-gold-dark/50 bg-brand-teal text-white shadow-md'
                        : 'border-brand-gold/20 bg-brand-warm/60 hover:border-brand-gold/40 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? 'bg-brand-gold text-brand-teal'
                          : 'bg-brand-gold/15 text-brand-gold-dark group-hover:bg-brand-gold group-hover:text-brand-teal'
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-brand-teal'}`}>
                          {pathology.name}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isActive ? 'bg-brand-gold/25 text-brand-gold-light' : 'bg-brand-gold/15 text-brand-gold-dark'
                          }`}
                        >
                          {count}
                        </span>
                      </div>
                      <p className={`mt-0.5 text-xs leading-relaxed ${isActive ? 'text-white/75' : 'text-brand-teal/55'}`}>
                        {pathology.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Painel detalhado */}
          <ScrollReveal animation="blur" delay={100}>
            <div className="pathology-panel overflow-hidden rounded-2xl border border-brand-gold/25 bg-white shadow-lg">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  key={activePathology.image}
                  src={activePathology.image}
                  alt={activePathology.name}
                  className="pathology-panel-image size-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-teal/90 via-brand-gold-dark/35 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-brand-gold-light backdrop-blur-sm">
                      <ActiveIcon className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{activePathology.name}</h3>
                      <p className="text-xs text-white/75">
                        {relatedProducts.length} product{relatedProducts.length !== 1 ? 's' : ''} in catalog
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-brand-teal/70">{activePathology.longDescription}</p>

                <div className="mt-6">
                  <p className="text-xs font-bold tracking-widest text-brand-gold uppercase">
                    Recommended products
                  </p>
                  <ul className="mt-3 space-y-2">
                    {relatedProducts.slice(0, 5).map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => openProduct(product.id)}
                          className="pathology-product-link group flex w-full items-center gap-3 rounded-xl border border-brand-gold/15 bg-brand-warm/50 px-3 py-2.5 text-left transition-all hover:border-brand-gold/40 hover:bg-white hover:shadow-sm"
                        >
                          <img
                            src={product.image}
                            alt=""
                            className="size-10 rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <span className="flex-1 text-sm font-medium text-brand-teal group-hover:text-brand-gold-dark">
                            {product.name}
                          </span>
                          <span className="text-xs text-brand-teal/40 transition-colors group-hover:text-brand-gold-dark">
                            View →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {relatedProducts.length > 5 && (
                    <a
                      href="#products"
                      className="mt-3 inline-block text-xs font-semibold text-brand-gold-dark hover:text-brand-teal"
                    >
                      View all {relatedProducts.length} products →
                    </a>
                  )}
                </div>

                <a
                  href="#contact"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-brand-gold/35 bg-brand-warm py-2.5 text-xs font-semibold text-brand-teal transition-all hover:border-brand-gold hover:bg-white sm:w-auto sm:px-6"
                >
                  Ask a specialist about {activePathology.name.toLowerCase()}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
