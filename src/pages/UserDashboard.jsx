import { useState } from 'react'

const MIN_PASSWORD_LENGTH = 8

const seedRegistered = [
  { id: 'r-1', title: 'Frontend Chapter', date: '2026-03-10', status: 'Awaiting kickoff' },
  { id: 'r-2', title: 'Data Viz Sprint', date: '2026-04-05', status: 'Confirmed' },
]

const seedCompleted = [
  { id: 'c-1', title: 'APIs in Practice', completedOn: '2025-12-14' },
]

export default function UserDashboard() {
  const [registered, setRegistered] = useState(seedRegistered)
  const [completed, setCompleted] = useState(seedCompleted)
  const [profile, setProfile] = useState({ username: 'otc_member', password: '' })
  const [profileErrors, setProfileErrors] = useState({})
  const [message, setMessage] = useState('')

  function markComplete(id) {
    const event = registered.find((item) => item.id === id)
    if (!event) return
    setRegistered((prev) => prev.filter((item) => item.id !== id))
    setCompleted((prev) => [
      { id: `c-${Date.now()}`, title: event.title, completedOn: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
  }

  function handleProfileSubmit(event) {
    event.preventDefault()

    const username = profile.username.trim()
    const password = profile.password
    const nextErrors = {}

    if (!username) {
      nextErrors.username = 'Username is required.'
    } else if (username.length < 3) {
      nextErrors.username = 'Username must be at least 3 characters.'
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.'
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    }

    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors)
      setMessage('')
      return
    }

    setProfileErrors({})
    setMessage('Profile updated locally. Connect backend to persist changes.')
    setProfile((prev) => ({ ...prev, username, password: '' }))
  }

  return (
    <div className="otc-page">
      <header className="max-w-3xl">
        <div className="otc-meta">User dashboard</div>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Track your chapters and keep your profile current
        </h1>
        <p className="mt-3 text-lg otc-body">
          See what you are registered for, what you have finished, and update your account details.
          Everything here is client-side until authentication is wired up.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="otc-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="otc-meta">Registered events</div>
              <p className="text-sm otc-muted">Move items to completed when you wrap them.</p>
            </div>
            <span className="rounded-[2px] bg-[#E5E7EB] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F2933]">
              {registered.length}
            </span>
          </div>
          <div className="mt-4 grid gap-3">
            {registered.map((item) => (
              <div key={item.id} className="otc-surface border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[#1F2933]">{item.title}</div>
                    <div className="text-sm otc-muted">Starts {item.date}</div>
                  </div>
                  <button
                    type="button"
                    className="otc-btn otc-btn-secondary px-3 py-2 text-xs"
                    onClick={() => markComplete(item.id)}
                  >
                    Mark complete
                  </button>
                </div>
                <div className="mt-1 text-sm text-[#1F2933]">{item.status}</div>
              </div>
            ))}
            {registered.length === 0 ? (
              <div className="rounded-[2px] border border-dashed border-[#E5E7EB] p-3 text-sm otc-muted">
                No upcoming registrations yet.
              </div>
            ) : null}
          </div>
        </section>

        <section className="otc-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="otc-meta">Completed events</div>
              <p className="text-sm otc-muted">Proof points you can share on your profile.</p>
            </div>
            <span className="rounded-[2px] bg-[#E5E7EB] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F2933]">
              {completed.length}
            </span>
          </div>
          <div className="mt-4 grid gap-3">
            {completed.map((item) => (
              <div key={item.id} className="otc-surface border p-3">
                <div className="font-semibold text-[#1F2933]">{item.title}</div>
                <div className="mt-1 text-sm otc-muted">Completed on {item.completedOn}</div>
              </div>
            ))}
            {completed.length === 0 ? (
              <div className="rounded-[2px] border border-dashed border-[#E5E7EB] p-3 text-sm otc-muted">
                Completed items will land here.
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <section className="mt-10 otc-surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="otc-meta">Account settings</div>
            <p className="text-sm otc-muted">Update your username and password.</p>
          </div>
        </div>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleProfileSubmit}>
          <label className="block text-sm font-semibold text-[#1F2933]">
            Username
            <input
              type="text"
              className="otc-input mt-1"
              value={profile.username}
              onChange={(e) => {
                if (profileErrors.username) {
                  setProfileErrors((prev) => ({ ...prev, username: undefined }))
                }
                if (message) setMessage('')
                setProfile({ ...profile, username: e.target.value })
              }}
              minLength={3}
              required
            />
            {profileErrors.username ? <div className="mt-1 text-sm otc-error">{profileErrors.username}</div> : null}
          </label>
          <label className="block text-sm font-semibold text-[#1F2933]">
            Password
            <input
              type="password"
              className="otc-input mt-1"
              value={profile.password}
              onChange={(e) => {
                if (profileErrors.password) {
                  setProfileErrors((prev) => ({ ...prev, password: undefined }))
                }
                if (message) setMessage('')
                setProfile({ ...profile, password: e.target.value })
              }}
              placeholder="Update your password"
              minLength={MIN_PASSWORD_LENGTH}
              required
            />
            {profileErrors.password ? <div className="mt-1 text-sm otc-error">{profileErrors.password}</div> : null}
          </label>
          <div className="md:col-span-2 flex items-center justify-between">
            <div className="text-sm otc-muted">Changes save locally until auth is connected.</div>
            <button type="submit" className="otc-btn otc-btn-primary px-4 py-2">Save changes</button>
          </div>
        </form>
        {message ? <div className="mt-3 text-sm font-medium text-[#1E3A8A]">{message}</div> : null}
      </section>
    </div>
  )
}
