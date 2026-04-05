import { Link } from 'react-router-dom'
import site from '../data/site.json'

const SOCIAL_ICON_SIZE = 48
const SOCIAL_ICON_GAP = 12

const socialIconMap = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.17-1.12-1.48-1.12-1.48-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.53 2.33 1.08 2.9.83.09-.65.35-1.08.62-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.03a9.49 9.49 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.4.2 2.43.1 2.69.64.7 1.03 1.6 1.03 2.69 0 3.85-2.35 4.7-4.58 4.95.36.3.68.89.68 1.8v2.67c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.35-2.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M6.94 8.33H3.56V20h3.38V8.33Zm.23-3.62A1.96 1.96 0 0 0 5.2 2.75a1.96 1.96 0 0 0 0 3.92 1.97 1.97 0 0 0 1.97-1.96Zm12.27 8.66c0-3.12-1.67-4.57-3.9-4.57-1.8 0-2.6.99-3.04 1.68v-1.44H9.12V20h3.38v-5.78c0-.3.02-.61.11-.82.24-.6.79-1.22 1.72-1.22 1.2 0 1.68.92 1.68 2.27V20H19.4l.04-6.63Z" />
    </svg>
  )
}

function getSocialIcon(label) {
  const normalized = label.toLowerCase()

  if (normalized.includes('github')) return socialIconMap.github
  if (normalized.includes('instagram')) return socialIconMap.instagram
  if (normalized.includes('linkedin')) return socialIconMap.linkedin

  return <span aria-hidden="true" className="text-base font-semibold">{label.slice(0, 1)}</span>
}

export default function Footer() {
  const socialsCount = site.footer.socials.length
  const socialHeadingWidth =
    socialsCount > 0
      ? socialsCount * SOCIAL_ICON_SIZE + (socialsCount - 1) * SOCIAL_ICON_GAP
      : SOCIAL_ICON_SIZE

  return (
    <footer className="mt-20 border-t otc-divider otc-footer font-bold uppercase">
      <div className="otc-container grid gap-10 py-14 sm:py-16 md:grid-cols-3">
        <div>
          <div className="text-2xl tracking-wide">{site.communityName}</div>
          <p className="mt-4 max-w-sm text-lg otc-muted">{site.tagline}</p>
          <p className="mt-5 text-base otc-muted">{site.footer.note}</p>
        </div>

        <div className="grid gap-3">
          <div className="text-base tracking-wide otc-muted">Links</div>
          {site.footer.links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-lg tracking-wide text-[var(--otc-accent)] no-underline hover:opacity-80"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-3">
          <div
            className="text-[2rem] leading-none otc-muted"
            style={{ width: `${socialHeadingWidth}px` }}
            aria-label="Social"
          >
            <span className="flex items-center justify-between" aria-hidden="true">
              {'SOCIAL'.split('').map((letter, idx) => (
                <span key={`${letter}-${idx}`}>{letter}</span>
              ))}
            </span>
          </div>
          <div className="flex items-center" style={{ gap: `${SOCIAL_ICON_GAP}px` }}>
            {site.footer.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex items-center justify-center rounded-full border otc-social-btn text-[var(--otc-accent)] no-underline"
                style={{ width: `${SOCIAL_ICON_SIZE}px`, height: `${SOCIAL_ICON_SIZE}px` }}
              >
                {getSocialIcon(s.label)}
              </a>
            ))}
          </div>
          <p className="text-base tracking-wide otc-muted whitespace-nowrap">
            © 2026 Open Tech Community
          </p>
        </div>
      </div>
    </footer>
  )
}
