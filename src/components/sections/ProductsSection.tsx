import { ScrollReveal } from '../common/ScrollReveal'
import { ProductCard } from '../products/ProductCard'
import { showcaseProducts } from '../../data/products'

const carouselProducts = [...showcaseProducts, ...showcaseProducts]

export function ProductsSection() {
  return (
    <section id="products" className="overflow-hidden bg-brand-warm-deep/50 py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center" animation="blur">
          <span className="section-kicker">Catalog</span>
          <h2 className="section-title">Our products</h2>
          <p className="mt-3 text-sm text-brand-teal/65 md:text-base">
            A premium wellness line — botanical quality with results our customers love.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="products-marquee mt-12" delay={120} animation="blur">
        <div className="products-track flex w-max items-stretch gap-5 px-3">
          {carouselProducts.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
