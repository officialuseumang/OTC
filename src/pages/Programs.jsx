import { useMemo } from 'react'
import Reveal from '../components/Reveal'
import ProgramCard from '../components/ProgramCard'
import programs from '../data/programs.json'
import mentors from '../data/mentors.json'
import site from '../data/site.json'

function byStartDate(a, b) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
}

export default function Programs() {
  const mentorsById = useMemo(() => Object.fromEntries(mentors.map((m) => [m.id, m])), [])

  const programsByStatus = useMemo(() => {
    return {
      ongoing: programs.filter((p) => p.status === 'ongoing').sort(byStartDate),
      upcoming: programs.filter((p) => p.status === 'upcoming').sort(byStartDate),
      past: programs.filter((p) => p.status === 'past').sort(byStartDate).reverse(),
    }
  }, [])

  return (
    <div className="otc-page">
      <div className="max-w-3xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Programs</h1>
        <p className="mt-3 text-pretty otc-body">
          Each program is designed as a chapter: a clear beginning, a steady rhythm, and an ending you can be proud of.
        </p>
      </div>

      <div className="mt-10 grid gap-12">
        {site.programGroups.map((g) => {
          const list = programsByStatus[g.id] || []
          return (
            <section key={g.id} className="scroll-mt-24">
              <div className="border-t pt-8 otc-divider">
                <div>
                  <div className="otc-meta">Status</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">{g.title}</h2>
                  <p className="mt-1 otc-body">{g.subtitle}</p>
                </div>
                <div className="mt-4 text-sm otc-muted">
                  {list.length} chapter{list.length === 1 ? '' : 's'}
                </div>

                <div className="mt-6">
                  {list.length ? (
                    <div className="grid gap-4">
                      {list.map((p) => (
                        <Reveal key={p.id}>
                          <ProgramCard program={p} mentorsById={mentorsById} />
                        </Reveal>
                      ))}
                    </div>
                  ) : (
                    <div className="otc-surface p-5 otc-body">
                      Nothing here yet.
                    </div>
                  )}
                </div>

              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
