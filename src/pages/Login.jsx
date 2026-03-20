import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { findUser, findAdmin } from '../utils/authStore'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (message) setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const email = form.email.trim()
    const password = form.password

    if (!email || !password.trim()) {
      setMessage('Email and password are required.')
      return
    }

    if (!isEmail(email)) {
      setMessage('Enter a valid email address.')
      return
    }

    // First check if this is an admin account based on auth.json
    const admin = findAdmin(email, password)
    if (admin) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(
          'otc_current_admin',
          JSON.stringify({ email: admin.email, name: admin.name }),
        )
        window.sessionStorage.removeItem('otc_current_user')
      }
      navigate('/dashboard/admin')
      return
    }

    // Fall back to regular user accounts from auth.json
    const user = findUser(email, password)
    if (user) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(
          'otc_current_user',
          JSON.stringify({ id: user.id, name: user.name, email: user.email }),
        )
        window.sessionStorage.removeItem('otc_current_admin')
      }
      navigate('/dashboard/user')
      return
    }

    setMessage('Invalid email or password.')
  }

  return (
    <div className="otc-page">
      <div className="mx-auto max-w-lg">
        <div className="otc-meta">Welcome back</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Log in to your account</h1>
        <p className="mt-2 text-sm otc-muted">Access dashboards, saved registrations, and settings.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              required
            />
          </label>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 font-medium text-[#1F2933]">
              <input type="checkbox" className="h-4 w-4" />
              Remember me
            </label>
            <div className="flex items-center gap-3">
              <Link to="/signup" className="otc-link">Need an account?</Link>
            </div>
          </div>
          <button type="submit" className="otc-btn otc-btn-primary w-full justify-center px-4 py-3">Log in</button>
        </form>
        {message ? <div className="mt-3 text-sm font-medium text-[#B91C1C]">{message}</div> : null}
      </div>
    </div>
  )
}
