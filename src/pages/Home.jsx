import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import StoryTimeline from '../components/StoryTimeline'
import ProgramCard from '../components/ProgramCard'
import programs from '../data/programs.json'
import mentors from '../data/mentors.json'
import site from '../data/site.json'

function byStartDate(a, b) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
}

export default function Home() {
  const navigate = useNavigate()

  const mentorsById = useMemo(() => Object.fromEntries(mentors.map((m) => [m.id, m])), [])

  const upcomingPrograms = useMemo(() => {
    return [...programs]
      .filter((p) => p.status === 'upcoming')
      .sort(byStartDate)
  }, [])

  const nextProgram = upcomingPrograms[0]

  const onExploreJourney = () => {
    const el = document.getElementById('our-story')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onJoinNext = () => {
    if (nextProgram) {
      navigate(`/register?program=${encodeURIComponent(nextProgram.id)}&intent=register`)
      return
    }
    navigate('/programs')
  }

  return (
    <div>
      {/* Hero */}
      <section>
        <div className="otc-page">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <div className="otc-meta">{site.hero.eyebrow}</div>

              <h1 className="mt-4 otc-h1 otc-hero-title-gradient uppercase">{site.communityName}</h1>
              <p className="mt-4 text-pretty text-lg sm:text-xl otc-body">
                {site.hero.headline}
              </p>
              <p className="mt-3 max-w-2xl text-pretty otc-body">
                {site.hero.subheadline}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onExploreJourney}
                  className="otc-btn otc-btn-primary px-5 py-3"
                >
                  {site.hero.primaryCta.label}
                </button>

                <button
                  type="button"
                  onClick={onJoinNext}
                  className="otc-btn otc-btn-secondary px-5 py-3"
                >
                  {site.hero.secondaryCta.label}
                </button>

                <Link
                  to="/programs"
                  className="self-center text-sm otc-link"
                >
                  Browse all chapters →
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <aside className="border-l pl-6 otc-divider">
                <div className="otc-meta">Summary</div>

                <dl className="mt-4 grid gap-3 text-sm otc-body">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="otc-muted">Programs</dt>
                    <dd className="font-semibold">{programs.length}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="otc-muted">Mentors</dt>
                    <dd className="font-semibold">{mentors.length}</dd>
                  </div>
                </dl>

                {nextProgram ? (
                  <div className="mt-6 border-t pt-4 otc-divider">
                    <div className="otc-meta">Next program</div>
                    <div className="mt-2 text-sm font-medium">{nextProgram.title}</div>
                    <div className="mt-2">
                      <Link to={`/programs/${nextProgram.id}`} className="text-sm otc-link">
                        View details →
                      </Link>
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative sections (data-driven) */}
      <section className="mt-2">
        <StoryTimeline sections={site.homeSections} />
      </section>

      {/* The Road Ahead: upcoming programs (data-driven) */}
      <section className="mt-10">
        <div className="otc-container">
          <div className="mt-8">
            <h2 className="otc-h2">The road ahead</h2>
            <p className="mt-2 max-w-2xl text-pretty otc-body">
              Upcoming chapters you can join—each one designed to feel supportive, practical, and human.
            </p>

            <div className="mt-6 grid gap-4">
              {upcomingPrograms.slice(0, 2).map((p) => (
                <Reveal key={p.id}>
                  <ProgramCard program={p} mentorsById={mentorsById} />
                </Reveal>
              ))}
            </div>

            <div className="mt-6">
              <Link
                to="/programs"
                className="otc-btn otc-btn-secondary"
              >
                See all programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
