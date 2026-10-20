import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-dvh content-center gap-6 p-gutter">
      <p>404</p>
      <h1 className="font-display text-[6rem] font-medium leading-[.9]">Signal lost.</h1>
      <span>The page you are looking for has moved or no longer exists.</span>
      <Link className="w-fit bg-accent px-8 py-4 text-ink" href="/">
        Go home
      </Link>
    </main>
  )
}
