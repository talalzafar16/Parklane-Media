import { hero } from '@/data/home'

export function HeroIntro() {
  return (
    <section
      className="relative flex min-h-dvh items-center px-gutter pb-16 pt-32 compact:items-end mobile:pb-12 mobile:pt-24"
      aria-label="Parklane Media introduction"
    >
      <div className="relative w-[min(50rem,60vw)] mobile:w-full">
        <p className="mb-4 max-w-[30ch] font-mono text-[.7rem] font-bold uppercase tracking-[.12em] text-muted">{hero.kicker}</p>
        <h1 className="max-w-[14ch] font-display text-[clamp(4rem,min(8.5vw,12svh),10rem)] font-semibold uppercase leading-[.86] tracking-[-.015em] text-ink mobile:max-w-[13ch] mobile:text-[clamp(3.4rem,14.5vw,6rem)]">
          {hero.title}
        </h1>
        <p className="mt-[1.8rem] max-w-[34ch] text-[1rem] leading-[1.55] text-ink mobile:text-[.95rem]">{hero.body}</p>
        <ul className="mt-4 flex flex-wrap gap-4">
          {hero.tags.map((tag) => (
            <li key={tag} className="font-mono text-[.65rem] uppercase leading-[normal] tracking-[.1em] text-muted">
              {tag}
            </li>
          ))}
        </ul>
        <a className="group mt-8 inline-flex items-center gap-8 border-b border-line py-[.8rem] text-[.95rem]" href={hero.cta.href}>
          {hero.cta.label}
          <span className="text-[1.6rem] transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  )
}
