import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { findAdmin } from '../utils/authStore'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function AdminLogin() {
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
      setMessage('Enter a valid admin email address.')
      return
    }

    const admin = findAdmin(email, password)

    if (!admin) {
      setMessage('Invalid admin email or password.')
      return
    }

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(
        'otc_current_admin',
        JSON.stringify({ email: admin.email, name: admin.name }),
      )
      window.sessionStorage.removeItem('otc_current_user')
    }

    setMessage('Signed in as admin.')
    navigate('/dashboard/admin')
  }

  return (
    <div className="otc-page">
      <div className="mx-auto max-w-lg">
        <div className="otc-meta">Admin access</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Log in as admin</h1>
        <p className="mt-2 text-sm otc-muted">Manage programs, mentors, and registrations.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-[#1F2933]">
            Admin email
            <input
              type="email"
              className="otc-input mt-1"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="admin@example.com"
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
          <button type="submit" className="otc-btn otc-btn-primary w-full justify-center px-4 py-3">
            Log in as admin
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between text-sm">
          <Link to="/login" className="otc-link">User login</Link>
          <Link to="/signup" className="otc-link">Create account</Link>
        </div>

        {message ? <div className="mt-3 text-sm font-medium text-[#B91C1C]">{message}</div> : null}
      </div>
    </div>
  )
}
