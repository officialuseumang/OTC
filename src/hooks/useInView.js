import { useState } from 'react'

function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

/**
 * Small IntersectionObserver hook for gentle reveal animations.
 * - No external deps (keeps the stack minimal)
 * - Respects reduced motion by falling back to always-visible
 */
export function useInView(options = {}) {
  const [prefersReducedMotion] = useState(getPrefersReducedMotion)
  const [isInView, setIsInView] = useState(prefersReducedMotion)

  const refCallback = (node) => {
    if (!node) return
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15, ...options },
    )

    observer.observe(node)
  }

  return { ref: refCallback, isInView }
}
