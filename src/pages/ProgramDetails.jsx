import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import programs from '../data/programs.json'
import mentors from '../data/mentors.json'

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

export default function ProgramDetails() {
  const { programId } = useParams()

  const program = useMemo(() => programs.find((p) => p.id === programId), [programId])
  const mentorsById = useMemo(() => Object.fromEntries(mentors.map((m) => [m.id, m])), [])

  if (!program) {
    return (
      <div className="otc-page">
        <h1 className="text-2xl font-semibold">Chapter not found</h1>
        <p className="mt-2 otc-body">That program doesn’t exist (or the link is outdated).</p>
        <div className="mt-6">
          <Link to="/programs" className="text-sm otc-link">
            Back to programs →
          </Link>
        </div>
      </div>
    )
  }

  const spotlightMentors = (program.mentors || []).map((id) => mentorsById[id]).filter(Boolean)

  return (
    <div className="otc-page">
      <div className="max-w-3xl">
        <Link to="/programs" className="text-sm otc-link">
          ← Back to programs
        </Link>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {program.title}
        </h1>
        {program.tagline ? (
          <p className="mt-2 text-pretty text-lg otc-body">{program.tagline}</p>
        ) : null}

        <dl className="mt-6 grid gap-2 border-y py-4 text-sm otc-body sm:grid-cols-3 otc-divider">
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

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to={`/register?program=${encodeURIComponent(program.id)}&intent=inquire`}
            className="otc-btn otc-btn-secondary px-5 py-3"
          >
            Inquire
          </Link>
          <Link
            to={`/register?program=${encodeURIComponent(program.id)}&intent=register`}
            className="otc-btn otc-btn-primary px-5 py-3"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Chapter layout */}
      <div className="mt-10 grid gap-6">
        <section className="border-t pt-8 otc-divider">
          <div className="otc-meta">Introduction</div>
          <p className="mt-3 text-pretty otc-body">{program.description}</p>
        </section>

        <section className="border-t pt-8 otc-divider">
          <div className="otc-meta">What participants will experience</div>
          <ul className="mt-4 grid gap-2 otc-body">
            {(program.experience || []).map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7280]" />
                <span className="text-pretty">{x}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border-t pt-8 otc-divider">
            <div className="otc-meta">Skills</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(program.skills || []).map((s) => (
                <span
                  key={s}
                  className="otc-surface rounded-[2px] px-3 py-1 text-xs font-medium otc-body"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-8 otc-divider">
            <div className="otc-meta">Outcomes</div>
            <ul className="mt-4 grid gap-2 otc-body">
              {(program.outcomes || []).map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7280]" />
                  <span className="text-pretty">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t pt-8 otc-divider">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="otc-meta">Mentor spotlight</div>
              <div className="mt-2 text-sm otc-body">
                Mentors help you keep moving—without taking the wheel away.
              </div>
            </div>
            <Link
              to="/mentors"
              className="text-sm otc-link"
            >
              Meet all mentors →
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {spotlightMentors.map((m) => (
              <div
                key={m.id}
                className="otc-surface flex gap-4 p-4"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-14 w-14 rounded-[2px] border object-cover otc-divider"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="mt-1 text-sm otc-muted">
                    {Array.isArray(m.expertise) ? m.expertise.join(' • ') : m.expertise}
                  </div>
                  <div className="mt-2 text-sm otc-body">{m.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
