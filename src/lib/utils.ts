import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge can't tell custom text-* sizes from text-* colours, so it
// would drop one of them. List every custom size from tailwind.config.ts here.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['label', 'small', 'body', 'lead', 'title', 'statement', 'display-md', 'display-lg', 'display-xl'],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function padIndex(value: number) {
  return String(value).padStart(2, '0')
}
