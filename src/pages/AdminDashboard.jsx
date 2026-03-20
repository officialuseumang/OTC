import { useMemo, useState } from 'react'

function isValidResourceUrl(value) {
  const url = value.trim()
  if (!url) return false
  if (/^https?:\/\/\S+$/i.test(url)) return true
  return /^\/[^\s]+$/.test(url)
}

const seedPrograms = [
  { id: 'p-1', title: 'Frontend Chapter', status: 'ongoing', startDate: '2026-03-10' },
  { id: 'p-2', title: 'Data Viz Sprint', status: 'upcoming', startDate: '2026-04-05' },
]

const seedMentors = [
  { id: 'm-1', name: 'Amina Idris', expertise: 'Product thinking, delivery' },
  { id: 'm-2', name: 'Luis Ortega', expertise: 'Frontend systems, accessibility' },
]

const seedUsers = [
  { id: 'u-1', name: 'Devon Brooks', email: 'devon@example.com', program: 'Frontend Chapter' },
  { id: 'u-2', name: 'Priya Patel', email: 'priya@example.com', program: 'Data Viz Sprint' },
]

const seedPdfs = [
  {
    id: 'pdf-1',
    title: 'Onboarding Pack (PDF)',
    url: '/pdfs/open-tech-onboarding-pack.pdf',
    label: 'Playbook',
  },
]

