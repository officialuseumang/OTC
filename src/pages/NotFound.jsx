import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="otc-page max-w-3xl">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 otc-body">That path doesn’t exist. Want to continue from the beginning?</p>
      <div className="mt-6">
        <Link to="/" className="text-sm otc-link">
          Back home →
        </Link>
      </div>
    </div>
  )
}
