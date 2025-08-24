// src/lib/latexToHtml.ts

// Basic HTML escape for non-math segments and converted text
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const GREEK: Record<string, string> = {
  '\\alpha':'alpha','\\beta':'beta','\\gamma':'gamma','\\delta':'delta','\\epsilon':'epsilon',
  '\\zeta':'zeta','\\eta':'eta','\\theta':'theta','\\iota':'iota','\\kappa':'kappa','\\lambda':'lambda',
  '\\mu':'mu','\\nu':'nu','\\xi':'xi','\\omicron':'omicron','\\pi':'pi','\\rho':'rho','\\sigma':'sigma',
  '\\tau':'tau','\\upsilon':'upsilon','\\phi':'phi','\\chi':'chi','\\psi':'psi','\\omega':'omega',
  '\\Gamma':'Gamma','\\Delta':'Delta','\\Theta':'Theta','\\Lambda':'Lambda','\\Xi':'Xi','\\Pi':'Pi',
  '\\Sigma':'Sigma','\\Upsilon':'Upsilon','\\Phi':'Phi','\\Psi':'Psi','\\Omega':'Omega'
};

const OPS: Record<string, string> = {
  '\\times': 'times',
  '\\cdot': 'times',
  '\\div': 'divided by',
  '\\pm': 'plus or minus',
  '\\mp': 'minus or plus',
  '\\leq': 'less than or equal to',
  '\\le': 'less than or equal to',
  '\\geq': 'greater than or equal to',
  '\\ge': 'greater than or equal to',
  '\\neq': 'not equal to',
  '\\approx': 'approximately equal to',
  '\\sim': 'similar to',
  '\\infty': 'infinity',
  '\\sum': 'sum',
  '\\prod': 'product',
  '\\int': 'integral',
};

function replaceCommonCommands(s: string): string {
  // Remove sizing/spacing wrappers
  s = s.replace(/\\left|\\right|\\!|\\,|\\;|\\:|\\quad|\\qquad/g, '');
  // Greek & operators (word forms)
  for (const [k,v] of Object.entries(GREEK)) s = s.replace(new RegExp(k, 'g'), v);
  for (const [k,v] of Object.entries(OPS))   s = s.replace(new RegExp(k, 'g'), v);
  return s;
}

function replaceSqrt(s: string): string {
  // nth root: \sqrt[n]{x}
  s = s.replace(/\\sqrt\s*\[([^\]]+)\]\s*\{([^{}]+)\}/g,
    (_, n, x) => ` ${n}th root of ${x} `
  );
  // square root: \sqrt{x}
  s = s.replace(/\\sqrt\s*\{([^{}]+)\}/g,
    (_, x) => ` square root of ${x} `
  );
  return s;
}

function replaceFrac(s: string): string {
  // Simple frac -> "a over b"
  return s.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g,
    (_, a, b) => ` ${a} over ${b} `
  );
}

function replacePowersAndSubs(s: string): string {
  // exponents: ^{n} or ^n -> "to the power of n"
  s = s.replace(/\^\{([^}]+)\}/g, (_, n) => ` to the power of ${n} `);
  s = s.replace(/\^([A-Za-z0-9]+)/g, (_, n) => ` to the power of ${n} `);
  // subscripts: _{n} or _n -> "sub n"
  s = s.replace(/_\{([^}]+)\}/g, (_, n) => ` sub ${n} `);
  s = s.replace(/_([A-Za-z0-9]+)/g, (_, n) => ` sub ${n} `);
  return s;
}

function cleanup(s: string): string {
  // Remove leftover braces and collapse whitespace
  s = s.replace(/[{}]/g, '');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/**
 * Convert a LaTeX fragment into readable text (returned as HTML-escaped).
 * The result is *textual*, not symbolic: e.g., "\sqrt{50}" -> "square root of 50"
 */
export function latexToHtml(latex: string): string {
  let s = latex;
  s = replaceCommonCommands(s);
  s = replaceSqrt(s);
  s = replaceFrac(s);
  s = replacePowersAndSubs(s);
  s = cleanup(s);
  // Wrap in a span for optional styling
  return `<span class="math-text">${escapeHtml(s)}</span>`;
}

/**
 * Convert all inline/block math in a plain string to readable HTML.
 * Supports: $...$, $$...$$, \(...\), \[...\]
 * Non-math text is escaped; line breaks become <br>.
 */
export function convertMathInHtml(input: string): string {
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$]+)\$|\\\(([^)]+)\\\)|\\\[([\s\S]+?)\\\]/g;
  let out = '';
  let last = 0;

  for (const m of input.matchAll(pattern)) {
    out += escapeHtml(input.slice(last, m.index!));
    const content = m[1] ?? m[2] ?? m[3] ?? m[4] ?? '';
    out += latexToHtml(content);
    last = m.index! + m[0].length;
  }
  out += escapeHtml(input.slice(last));

  // convert newlines to <br>
  return out.replace(/\r?\n/g, '<br>');
}
