import { useMemo } from 'react'

const categories = [
  {
    id: 'starter',
    title: 'Starter playbooks',
    description: 'Short guides to help newcomers ship something real in the first week.',
    items: [
      {
        title: 'First Pull Request',
        description: 'A calm walkthrough for opening an issue, forking, and submitting a PR.',
        href: 'https://opensource.guide/how-to-contribute/',
        type: 'Guide',
      },
      {
        title: 'Small Project Scoping',
        description: 'A three-step template for shrinking a vague idea into a weekend build.',
        href: 'https://basecamp.com/shapeup',
        type: 'Template',
      },
    ],
  },
  {
    id: 'learning',
    title: 'Hands-on learning',
    description: 'Focused resources that pair theory with a build-along.',
    items: [
      {
        title: 'Frontend Roadmap 2026',
        description: 'Current HTML/CSS/JS priorities, trimmed to what gets shipped today.',
        href: 'https://roadmap.sh/frontend',
        type: 'Roadmap',
      },
      {
        title: 'Accessible UI Patterns',
        description: 'ARIA-backed patterns for modals, tabs, and forms you can reuse.',
        href: 'https://www.a11yproject.com/',
        type: 'Patterns',
      },
      {
        title: 'Data for Side Projects',
        description: 'A curated list of open datasets for building dashboards and demos.',
        href: 'https://github.com/awesomedata/awesome-public-datasets',
        type: 'Datasets',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community & delivery',
    description: 'Tools for running events, sprints, and healthy contributor loops.',
    items: [
      {
        title: 'Community Health Files',
        description: 'Issue templates, codes of conduct, and contributor guides you can copy.',
        href: 'https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions',
        type: 'Kit',
      },
      {
        title: 'Retro in 20 Minutes',
        description: 'A time-boxed retro format tuned for volunteer teams.',
        href: 'https://www.atlassian.com/team-playbook/plays/retrospective',
        type: 'Play',
      },
      {
        title: 'Async Standups',
        description: 'Lightweight check-ins that keep momentum without burning time zones.',
        href: 'https://www.loom.com/blog/async-daily-standup',
        type: 'Workflow',
      },
    ],
  },
]

const pdfResources = [
  {
    id: 'onboarding-pack',
    title: 'Open Tech Community Onboarding Pack',
    description: 'A printable starter pack for new participants and mentors, including rituals, expectations, and a first-week checklist.',
    href: '/pdfs/open-tech-onboarding-pack.pdf',
    tag: 'Playbook',
  },
  {
    id: 'chapter-facilitation',
    title: 'Chapter Facilitation Guide',
    description: 'A concise guide for running sessions: timing, roles, and fallback plans when things go sideways.',
    href: '/pdfs/chapter-facilitation-guide.pdf',
    tag: 'Facilitation',
  },
  {
    id: 'retro-kit',
    title: 'Retrospective Kit (Printable)',
    description: 'Printable cards and prompts for running short, reflective retros in small groups.',
    href: '/pdfs/retro-kit-printable.pdf',
    tag: 'Workshop',
  },
]

export default function Resources() {
  const resourceCount = useMemo(
    () =>
      categories.reduce((acc, group) => acc + group.items.length, 0) +
      pdfResources.length,
    [],
  )

  return (
    <div className="otc-page">
      <header className="max-w-3xl">
        <div className="otc-meta">Resources</div>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Curated starting points for builders and organizers
        </h1>
        <p className="mt-3 text-lg otc-body">
          A compact library of guides, playbooks, and datasets we reach for when helping newcomers
          ramp up or when shaping a new chapter. Everything is free to read and remix.
        </p>
        <div className="mt-4 text-sm otc-muted">{resourceCount} resources, updated for 2026.</div>
      </header>

      <div className="mt-10 grid gap-8">
        {categories.map((group) => (
          <section key={group.id} className="grid gap-4">
            <div>
              <div className="otc-meta">{group.title}</div>
              <p className="mt-2 max-w-3xl text-pretty otc-body">{group.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {group.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="otc-surface group block h-full p-5 no-underline transition-colors hover:border-[#1E3A8A]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-[#1F2933] group-hover:underline">
                      {item.title}
                    </div>
                    <span className="rounded-[2px] bg-[#E5E7EB] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F2933]">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#1F2933]">{item.description}</p>
                  <div className="mt-3 text-sm font-medium text-[#1E3A8A]">Open resource →</div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 grid gap-4">
        <div>
          <div className="otc-meta">Downloadable guides (PDF)</div>
          <p className="mt-2 max-w-3xl text-pretty otc-body">
            Printable handouts and facilitation guides you can bring into a room, share with a cohort,
            or keep offline. These are meant to be used, highlighted, and scribbled on.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pdfResources.map((pdf) => (
            <a
              key={pdf.id}
              href={pdf.href}
              target="_blank"
              rel="noreferrer"
              className="otc-surface group block h-full p-5 no-underline transition-colors hover:border-[#1E3A8A]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-semibold text-[#1F2933] group-hover:underline">
                  {pdf.title}
                </div>
                <span className="rounded-[2px] bg-[#1E3A8A] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  PDF
                </span>
              </div>
              <p className="mt-2 text-sm text-[#1F2933]">{pdf.description}</p>
              {pdf.tag ? (
                <div className="mt-3 text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  {pdf.tag}
                </div>
              ) : null}
              <div className="mt-3 text-sm font-medium text-[#1E3A8A]">Download guide ↓</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