export default function AdminDashboard() {
  const [programs, setPrograms] = useState(seedPrograms)
  const [mentors, setMentors] = useState(seedMentors)
  const [users] = useState(seedUsers)
  const [pdfs, setPdfs] = useState(seedPdfs)
  const [programForm, setProgramForm] = useState({ title: '', status: 'upcoming', startDate: '' })
  const [mentorForm, setMentorForm] = useState({ name: '', expertise: '' })
  const [pdfForm, setPdfForm] = useState({ title: '', url: '', label: 'Guide' })
  const [programError, setProgramError] = useState('')
  const [mentorError, setMentorError] = useState('')
  const [pdfError, setPdfError] = useState('')

  const stats = useMemo(
    () => ({
      programs: programs.length,
      mentors: mentors.length,
      users: users.length,
      pdfs: pdfs.length,
    }),
    [programs.length, mentors.length, users.length, pdfs.length],
  )

  function handleAddProgram(event) {
    event.preventDefault()
    const title = programForm.title.trim()

    if (!title) {
      setProgramError('Program title is required.')
      return
    }

    const exists = programs.some((p) => p.title.toLowerCase() === title.toLowerCase())
    if (exists) {
      setProgramError('A program with this title already exists.')
      return
    }

    const newProgram = {
      id: `p-${Date.now()}`,
      title,
      status: programForm.status,
      startDate: programForm.startDate || 'TBD',
    }
    setPrograms((prev) => [newProgram, ...prev])
    setProgramForm({ title: '', status: 'upcoming', startDate: '' })
    setProgramError('')
  }

  function handleAddMentor(event) {
    event.preventDefault()
    const name = mentorForm.name.trim()

    if (!name) {
      setMentorError('Mentor name is required.')
      return
    }

    if (name.length < 2) {
      setMentorError('Mentor name must be at least 2 characters.')
      return
    }

    const newMentor = {
      id: `m-${Date.now()}`,
      name,
      expertise: mentorForm.expertise.trim() || 'General mentorship',
    }
    setMentors((prev) => [newMentor, ...prev])
    setMentorForm({ name: '', expertise: '' })
    setMentorError('')
  }

  function handleAddPdf(event) {
    event.preventDefault()
    const title = pdfForm.title.trim()
    const url = pdfForm.url.trim()
    const label = pdfForm.label.trim() || 'Guide'

    if (!title) {
      setPdfError('PDF title is required.')
      return
    }

    if (!url) {
      setPdfError('PDF URL is required.')
      return
    }

    if (!isValidResourceUrl(url)) {
      setPdfError('Enter a valid URL (https://...) or site path (/pdfs/file.pdf).')
      return
    }

    const newPdf = {
      id: `pdf-${Date.now()}`,
      title,
      url,
      label,
    }

    setPdfs((prev) => [newPdf, ...prev])
    setPdfForm({ title: '', url: '', label: 'Guide' })
    setPdfError('')
  }

  return (
    <div className="otc-page">
      <header className="max-w-3xl">
        <div className="otc-meta">Admin dashboard</div>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Operate programs, mentors, and registrations
        </h1>
        <p className="mt-3 text-lg otc-body">
          This view is local-only for now. Add programs, record mentors, and review registered users
          while the real admin backend is in flight.
        </p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Programs', value: stats.programs },
          { label: 'Mentors', value: stats.mentors },
          { label: 'Registered users', value: stats.users },
          { label: 'PDF resources', value: stats.pdfs },
        ].map((stat) => (
          <div key={stat.label} className="otc-surface p-4">
            <div className="otc-meta">{stat.label}</div>
            <div className="mt-2 text-2xl font-semibold text-[#1F2933]">{stat.value}</div>
          </div>
        ))}
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <section className="otc-surface p-5">
          <div className="otc-meta">Add program</div>
          <form className="mt-4 space-y-3" onSubmit={handleAddProgram}>
            <label className="block text-sm font-semibold text-[#1F2933]">
              Title
              <input
                type="text"
                className="otc-input mt-1"
                value={programForm.title}
                onChange={(e) => {
                  if (programError) setProgramError('')
                  setProgramForm({ ...programForm, title: e.target.value })
                }}
                placeholder="e.g., Cloud Foundations"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-[#1F2933]">
              Status
              <select
                className="otc-input mt-1"
                value={programForm.status}
                onChange={(e) => {
                  if (programError) setProgramError('')
                  setProgramForm({ ...programForm, status: e.target.value })
                }}
              >
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-[#1F2933]">
              Start date
              <input
                type="date"
                className="otc-input mt-1"
                value={programForm.startDate}
                onChange={(e) => {
                  if (programError) setProgramError('')
                  setProgramForm({ ...programForm, startDate: e.target.value })
                }}
              />
            </label>
            <div className="flex justify-end">
              <button type="submit" className="otc-btn otc-btn-primary px-4 py-2">Add program</button>
            </div>
            {programError ? <div className="text-sm otc-error">{programError}</div> : null}
          </form>
        </section>

        <section className="otc-surface p-5">
          <div className="otc-meta">Add mentor</div>
          <form className="mt-4 space-y-3" onSubmit={handleAddMentor}>
            <label className="block text-sm font-semibold text-[#1F2933]">
              Name
              <input
                type="text"
                className="otc-input mt-1"
                value={mentorForm.name}
                onChange={(e) => {
                  if (mentorError) setMentorError('')
                  setMentorForm({ ...mentorForm, name: e.target.value })
                }}
                placeholder="Mentor name"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-[#1F2933]">
              Expertise
              <input
                type="text"
                className="otc-input mt-1"
                value={mentorForm.expertise}
                onChange={(e) => {
                  if (mentorError) setMentorError('')
                  setMentorForm({ ...mentorForm, expertise: e.target.value })
                }}
                placeholder="Domains, stacks, or focus"
              />
            </label>
            <div className="flex justify-end">
              <button type="submit" className="otc-btn otc-btn-primary px-4 py-2">Add mentor</button>
            </div>
            {mentorError ? <div className="text-sm otc-error">{mentorError}</div> : null}
          </form>
        </section>

        <section className="otc-surface p-5">
          <div className="otc-meta">Add PDF resource</div>
          <form className="mt-4 space-y-3" onSubmit={handleAddPdf}>
            <label className="block text-sm font-semibold text-[#1F2933]">
              Title
              <input
                type="text"
                className="otc-input mt-1"
                value={pdfForm.title}
                onChange={(e) => {
                  if (pdfError) setPdfError('')
                  setPdfForm({ ...pdfForm, title: e.target.value })
                }}
                placeholder="e.g., Onboarding Pack (PDF)"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-[#1F2933]">
              PDF URL
              <input
                type="text"
                className="otc-input mt-1"
                value={pdfForm.url}
                onChange={(e) => {
                  if (pdfError) setPdfError('')
                  setPdfForm({ ...pdfForm, url: e.target.value })
                }}
                placeholder="/pdfs/guide.pdf or https://…"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-[#1F2933]">
              Label
              <input
                type="text"
                className="otc-input mt-1"
                value={pdfForm.label}
                onChange={(e) => {
                  if (pdfError) setPdfError('')
                  setPdfForm({ ...pdfForm, label: e.target.value })
                }}
                placeholder="Playbook, Workshop, Guide…"
              />
            </label>
            <div className="flex justify-end">
              <button type="submit" className="otc-btn otc-btn-primary px-4 py-2">Add PDF</button>
            </div>
            {pdfError ? <div className="text-sm otc-error">{pdfError}</div> : null}
          </form>
        </section>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="otc-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="otc-meta">Programs</div>
              <p className="text-sm otc-muted">Newest programs appear first.</p>
            </div>
            <span className="rounded-[2px] bg-[#E5E7EB] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F2933]">
              {programs.length}
            </span>
          </div>
          <div className="mt-4 grid gap-3">
            {programs.map((program) => (
              <div key={program.id} className="otc-surface border p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-[#1F2933]">{program.title}</div>
                  <span className="text-xs font-semibold uppercase text-[#1E3A8A]">
                    {program.status}
                  </span>
                </div>
                <div className="mt-1 text-sm otc-muted">Starts {program.startDate}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="otc-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="otc-meta">Mentors</div>
              <p className="text-sm otc-muted">Track who is live for pairing and reviews.</p>
            </div>
            <span className="rounded-[2px] bg-[#E5E7EB] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F2933]">
              {mentors.length}
            </span>
          </div>
          <div className="mt-4 grid gap-3">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="otc-surface border p-3">
                <div className="font-semibold text-[#1F2933]">{mentor.name}</div>
                <div className="mt-1 text-sm otc-muted">{mentor.expertise}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-10 otc-surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="otc-meta">PDF resources</div>
            <p className="text-sm otc-muted">Links that feed the Resources PDF section.</p>
          </div>
          <span className="rounded-[2px] bg-[#E5E7EB] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F2933]">
            {pdfs.length}
          </span>
        </div>
        <div className="mt-4 grid gap-3">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="otc-surface border p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold text-[#1F2933]">{pdf.title}</div>
                <span className="text-xs font-semibold uppercase text-[#1E3A8A]">
                  {pdf.label}
                </span>
              </div>
              <div className="mt-1 truncate text-xs text-[#6B7280]">{pdf.url}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 otc-surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="otc-meta">Registered users</div>
            <p className="text-sm otc-muted">Snapshot of people who signed up for programs.</p>
          </div>
          <span className="rounded-[2px] bg-[#E5E7EB] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F2933]">
            {users.length}
          </span>
        </div>
        <div className="mt-4 overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-[#1F2933]">
                <th className="border-b border-[#E5E7EB] pb-2 pr-3">Name</th>
                <th className="border-b border-[#E5E7EB] pb-2 pr-3">Email</th>
                <th className="border-b border-[#E5E7EB] pb-2 pr-3">Program</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="align-top">
                  <td className="border-b border-[#E5E7EB] py-2 pr-3">{user.name}</td>
                  <td className="border-b border-[#E5E7EB] py-2 pr-3">{user.email}</td>
                  <td className="border-b border-[#E5E7EB] py-2 pr-3">{user.program}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
