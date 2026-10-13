// The blue square that replaces a full stop. Screen readers still hear ".".
export function SignalStop() {
  return (
    <>
      <span aria-hidden="true" className="ml-[0.06em] inline-block size-[0.16em] bg-signal-bright align-baseline" />
      <span className="sr-only">.</span>
    </>
  )
}
