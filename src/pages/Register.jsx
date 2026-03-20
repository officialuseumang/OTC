import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import programs from '../data/programs.json'
import { addUserRegistration } from '../utils/authStore'

const MIN_MESSAGE_LENGTH = 10

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Register() {
  const [searchParams] = useSearchParams()

  const intent = searchParams.get('intent') || 'register'
  const programFromQuery = searchParams.get('program') || ''

  const programOptions = useMemo(() => programs.filter((p) => p.status !== 'past'), [])
  const allowedProgramIds = useMemo(() => new Set(programOptions.map((p) => p.id)), [programOptions])
  const safeProgramFromQuery = allowedProgramIds.has(programFromQuery) ? programFromQuery : ''

  const [values, setValues] = useState({
    name: '',
    email: '',
    programId: safeProgramFromQuery,
    message: '',
  })

  const [touched, setTouched] = useState({})
  const [submitMessage, setSubmitMessage] = useState('')

  const errors = useMemo(() => {
    const next = {}
    const name = values.name.trim()
    const email = values.email.trim()
    const message = values.message.trim()

    if (!name) next.name = 'Name is required.'
    if (!email) next.email = 'Email is required.'
    else if (!isEmail(email)) next.email = 'Enter a valid email address.'

    if (!values.programId) next.programId = 'Select a program.'
    else if (!allowedProgramIds.has(values.programId)) next.programId = 'Select a valid program.'

    if (!message) next.message = 'Message is required.'
    else if (message.length < MIN_MESSAGE_LENGTH) {
      next.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`
    }

    return next
  }, [allowedProgramIds, values])

  const canSubmit = Object.keys(errors).length === 0

  const setField = (name, value) => {
    if (submitMessage) setSubmitMessage('')
    setValues((v) => ({ ...v, [name]: value }))
  }

  const markTouched = (name) => setTouched((t) => ({ ...t, [name]: true }))

  const onSubmit = (e) => {
    e.preventDefault()

    // Ensure all errors show on first submit attempt
    setTouched({ name: true, email: true, programId: true, message: true })

    if (!canSubmit) return

    const payload = {
      intent,
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      programId: values.programId,
      message: values.message.trim(),
      submittedAt: new Date().toISOString(),
    }

    // Requirement: log submitted data to console
    console.log(payload)

    // Attach this registration to the existing signed-up user (stored in sessionStorage), if present
    addUserRegistration(payload)

    setValues({ name: '', email: '', programId: values.programId, message: '' })
    setSubmitMessage('Registration submitted successfully.')
  }

  return (
    <div className="otc-page max-w-3xl">
      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {intent === 'inquire' ? 'Ask about a chapter' : 'Register for a chapter'}
      </h1>
      <p className="mt-3 text-pretty otc-body">
        Provide your details and a short message. We will respond with the next steps.
      </p>
      <div className="mt-3 text-sm">
        Prefer to manage your registrations? <Link className="otc-link" to="/dashboard/user">Go to your dashboard</Link>.
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-6 otc-surface p-6 sm:p-8">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => markTouched('name')}
            className="otc-input"
            placeholder="Full name"
            required
          />
          {touched.name && errors.name ? (
            <div className="text-sm otc-error">{errors.name}</div>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => markTouched('email')}
            className="otc-input"
            placeholder="name@domain.com"
            required
          />
          {touched.email && errors.email ? (
            <div className="text-sm otc-error">{errors.email}</div>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="programId">
            Program
          </label>
          <select
            id="programId"
            value={values.programId}
            onChange={(e) => setField('programId', e.target.value)}
            onBlur={() => markTouched('programId')}
            className="otc-input"
            required
          >
            <option value="">Select a program…</option>
            {programOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.status})
              </option>
            ))}
          </select>
          {touched.programId && errors.programId ? (
            <div className="text-sm otc-error">{errors.programId}</div>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => markTouched('message')}
            rows={5}
            className="otc-input"
            placeholder="Message"
            required
          />
          {touched.message && errors.message ? (
            <div className="text-sm otc-error">{errors.message}</div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm otc-muted">
            {canSubmit ? 'Ready to submit.' : 'Please complete all required fields.'}
          </div>
          <button
            type="submit"
            disabled={!canSubmit}
            className={
              'otc-btn px-5 py-3 ' + (canSubmit ? 'otc-btn-primary' : 'otc-btn-disabled')
            }
          >
            Submit
          </button>
        </div>
        {submitMessage ? <div className="text-sm font-medium text-[#1E3A8A]">{submitMessage}</div> : null}
      </form>
    </div>
  )
}
