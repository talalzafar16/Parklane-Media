import Image from 'next/image'

import logo from '@/assets/brand/parklane-logo.png'

// The brand logo with its white background removed (transparent PNG).
export function Logo({ priority = false }: { priority?: boolean }) {
  return <Image className="h-auto w-full" src={logo} alt="Parklane Media" sizes="160px" priority={priority} />
}
