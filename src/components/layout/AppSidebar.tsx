import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineXMark } from 'react-icons/hi2'
import { BrandLogo } from '../common/BrandLogo'
import { siteNavLinks } from '../../data/navigation'
import { contactInfo } from '../../data/contact'
import { gradientGold } from '../../styles/colors'

type AppSidebarProps = {
  variant: 'docked' | 'drawer'
  isOpen?: boolean
  isClosing?: boolean
  onClose?: () => void
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()

  return (
    <>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.2em] text-brand-teal/45 uppercase">
          Explore
        </p>
        {siteNavLinks.map((link, index) => {
          const isActive = location.hash === link.href.replace('/', '') || (link.href === '/#about' && location.pathname === '/' && !location.hash)

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`app-sidebar-link group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-brand-gold/20 text-brand-teal shadow-sm'
                  : 'text-brand-teal/75 hover:bg-brand-gold/10 hover:text-brand-teal'
              }`}
              style={{ animationDelay: `${60 + index * 45}ms` }}
            >
              <span
                className={`absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full transition-all duration-300 ${
                  isActive ? 'bg-brand-gold-dark opacity-100' : 'bg-brand-sea opacity-0 group-hover:opacity-50'
                }`}
                aria-hidden="true"
              />
              <span className="relative pl-1">{link.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="border-t border-brand-teal/10 p-4">
        <a
          href="/#contact"
          onClick={onNavigate}
          className="app-sidebar-cta flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-brand-teal shadow-md transition-transform hover:scale-[1.02]"
          style={{ background: gradientGold }}
        >
          Contact us
        </a>
        <p className="mt-3 text-center text-[10px] text-brand-teal/45">
          {contactInfo.hours}
        </p>
      </div>
    </>
  )
}

export function AppSidebar({ variant, isOpen = false, isClosing = false, onClose }: AppSidebarProps) {
  const panelRef = useRef<HTMLElement>(null)
  const animationState = isClosing ? 'closing' : 'open'

  useEffect(() => {
    if (variant !== 'drawer' || (!isOpen && !isClosing)) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isClosing, isOpen, variant])

  useEffect(() => {
    if (variant !== 'drawer' || !isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, variant])

  useEffect(() => {
    if (variant === 'drawer' && isOpen && panelRef.current) {
      panelRef.current.focus()
    }
  }, [isOpen, variant])

  if (variant === 'docked') {
    return (
      <aside
        className="app-sidebar-docked fixed top-0 left-0 z-50 hidden h-screen w-[var(--sidebar-width)] flex-col border-r border-brand-gold-dark/20 lg:flex"
        aria-label="Site navigation"
      >
        <div className="app-sidebar-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative flex items-center border-b border-brand-teal/10 px-5 py-5">
          <Link to="/" className="transition-transform duration-300 hover:scale-[1.02]">
            <BrandLogo size="md" />
          </Link>
        </div>
        <SidebarNav />
      </aside>
    )
  }

  if (!isOpen && !isClosing) return null

  return (
    <div className="fixed inset-0 z-[120] lg:hidden" role="presentation">
      <button
        type="button"
        className={`absolute inset-0 bg-brand-teal/50 backdrop-blur-sm ${
          animationState === 'closing' ? 'nav-sidebar-backdrop-out' : 'nav-sidebar-backdrop-in'
        }`}
        onClick={onClose}
        aria-label="Close navigation menu"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        className={`app-sidebar-drawer absolute top-0 left-0 flex h-full w-[min(88vw,300px)] flex-col shadow-[8px_0_40px_-8px_rgba(0,0,0,0.25)] ${
          animationState === 'closing' ? 'nav-sidebar-panel-out' : 'nav-sidebar-panel-in'
        }`}
      >
        <div className="app-sidebar-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-3 border-b border-brand-teal/10 px-5 py-4">
          <Link to="/" onClick={onClose} className="shrink-0">
            <BrandLogo size="sm" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full border border-brand-teal/15 text-brand-teal transition-colors hover:bg-white/60"
            aria-label="Close menu"
          >
            <HiOutlineXMark className="size-5" />
          </button>
        </div>
        <SidebarNav onNavigate={onClose} />
      </aside>
    </div>
  )
}
