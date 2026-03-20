import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function ProgramCard({ program, mentorsById }) {
  const [open, setOpen] = useState(false)

  const mentors = (program.mentors || []).map((id) => mentorsById[id]).filter(Boolean)

  const primaryLabel =
    program.status === 'past'
      ? 'Continue the Journey'
      : program.status === 'upcoming'
        ? 'Join This Chapter'
        : 'Continue the Journey'

  const keySkills = Array.isArray(program.skills) ? program.skills.slice(0, 3) : []

  return (
    <>
      <article className="otc-surface overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {program.image ? (
            <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
              <img
                src={program.image}
                alt={program.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          <div className="flex-1 p-6 sm:p-7">
            <div className="grid gap-1">
              <div className="otc-meta">
                {program.status} · {formatDate(program.startDate)} → {formatDate(program.endDate)}
              </div>
              <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                <Link to={`/programs/${program.id}`} className="otc-link">
                  {program.title}
                </Link>
              </h3>
              {program.tagline ? <p className="mt-1 text-sm otc-muted">{program.tagline}</p> : null}
            </div>

            <p className="mt-4 text-pretty text-sm sm:text-base otc-body">{program.description}</p>

            {keySkills.length ? (
              <div className="mt-4">
                <div className="otc-meta">Key skills</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {keySkills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-[2px] bg-[#F3F4F6] px-2.5 py-1 text-xs font-medium otc-body"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <dl className="mt-5 grid gap-3 text-sm otc-body sm:grid-cols-3">
              <div>
                <dt className="otc-meta">Timeline</dt>
                <dd className="mt-1">
                  {formatDate(program.startDate)} → {formatDate(program.endDate)}
                </dd>
              </div>
              <div>
                <dt className="otc-meta">Mentors</dt>
                <dd className="mt-1">
                  {mentors.length ? mentors.map((m) => m.name).join(', ') : '—'}
                </dd>
              </div>
              <div>
                <dt className="otc-meta">Format</dt>
                <dd className="mt-1">{program.location || '—'}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="otc-btn otc-btn-secondary"
                >
                  Quick view
                </button>

                <Link
                  to={`/programs/${program.id}`}
                  className="otc-btn otc-btn-primary"
                >
                  {primaryLabel}
                </Link>
              </div>

              <Link
                to={`/register?program=${encodeURIComponent(program.id)}&intent=${program.status === 'past' ? 'inquire' : 'register'}`}
                className="text-sm otc-link"
              >
                {program.status === 'past' ? 'Inquire' : 'Register'}
              </Link>
            </div>
          </div>
        </div>
      </article>
      

      <Modal open={open} title={program.title} onClose={() => setOpen(false)}>
        <div className="grid gap-6">
          {program.tagline ? (
            <p className="text-pretty otc-body">{program.tagline}</p>
          ) : null}

          <dl className="grid gap-3 border-y py-4 text-sm otc-body sm:grid-cols-3 otc-divider">
            <div>
              <dt className="otc-meta">Timeline</dt>
              <dd className="mt-1">
                {formatDate(program.startDate)} → {formatDate(program.endDate)}
              </dd>
            </div>
            <div>
              <dt className="otc-meta">Format</dt>
              <dd className="mt-1">{program.location || '—'}</dd>
            </div>
            <div>
              <dt className="otc-meta">Status</dt>
              <dd className="mt-1 capitalize">{program.status}</dd>
            </div>
          </dl>

          <div>
            <div className="otc-meta">Overview</div>
            <p className="mt-2 text-pretty otc-body">{program.description}</p>
          </div>

          {Array.isArray(program.experience) && program.experience.length ? (
            <div>
              <div className="otc-meta">Experience</div>
              <ul className="mt-3 grid gap-2 otc-body">
                {program.experience.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7280]" />
                    <span className="text-pretty">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {Array.isArray(program.skills) && program.skills.length ? (
              <div>
                <div className="otc-meta">Skills</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {program.skills.map((s) => (
                    <span key={s} className="otc-surface rounded-[2px] px-3 py-1 text-xs font-medium otc-body">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {Array.isArray(program.outcomes) && program.outcomes.length ? (
              <div>
                <div className="otc-meta">Outcomes</div>
                <ul className="mt-3 grid gap-2 otc-body">
                  {program.outcomes.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7280]" />
                      <span className="text-pretty">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div>
            <div className="otc-meta">Mentors</div>
            <div className="mt-2 text-sm otc-body">
              {mentors.length ? mentors.map((m) => m.name).join(', ') : '—'}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to={`/programs/${program.id}`}
              className="otc-btn otc-btn-secondary"
              onClick={() => setOpen(false)}
            >
              Open full page
            </Link>
            <Link
              to={`/register?program=${encodeURIComponent(program.id)}&intent=${program.status === 'past' ? 'inquire' : 'register'}`}
              className="otc-btn otc-btn-primary"
              onClick={() => setOpen(false)}
            >
              {program.status === 'past' ? 'Inquire' : 'Register'}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  )
}
