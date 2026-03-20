import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

export default function MentorCard({ mentor, programsById }) {
  const [open, setOpen] = useState(false)
  const programs = (mentor.programs || []).map((id) => programsById[id]).filter(Boolean)

  return (
    <>
      <article className="otc-surface p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <img
            src={mentor.photo}
            alt={mentor.name}
            className="h-14 w-14 rounded-[2px] border object-cover otc-divider"
            loading="lazy"
          />

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight">{mentor.name}</h3>
            <p className="mt-1 text-sm otc-muted">
              {Array.isArray(mentor.expertise) ? mentor.expertise.join(' • ') : mentor.expertise}
            </p>
          </div>
        </div>

        <p className="mt-4 text-pretty text-sm sm:text-base otc-body">{mentor.bio}</p>

        <div className="mt-5">
          <div className="otc-meta">Programs contributed to</div>
          {programs.length ? (
            <ul className="mt-2 grid gap-1">
              {programs.map((p) => (
                <li key={p.id}>
                  <Link to={`/programs/${p.id}`} className="text-sm otc-link">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-2 text-sm otc-muted">—</div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setOpen(true)} className="otc-btn otc-btn-secondary">
            View details
          </button>

          <Link to="/programs" className="text-sm otc-link">
            Programs →
          </Link>
        </div>
      </article>

      <Modal open={open} title={mentor.name} onClose={() => setOpen(false)}>
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <img
              src={mentor.photo}
              alt={mentor.name}
              className="h-16 w-16 rounded-[2px] border object-cover otc-divider"
              loading="lazy"
            />
            <div>
              <div className="text-sm otc-body">
                {Array.isArray(mentor.expertise) ? mentor.expertise.join(' • ') : mentor.expertise}
              </div>
              <p className="mt-3 text-pretty otc-body">{mentor.bio}</p>
            </div>
          </div>

          <div className="border-t pt-4 otc-divider">
            <div className="otc-meta">Programs contributed to</div>
            <div className="mt-3 grid gap-2">
              {programs.length ? (
                programs.map((p) => (
                  <Link
                    key={p.id}
                    to={`/programs/${p.id}`}
                    onClick={() => setOpen(false)}
                    className="text-sm otc-link"
                  >
                    {p.title}
                  </Link>
                ))
              ) : (
                <div className="text-sm otc-muted">—</div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
