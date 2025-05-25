import type { Concept } from "@/types/global";

export const bloomsLevels: (keyof Concept)[] = [
    'knowledge',
    'comprehension',
    'application',
    'analysis',
    'synthesis',
    'evaluation',
]

export const slugToTitle = (slug: string) => slug.split('-').map(w => w[0].toUpperCase()+w.substring(1)).join(' ');

export class QueryURLBuilder extends URL {
  constructor(url: string) {
    super(url)
    return this;
  }
  addParam(field: string, val?: string | number) {
    if (!val) return this;
    const sp = new URLSearchParams(this.search);
    sp.set(field, String(val));
    this.search = sp.toString();
    return this;
  }
  removeParam(field: string) {
    const sp = new URLSearchParams(this.search);
    if (sp.has(field)) {
      sp.delete(field);
    };
    this.search = sp.toString();
    return this;
  }
}