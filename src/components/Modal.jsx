import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Minimal, dependency-free modal.
 * - Editorial UI: neutral surfaces, no flashy animation.
 * - Accessibility: role="dialog", aria-modal, Esc to close, initial focus.
 */
export default function Modal({ open, title, onClose, children }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', onKeyDown)

    // prevent background scroll
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // focus close button for keyboard users
    queueMicrotask(() => closeButtonRef.current?.focus())

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-[#1F2933]/35"
        onMouseDown={(e) => {
          // click on backdrop closes; click inside does not
          if (e.target === e.currentTarget) onClose?.()
        }}
      />

      <div className="absolute inset-0 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto w-full max-w-3xl">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="otc-surface"
          >
            <div className="flex items-start justify-between gap-4 border-b p-4 sm:p-5 otc-divider">
              <div>
                <div className="otc-meta">Details</div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => onClose?.()}
                className="otc-btn otc-btn-secondary"
              >
                Close
              </button>
            </div>

            <div className="p-4 sm:p-5">{children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
