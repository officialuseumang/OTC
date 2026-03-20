import { useMemo } from 'react'
import Reveal from '../components/Reveal'
import MentorCard from '../components/MentorCard'
import mentors from '../data/mentors.json'
import programs from '../data/programs.json'

export default function Mentors() {
  const programsById = useMemo(() => Object.fromEntries(programs.map((p) => [p.id, p])), [])

  return (
    <div className="otc-page">
      <div className="max-w-3xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Mentors</h1>
        <p className="mt-3 text-pretty otc-body">
          We don’t optimize for prestige—we optimize for presence. Mentors here are builders who care about your next step.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {mentors.map((m) => (
          <Reveal key={m.id}>
            <MentorCard mentor={m} programsById={programsById} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
