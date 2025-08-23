// src/types/mathjax.d.ts
declare module 'mathjax-full/es5/tex-mml-chtml.js' {
  const mod: unknown; // side-effect import only
  export default mod;
}

type InlineMathPair = [string, string];
type FontCacheMode = 'global' | 'local' | 'none';

export interface MathJaxInstance {
  typesetPromise?: (elements?: Array<HTMLElement | string>) => Promise<void>;
  tex?: { inlineMath?: InlineMathPair[] };
  svg?: { fontCache?: FontCacheMode };
  // add fields as you need them
}

declare global {
  interface Window {
    MathJax?: MathJaxInstance;
  }
}

export {};
