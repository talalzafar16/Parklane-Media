import { Eyebrow } from '@/components/ui/eyebrow'
import { about } from '@/data/home'

export function AboutSection() {
  return (
    <section
      className="relative z-[3] grid min-h-dvh grid-cols-[1.1fr_.9fr] gap-[8vw] bg-about-fade px-gutter py-[clamp(5rem,9vw,9rem)] text-ink tablet:gap-16 mobile:grid-cols-1 mobile:content-center mobile:gap-8 mobile:pb-12 mobile:pt-24"
      id="about"
    >
      <div className="self-center">
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <h2 className="font-display text-[clamp(5rem,12vw,13rem)] font-semibold uppercase leading-[.8] tracking-[-.025em] mobile:text-[clamp(5.5rem,24vw,9rem)]">
          {about.heading}
          <em className="block font-medium text-[#6eb9e4]">{about.emphasis}</em>
        </h2>
      </div>

      <div className="max-w-[38rem] self-center mobile:max-w-[36rem]">
        <h3 className="mb-6 text-[clamp(1.4rem,2.2vw,2.2rem)] font-medium leading-[1.15] tracking-[-.035em]">{about.title}</h3>
        <p className="text-[1rem] leading-[1.65] text-muted">{about.body}</p>
        <dl className="mt-8 grid gap-4">
          {about.facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line pt-4">
              <dt className="font-mono text-[.65rem] uppercase leading-[normal]">{fact.label}</dt>
              <dd className="text-[.82rem] font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
