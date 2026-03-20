import { useInView } from '../hooks/useInView'

/**
 * Reveal wraps content with a subtle fade-in when it enters the viewport.
 * Editorial constraint: keep motion minimal.
 */
export default function Reveal({ children, className = '' }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={(isInView ? 'animate-otc-fade-up' : 'opacity-0') + ' ' + className}
    >
      {children}
    </div>
  )
}
