export function Logo() {
  return (
    <svg className="block h-auto w-full" viewBox="0 0 360 76" role="img" aria-label="Parklane Media">
      <g className="fill-accent">
        <path d="M2 12h45c17 0 29 10 29 25S64 62 47 62H20v12H2V45h43c8 0 12-3 12-8s-4-8-12-8H2V12Z" />
        <path d="M84 74V12h17l23 31 23-31h18v62h-18V39l-23 30-22-30v35H84Z" />
        <rect x="178" y="5" width="2" height="66" />
      </g>
      <text className="fill-ink font-sans text-[31px] font-bold tracking-[-1.5px]" x="194" y="43">
        Parklane
      </text>
      <text className="fill-accent font-sans text-[16px] font-semibold" x="288" y="61">
        Media
      </text>
    </svg>
  )
}
