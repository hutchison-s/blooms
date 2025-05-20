import type { Concept } from "@/types/global";

export const bloomsLevels: (keyof Concept)[] = [
    'knowledge',
    'comprehension',
    'application',
    'analysis',
    'synthesis',
    'evaluation',
]

export const slugToTitle = (slug: string) => slug.split('-').map(w => w[0].toUpperCase()+w.substring(1)).join(' ')