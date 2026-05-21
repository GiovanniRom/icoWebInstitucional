import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '../LanguageToggle'
import logoFesUrl from '../../assets/images/header/fes.png'
import logoPowerUrl from '../../assets/images/header/powericon.png'
import './Header.css'

const navItems = [
  { to: '/', labelKey: 'nav.inicio', end: true },
  { to: '/programa-academico', labelKey: 'nav.programaAcademico' },
  { to: '/soy-alumno', labelKey: 'nav.soyAlumno' },
  { to: '/soy-profesor', labelKey: 'nav.soyProfesor' },
  { to: '/soy-egresado', labelKey: 'nav.soyEgresado' },
] as const

const MOBILE_BREAKPOINT = 1300

export function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((open) => !open)

  return (
    <header
      className={`site-header${menuOpen ? ' site-header--menu-open' : ''}`}
    >
      <div className="site-header__bar">
        <div className="site-header__brand">
          <NavLink to="/" className="site-header__logo" onClick={closeMenu}>
            <span className="site-header__logos">
              <img
                src={logoFesUrl}
                alt={t('nav.logoFesAlt')}
                className="site-header__logo-img site-header__logo-img--fes"
              />
              <span className="site-header__program">
                <img
                  src={logoPowerUrl}
                  alt={t('nav.logoPowerAlt')}
                  className="site-header__logo-img site-header__logo-img--power"
                />
                <span className="site-header__program-title">
                  <span className="site-header__program-col">
                    {t('nav.programTitleLine1')}
                  </span>
                  <span className="site-header__program-col">
                    {t('nav.programTitleLine2')}
                  </span>
                </span>
              </span>
            </span>
          </NavLink>
        </div>

        <div className="site-header__actions">
          <LanguageToggle />
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            onClick={toggleMenu}
          >
            <span className="site-header__menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        className="site-header__backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={closeMenu}
      />

      <nav
        id="main-navigation"
        className="site-header__nav"
        aria-label={t('nav.mainNavigation')}
      >
        <ul className="site-header__list">
          {navItems.map(({ to, labelKey, ...rest }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={'end' in rest ? rest.end : false}
                className={({ isActive }) =>
                  isActive
                    ? 'site-header__link site-header__link--active'
                    : 'site-header__link'
                }
                onClick={closeMenu}
              >
                {t(labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
