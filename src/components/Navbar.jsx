import { useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import site from '../data/site.json'
import otcLogo from '../assets/otc.jpg'

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function getSessionAuth() {
  if (typeof window === 'undefined') return null

  const admin = safeParse(window.sessionStorage.getItem('otc_current_admin'))
  if (admin && admin.email) {
    return {
      role: 'admin',
      name: admin.name,
      email: admin.email,
      dashboardPath: '/dashboard/admin',
    }
  }

  const user = safeParse(window.sessionStorage.getItem('otc_current_user'))
  if (user && user.email) {
    return {
      role: 'user',
      name: user.name,
      email: user.email,
      dashboardPath: '/dashboard/user',
    }
  }

  return null
}

function getDisplayName(auth) {
  if (!auth) return ''
  if (auth.name && auth.name.trim()) return auth.name.trim()
  if (auth.email) return auth.email.split('@')[0]
  return 'Member'
}

function getAvatarDataUrl(name) {
  const resolvedName = name && name.trim() ? name.trim() : 'Member'
  const initial = resolvedName.charAt(0).toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="#E5E7EB"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1F2933">${initial}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const auth = getSessionAuth()

  const displayName = useMemo(() => getDisplayName(auth), [auth])
  const avatarSrc = useMemo(() => getAvatarDataUrl(displayName), [displayName])

  function toggleMobileNav() {
    setOpen((v) => {
      const next = !v
      if (!next) setProfileMenuOpen(false)
      return next
    })
  }

  function handleDashboardOpen() {
    if (!auth) return
    setProfileMenuOpen(false)
    setOpen(false)
    navigate(auth.dashboardPath)
  }

  function handleLogout() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('otc_current_user')
      window.sessionStorage.removeItem('otc_current_admin')
    }
    setProfileMenuOpen(false)
    setOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--otc-bg)] otc-divider">
      <div className="otc-container flex items-center justify-between py-3 sm:py-4">
        <NavLink to="/" className="group flex items-center gap-4">
          <img
            src={otcLogo}
            alt={`${site.communityName} logo`}
            className="h-12 w-12 rounded-[2px] border object-cover otc-divider sm:h-[60px] sm:w-[60px]"
          />
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-tight sm:text-lg">
              {site.communityName}
            </div>
            <div className="text-sm otc-muted">{site.brandSubtitle}</div>
          </div>
        </NavLink>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setProfileMenuOpen(false)}
                className={({ isActive }) =>
                  (
                    'rounded-[2px] px-4 py-3 text-base font-medium ' +
                    (isActive
                      ? 'text-[#1F2933] underline decoration-[#1E3A8A] underline-offset-4'
                      : 'text-[#6B7280]')
                  ).trim()
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            {auth ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((v) => !v)}
                  className="otc-btn flex items-center gap-2 border border-transparent bg-transparent px-4 py-3 text-base text-[#1F2933] hover:bg-[#F3F4F6]"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="menu"
                >
                  <img
                    src={avatarSrc}
                    alt={`${displayName} profile`}
                    className="h-7 w-7 rounded-full border border-[#D1D5DB]"
                  />
                  <span className="max-w-28 truncate font-medium text-[#1F2933]">{displayName}</span>
                </button>

                {profileMenuOpen ? (
                  <div className="absolute right-0 mt-2 min-w-[180px] rounded-[2px] border bg-white p-1 shadow-sm otc-divider">
                    <button
                      type="button"
                      onClick={handleDashboardOpen}
                      className="block w-full rounded-[2px] px-3 py-2 text-left text-base text-[#1F2933] hover:bg-[#F3F4F6]"
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-[2px] px-3 py-2 text-left text-base text-[#B91C1C] hover:bg-[#FEF2F2]"
                    >
                      Log out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <NavLink to="/login" className="otc-btn otc-btn-secondary px-5 py-3 text-base">
                Log in
              </NavLink>
            )}
          </div>

          <button
            type="button"
            onClick={toggleMobileNav}
            className="otc-btn otc-btn-secondary px-4 py-2 text-base sm:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t bg-[var(--otc-bg)] sm:hidden otc-divider">
          <div className="otc-container py-4">
            <nav className="grid gap-1">
              {site.nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    setOpen(false)
                    setProfileMenuOpen(false)
                  }}
                  className={({ isActive }) =>
                    (
                      'rounded-[2px] px-4 py-3 text-base font-medium ' +
                      (isActive
                        ? 'text-[#1F2933] underline decoration-[#1E3A8A] underline-offset-4'
                        : 'text-[#6B7280]')
                    ).trim()
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 grid grid-cols-1 gap-2">
              {auth ? (
                <>
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen((v) => !v)}
                    className="otc-btn justify-between border border-transparent bg-transparent px-4 py-3 text-base text-[#1F2933] hover:bg-[#F3F4F6]"
                    aria-expanded={profileMenuOpen}
                    aria-haspopup="menu"
                  >
                    <span className="flex items-center gap-2">
                      <img
                        src={avatarSrc}
                        alt={`${displayName} profile`}
                        className="h-7 w-7 rounded-full border border-[#D1D5DB]"
                      />
                      <span className="max-w-40 truncate font-medium text-[#1F2933]">{displayName}</span>
                    </span>
                    <span className="text-sm text-[#6B7280]">
                      {profileMenuOpen ? 'Hide' : 'Open'}
                    </span>
                  </button>

                  {profileMenuOpen ? (
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={handleDashboardOpen}
                        className="otc-btn otc-btn-secondary justify-center px-4 py-3 text-base"
                      >
                        Dashboard
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="otc-btn otc-btn-secondary justify-center px-4 py-3 text-base text-[#B91C1C]"
                      >
                        Log out
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="otc-btn otc-btn-secondary justify-center px-4 py-3 text-base"
                >
                  Log in
                </NavLink>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
