import { useInView } from '../hooks/useInView'

/**
 * StorySection is a reusable “chapter” block.
 * Copy and structure are passed in from JSON so pages stay data-driven.
 */
export default function StorySection({ id, title, lead, body, children }) {
  const { ref, isInView } = useInView()

  return (
    <section id={id} className="scroll-mt-24">
      <div className="otc-container">
        <div
          ref={ref}
          className={
            "border-t py-10 sm:py-14 otc-divider " + (isInView ? 'animate-otc-fade-up' : 'opacity-0')
          }
        >
          <div className="grid gap-4 sm:gap-5">
            <h2 className="otc-h2">{title}</h2>

            {lead ? (
              <p className="text-pretty text-lg otc-body">{lead}</p>
            ) : null}

            {Array.isArray(body) ? (
              <div className="grid gap-3">
                {body.map((p, idx) => (
                  <p key={idx} className="text-pretty otc-body">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}

            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
