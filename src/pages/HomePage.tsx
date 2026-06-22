import { AppShell } from '../components/layout/AppShell'
import { ContactSection } from '../components/sections/ContactSection'
import { AboutStoreSection } from '../components/sections/AboutStoreSection'
import { PathologiesSection } from '../components/sections/PathologiesSection'
import { HeroCarousel } from '../components/sections/HeroCarousel'
import { ProductsSection } from '../components/sections/ProductsSection'
import { StatsSection } from '../components/sections/StatsSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { TrustBadges } from '../components/sections/TrustBadges'

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <TrustBadges />
      <AboutStoreSection />
      <PathologiesSection />
      <StatsSection />
      <TestimonialsSection />
      <ProductsSection />
      <ContactSection />
    </>
  )
}

export function HomeLayout() {
  return (
    <AppShell>
      <HomePage />
    </AppShell>
  )
}
