import type { Concept, BloomLevelType, BloomLevelName } from "@/types/global";

export const bloomsLevels: (keyof Concept)[] = [
    'knowledge',
    'comprehension',
    'application',
    'analysis',
    'synthesis',
    'evaluation',
]

export const levelColorMap: Record<string, string[]> = {
        'knowledge': ['bg-cyan-300', 'text-zinc-800'],
        'comprehension': ['bg-cyan-400', 'text-zinc-800'],
        'application': ['bg-cyan-500', 'text-zinc-800'],
        'analysis': ['bg-cyan-600', 'text-zinc-200'],
        'synthesis': ['bg-cyan-700', 'text-zinc-200'],
        'evaluation': ['bg-cyan-800', 'text-zinc-200']
    }

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

export const levelInfo: BloomLevelType[] = [
  {
    id: 1,
    name: 'Knowledge',
    definition: 'The ability to recall facts, terms, basic concepts, or answers.',
    keywords: 'Define, List, Recall, Identify.',
    example: '"What is the capital of France?"'
  },
  {
    id: 2,
    name: 'Comprehension',
    definition: 'The ability to explain ideas or concepts, grasp meaning, and interpret information.',
    keywords: 'Explain, Describe, Summarize, Interpret.',
    example: '"Explain the process of photosynthesis."'
  },
  {
    id: 3,
    name: 'Application',
    definition: 'Using knowledge and understanding in new or concrete situations.',
    keywords: 'Apply, Use, Solve, Demonstrate.',
    example: '"Use the Pythagorean theorem to calculate the length of the hypotenuse."'
  },
  {
    id: 4,
    name: 'Analysis',
    definition: 'Breaking down information into parts and examining relationships and patterns.',
    keywords: 'Analyze, Compare, Contrast, Differentiate.',
    example: '"Compare the themes in two novels."'
  },
  {
    id: 5,
    name: 'Synthesis',
    definition: 'Combining elements to form a new structure, idea, or product.',
    keywords: 'Create, Design, Construct, Plan.',
    example: '"Develop a business proposal for a new product."'
  },
  {
    id: 6,
    name: 'Evaluation',
    definition: 'Making judgments based on criteria and standards through checking and critiquing. This is the highest level of thinking in the original taxonomy.',
    keywords: 'Evaluate, Critique, Judge, Justify.',
    example: '"Assess the effectiveness of a marketing campaign."'
  }
];

