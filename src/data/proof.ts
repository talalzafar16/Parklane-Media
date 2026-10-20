import type { StaticImageData } from 'next/image'

import apex from '@/assets/partners/apex.png'
import bigbash from '@/assets/partners/bigbash.png'
import fifa from '@/assets/partners/fifa.webp'
import icc from '@/assets/partners/icc.png'
import ilt20 from '@/assets/partners/ilt20.png'
import myco from '@/assets/partners/myco.webp'
import pcb from '@/assets/partners/pcb.png'
import psl from '@/assets/partners/psl.png'
import ptv from '@/assets/partners/ptv.png'
import tamasha from '@/assets/partners/tamasha.png'
import tapmad from '@/assets/partners/tapmad.png'

export type Partner = {
  name: string
  logo: StaticImageData
  // MYCO's and APEX's white lettering needs a dark tile; FIFA's artwork has extra padding to crop.
  dark?: boolean
  crop?: boolean
}

// PTV to Big Bash: artwork supplied by the client (21 Sep 2026). Tapmad, ICC and ILT20: official
// logos from tapmad.com and Wikipedia/Commons, added at the client's request. APEX: wordmark cut out
// of the client's avatar image (20 Oct 2026). Original colours kept.
export const partners: Partner[] = [
  { name: 'PTV', logo: ptv },
  { name: 'TAMASHA', logo: tamasha },
  { name: 'MYCO', logo: myco, dark: true },
  { name: 'PSL', logo: psl },
  { name: 'FIFA', logo: fifa, crop: true },
  { name: 'PCB', logo: pcb },
  { name: 'BIG BASH', logo: bigbash },
  { name: 'TAPMAD', logo: tapmad },
  { name: 'ICC', logo: icc },
  { name: 'ILT20', logo: ilt20 },
  { name: 'APEX', logo: apex, dark: true },
]

// TODO: CLIENT — the quotes and the shared attribution are drafts awaiting approval;
// 120+, 100% and 20+ are illustrative. Only 100M+ was supplied by the client.
export const testimonials = {
  attribution: 'Client name · Company',
  status: 'Draft template · Awaiting approval',
  quotes: [
    'Parklane turned our brief into a clear campaign idea, then brought it to life with care and creativity.',
    'Their understanding of sport helped us connect our brand with fans in a way that felt natural and relevant.',
    'From the first production meeting to the final delivery, the team kept every detail moving in the right direction.',
    'They helped us see the commercial potential in our property and shape a stronger proposition for partners.',
    'Our event needed a consistent brand presence. Parklane brought the spaces, sponsorships and content together.',
    'The content felt true to our brand and right for each platform, giving us a story we could build on.',
    'They understood the demands of live broadcasting and approached each stage with preparation and composure.',
    'Parklane worked as an extension of our team, balancing ambitious ideas with practical, dependable execution.',
  ],
}
