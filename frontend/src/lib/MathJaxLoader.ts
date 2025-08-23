// src/utils/loadMathJax.ts
import type { MathJaxInstance } from '@/types/mathjax';

let mathJaxPromise: Promise<MathJaxInstance> | null = null;

export async function loadMathJax(): Promise<MathJaxInstance> {
  // SSR guard
  if (typeof window === 'undefined') {
    return {} as MathJaxInstance;
  }

  // Already available?
  if (window.MathJax) return window.MathJax;

  // In-flight import?
  if (mathJaxPromise) return mathJaxPromise;

  // Configure BEFORE importing (MathJax reads window.MathJax on load)
  window.MathJax = {
    tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
    svg: { fontCache: 'global' }
  };

// @ts-expect-error: side-effect bundle ships without type defs
  mathJaxPromise = import('mathjax-full/es5/tex-mml-chtml.js').then(
    () => window.MathJax as MathJaxInstance
  );
  return mathJaxPromise;
}
