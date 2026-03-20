import { useInView } from '../hooks/useInView'

function pad2(value) {
  return String(value).padStart(2, '0')
}

function TimelineItem({ section, index }) {
  const { ref, isInView } = useInView()
  const isRight = index % 2 === 1

  return (
    <div
      id={section.id}
      className={'otc-timeline-item scroll-mt-24 ' + (isRight ? 'is-right' : '')}
    >
      <div
        ref={ref}
        className={
          'border-t py-10 sm:py-14 otc-divider ' + (isInView ? 'animate-otc-fade-up' : 'opacity-0')
        }
      >
        <div className={'otc-timeline-marker ' + (isInView ? 'is-active' : '')} aria-hidden="true" />

        <div className="grid gap-4 sm:gap-5">
          <div className="otc-meta">Step {pad2(index + 1)}</div>
          <h2 className="otc-h2">{section.title}</h2>

          {section.lead ? <p className="text-pretty text-lg otc-body">{section.lead}</p> : null}

          {Array.isArray(section.body) ? (
            <div className="grid gap-3">
              {section.body.map((p, idx) => (
                <p key={idx} className="text-pretty otc-body">
                  {p}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function StoryTimeline({ sections = [] }) {
  const safeSections = Array.isArray(sections) ? sections.filter(Boolean) : []
  if (!safeSections.length) return null

  return (
    <div className="otc-container">
      <div className="otc-timeline">
        {safeSections.map((section, index) => (
          <TimelineItem key={section.id || index} section={section} index={index} />
        ))}
      </div>
    </div>
  )
}
