import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  HiOutlineBuildingStorefront,
  HiOutlineChevronDoubleLeft,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { BrandLogo } from '../common/BrandLogo'
import { navItems } from '../../data/navigation'
import { brandLogoFavicon } from '../../data/productImages'
import { contactInfo } from '../../data/contact'
import { useSidebar } from '../../context/SidebarContext'
import { gradientGold } from '../../styles/colors'
import { CartButton } from '../cart/CartButton'
import { getSidebarNavIcon, MobileNavItem, type MegaMenuId } from './DesktopNav'
import { ProductsMegaMenu } from './mega-menu/ProductsMegaMenu'
import { WellnessMegaMenu } from './mega-menu/WellnessMegaMenu'

type AppSidebarProps = {
  variant: 'docked' | 'drawer'
  isOpen?: boolean
  isClosing?: boolean
  onClose?: () => void
}

function SidebarMegaFlyout({
  menuId,
  onClose,
}: {
  menuId: MegaMenuId
  onClose: () => void
}) {
  return (
    <div className="sidebar-collapsed-flyout">
      {menuId === 'products' ? (
        <ProductsMegaMenu onNavigate={onClose} />
      ) : (
        <WellnessMegaMenu onNavigate={onClose} />
      )}
    </div>
  )
}

function DockedSidebarNav({
  iconOnly,
  megaExpanded,
  onMegaToggle,
  collapsedFlyout,
  onFlyoutChange,
}: {
  iconOnly: boolean
  megaExpanded: MegaMenuId | null
  onMegaToggle: (id: MegaMenuId) => void
  collapsedFlyout: MegaMenuId | null
  onFlyoutChange: (id: MegaMenuId | null) => void
}) {
  const location = useLocation()

  if (iconOnly) {
    return (
      <nav className="sidebar-nav sidebar-nav--icons relative z-10 flex min-h-0 flex-col items-center justify-center gap-3 overflow-y-auto px-2 py-3">
        {navItems.map((item) => {
          const Icon = getSidebarNavIcon(item)

          if (item.type === 'link') {
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                title={item.label}
                aria-label={item.label}
                className={`sidebar-rail-btn ${isActive ? 'sidebar-rail-btn--active' : ''}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </NavLink>
            )
          }

          const menuId = item.type
          const isOpen = collapsedFlyout === menuId

          return (
            <button
              key={menuId}
              type="button"
              title={item.label}
              aria-label={item.label}
              aria-expanded={isOpen}
              className={`sidebar-rail-btn ${isOpen ? 'sidebar-rail-btn--active' : ''}`}
              onClick={() => onFlyoutChange(isOpen ? null : menuId)}
            >
              <Icon className="size-5" aria-hidden="true" />
            </button>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="sidebar-nav sidebar-nav--expanded relative z-10 flex min-h-0 flex-col gap-1 overflow-y-auto px-3 py-5">
      <p className="sidebar-section-label mb-2 px-3 text-[10px] font-bold tracking-[0.2em] text-brand-teal/45 uppercase">
        Explore
      </p>
      {navItems.map((item, index) => (
        <MobileNavItem
          key={item.type === 'link' ? item.to : item.type}
          item={item}
          expanded={megaExpanded}
          onToggle={onMegaToggle}
          onClose={() => {}}
          linkClassName={(isActive) =>
            `app-sidebar-link group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-brand-gold/20 text-brand-teal shadow-sm'
                : 'text-brand-teal/75 hover:bg-brand-gold/10 hover:text-brand-teal'
            }`
          }
          subLinkClassName="block rounded-lg px-2 py-1.5 text-xs text-brand-teal/70 transition-colors hover:bg-brand-gold/10 hover:text-brand-teal"
          sectionTitleClassName="text-[10px] font-bold tracking-[0.16em] text-brand-teal/45 uppercase"
          animationDelay={60 + index * 45}
        />
      ))}
    </nav>
  )
}

function DockedSidebar() {
  const { collapsed, toggleCollapsed } = useSidebar()
  const location = useLocation()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [megaExpanded, setMegaExpanded] = useState<MegaMenuId | null>(null)
  const [collapsedFlyout, setCollapsedFlyout] = useState<MegaMenuId | null>(null)

  useEffect(() => {
    setMegaExpanded(null)
    setCollapsedFlyout(null)
  }, [location.pathname])

  useEffect(() => {
    if (!collapsed) setCollapsedFlyout(null)
    else setMegaExpanded(null)
  }, [collapsed])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!sidebarRef.current?.contains(event.target as Node)) {
        setCollapsedFlyout(null)
      }
    }
    if (collapsed && collapsedFlyout) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [collapsed, collapsedFlyout])

  return (
    <div ref={sidebarRef} className="sidebar-docked-wrap hidden lg:block">
      <aside
        className={`app-sidebar-docked ${collapsed ? 'app-sidebar-docked--collapsed' : ''}`}
        aria-label="Site navigation"
        data-collapsed={collapsed ? 'true' : 'false'}
      >
        <div className="app-sidebar-glow pointer-events-none absolute inset-0" aria-hidden="true" />

        <button
          type="button"
          onClick={toggleCollapsed}
          className="sidebar-collapse-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand menu' : 'Collapse menu'}
        >
          <HiOutlineChevronDoubleLeft
            className={`size-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <div
          className={`relative z-10 border-b border-brand-teal/10 ${
            collapsed ? 'flex flex-col items-center gap-3 px-2 py-4' : 'flex items-center justify-between gap-2 px-5 py-4'
          }`}
        >
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-[1.02]"
            title="Polisupport Home"
          >
            {collapsed ? (
              <img src={brandLogoFavicon} alt="Polisupport" className="size-9 object-contain" />
            ) : (
              <BrandLogo size="sm" />
            )}
          </Link>
          {!collapsed && <CartButton className="border-brand-gold/35 hover:border-brand-gold" />}
        </div>

        <DockedSidebarNav
          iconOnly={collapsed}
          megaExpanded={megaExpanded}
          onMegaToggle={(id) => setMegaExpanded((current) => (current === id ? null : id))}
          collapsedFlyout={collapsedFlyout}
          onFlyoutChange={setCollapsedFlyout}
        />

        <div className={`relative z-10 border-t border-brand-teal/10 ${collapsed ? 'flex flex-col items-center gap-2 p-2' : 'p-4'}`}>
          {collapsed ? (
            <>
              <CartButton className="border-brand-gold/35 hover:border-brand-gold" />
              <Link
                to="/shop"
                title="Shop now"
                aria-label="Shop now"
                className="sidebar-rail-btn sidebar-rail-btn--cta"
                style={{ background: gradientGold }}
              >
                <HiOutlineBuildingStorefront className="size-5 text-brand-charcoal" aria-hidden="true" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/shop"
                className="app-sidebar-cta flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-brand-teal shadow-md transition-transform hover:scale-[1.02]"
                style={{ background: gradientGold }}
              >
                Shop now
              </Link>
              <p className="sidebar-footer-note mt-3 text-center text-[10px] text-brand-teal/45">{contactInfo.hours}</p>
            </>
          )}
        </div>
      </aside>

      {collapsed && collapsedFlyout && (
        <SidebarMegaFlyout menuId={collapsedFlyout} onClose={() => setCollapsedFlyout(null)} />
      )}
    </div>
  )
}

function DrawerSidebarNav({
  megaExpanded,
  onMegaToggle,
  onNavigate,
}: {
  megaExpanded: MegaMenuId | null
  onMegaToggle: (id: MegaMenuId) => void
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
      <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.2em] text-brand-teal/45 uppercase">Explore</p>
      {navItems.map((item, index) => (
        <MobileNavItem
          key={item.type === 'link' ? item.to : item.type}
          item={item}
          expanded={megaExpanded}
          onToggle={onMegaToggle}
          onClose={onNavigate ?? (() => {})}
          linkClassName={(isActive) =>
            `app-sidebar-link group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-brand-gold/20 text-brand-teal shadow-sm'
                : 'text-brand-teal/75 hover:bg-brand-gold/10 hover:text-brand-teal'
            }`
          }
          subLinkClassName="block rounded-lg px-2 py-1.5 text-xs text-brand-teal/70 transition-colors hover:bg-brand-gold/10 hover:text-brand-teal"
          sectionTitleClassName="text-[10px] font-bold tracking-[0.16em] text-brand-teal/45 uppercase"
          animationDelay={60 + index * 45}
        />
      ))}
    </nav>
  )
}

export function AppSidebar({ variant, isOpen = false, isClosing = false, onClose }: AppSidebarProps) {
  const panelRef = useRef<HTMLElement>(null)
  const animationState = isClosing ? 'closing' : 'open'
  const [megaExpanded, setMegaExpanded] = useState<MegaMenuId | null>(null)

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
    if (!isOpen) setMegaExpanded(null)
  }, [isOpen, variant])

  if (variant === 'docked') {
    return <DockedSidebar />
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
        <DrawerSidebarNav
          megaExpanded={megaExpanded}
          onMegaToggle={(id) => setMegaExpanded((current) => (current === id ? null : id))}
          onNavigate={onClose}
        />
        <div className="border-t border-brand-teal/10 p-4">
          <Link
            to="/shop"
            onClick={onClose}
            className="app-sidebar-cta flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-brand-teal shadow-md transition-transform hover:scale-[1.02]"
            style={{ background: gradientGold }}
          >
            Shop now
          </Link>
          <p className="mt-3 text-center text-[10px] text-brand-teal/45">{contactInfo.hours}</p>
        </div>
      </aside>
    </div>
  )
}
