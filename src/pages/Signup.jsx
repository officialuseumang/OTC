import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../utils/authStore'

const MIN_PASSWORD_LENGTH = 8

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [message, setMessage] = useState('')

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (message) setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim().toLowerCase()
    const password = form.password
    const confirm = form.confirm

    if (!name || name.length < 2) {
      setMessage('Enter your full name (at least 2 characters).')
      return
    }

    if (!isEmail(email)) {
      setMessage('Enter a valid email address.')
      return
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setMessage(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }

    if (password !== confirm) {
      setMessage('Passwords need to match.')
      return
    }

    try {
      const users = addUser({ name, email, password })
      const createdUser = users.find((u) => u.email === email) || users[users.length - 1]

      if (typeof window !== 'undefined' && createdUser) {
        window.sessionStorage.setItem(
          'otc_current_user',
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
          }),
        )
        window.sessionStorage.removeItem('otc_current_admin')
      }

      navigate('/dashboard/user')
    } catch (error) {
      if (error && error.code === 'USER_EXISTS') {
        setMessage('An account with this email already exists.')
      } else {
        setMessage('Could not create account. Please try again.')
      }
    }
  }

  return (
    <div className="otc-page">
      <div className="mx-auto max-w-lg">
        <div className="otc-meta">Create account</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Join Open Tech Community</h1>
        <p className="mt-2 text-sm otc-muted">Save registrations, access dashboards, and stay in sync.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-[#1F2933]">
            Full name
            <input
              type="text"
              className="otc-input mt-1"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Your name"
              minLength={2}
              required
            />
          </label>
          <label className="block text-sm font-semibold text-[#1F2933]">
            Email
            <input
              type="email"
              className="otc-input mt-1"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="block text-sm font-semibold text-[#1F2933]">
            Password
            <input
              type="password"
              className="otc-input mt-1"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="Create a strong password"
              minLength={MIN_PASSWORD_LENGTH}
              required
            />
          </label>
          <label className="block text-sm font-semibold text-[#1F2933]">
            Confirm password
            <input
              type="password"
              className="otc-input mt-1"
              value={form.confirm}
              onChange={(e) => updateField('confirm', e.target.value)}
              placeholder="Repeat password"
              minLength={MIN_PASSWORD_LENGTH}
              required
            />
          </label>
          <button type="submit" className="otc-btn otc-btn-primary w-full justify-center px-4 py-3">Sign up</button>
        </form>

        <div className="mt-3 text-sm">
          Already have an account? <Link to="/login" className="otc-link">Log in</Link>
        </div>
        {message ? <div className="mt-3 text-sm font-medium text-[#B91C1C]">{message}</div> : null}
      </div>
    </div>
  )
}
