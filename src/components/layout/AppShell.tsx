import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { AnimatedOutlet } from '../common/AnimatedOutlet'
import { AppSidebar } from './AppSidebar'
import { Footer } from './Footer'
import { BrandLogo } from '../common/BrandLogo'
import { ProductModal } from '../products/ProductModal'
import { WhatsAppFloat } from '../common/WhatsAppFloat'
import { ProductModalProvider } from '../../context/ProductModalContext'
import { CartProvider } from '../../context/CartContext'
import { ToastProvider } from '../../context/ToastContext'
import { CartDrawer } from '../cart/CartDrawer'
import { CartButton } from '../cart/CartButton'
import { SidebarProvider, useSidebar } from '../../context/SidebarContext'

const DRAWER_CLOSE_MS = 320

function AppShellInner() {
  const { collapsed } = useSidebar()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const openDrawer = useCallback(() => {
    clearCloseTimer()
    setDrawerClosing(false)
    setDrawerOpen(true)
  }, [clearCloseTimer])

  const closeDrawer = useCallback(() => {
    if (!drawerOpen || drawerClosing) return
    setDrawerClosing(true)
    closeTimerRef.current = setTimeout(() => {
      setDrawerOpen(false)
      setDrawerClosing(false)
      closeTimerRef.current = null
    }, DRAWER_CLOSE_MS)
  }, [clearCloseTimer, drawerClosing, drawerOpen])

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer])

  return (
    <ProductModalProvider>
      <CartProvider>
        <ToastProvider>
          <div className="min-h-screen overflow-x-clip bg-brand-warm font-sans text-brand-teal">
            <AppSidebar variant="docked" />
            <AppSidebar
              variant="drawer"
              isOpen={drawerOpen}
              isClosing={drawerClosing}
              onClose={closeDrawer}
            />

            <div
              className="app-shell app-main-column flex min-h-screen flex-col"
              data-sidebar-collapsed={collapsed ? 'true' : 'false'}
            >
              <header className="sticky top-0 z-40 border-b border-brand-gold/25 bg-brand-warm/90 backdrop-blur-md lg:hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-xl border border-brand-gold/30 bg-white/70 text-brand-teal transition-all hover:border-brand-gold hover:bg-white"
                    onClick={openDrawer}
                    aria-label="Open navigation menu"
                    aria-expanded={drawerOpen}
                  >
                    <HiOutlineBars3 className="size-6" />
                  </button>
                  <Link to="/" className="shrink-0">
                    <BrandLogo size="md" />
                  </Link>
                  <CartButton className="border-brand-gold/35 hover:border-brand-gold" />
                </div>
              </header>

              <main className="flex-1">
                <AnimatedOutlet />
              </main>
              <Footer />
            </div>

            <ProductModal />
            <CartDrawer />
            <WhatsAppFloat />
          </div>
        </ToastProvider>
      </CartProvider>
    </ProductModalProvider>
  )
}

export function AppShell() {
  return (
    <SidebarProvider>
      <AppShellInner />
    </SidebarProvider>
  )
}
