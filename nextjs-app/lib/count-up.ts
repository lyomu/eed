/**
 * Reads the target straight from the element's existing text, so the markup
 * never duplicates the number and the final value is what search engines
 * and no-JS readers see. Prefix/suffix and zero-padding are preserved:
 * "04" counts 00 -> 04, "150+" counts 000+ -> 150+.
 */
export type CountSpec = {
  prefix: string;
  suffix: string;
  value: number;
  decimals: number;
  pad: number;
  grouped: boolean;
};

export function parseCountTarget(el: HTMLElement): CountSpec | null {
  const text = (el.textContent || '').trim();
  const match = text.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return null;

  const digits = match[2];
  const value = parseFloat(digits.replace(/,/g, ''));
  if (Number.isNaN(value)) return null;

  const decimals = digits.indexOf('.') !== -1 ? digits.split('.')[1].length : 0;
  // Only pad whole numbers, so "04" keeps its leading zero.
  const pad = decimals === 0 ? digits.replace(/,/g, '').length : 0;
  const grouped = digits.indexOf(',') !== -1;

  return { prefix: match[1], suffix: match[3], value, decimals, pad, grouped };
}

export function renderCount(el: HTMLElement, spec: CountSpec, current: number) {
  let out = spec.decimals > 0 ? current.toFixed(spec.decimals) : String(Math.round(current));
  while (out.length < spec.pad) out = '0' + out;
  if (spec.grouped) out = Number(out).toLocaleString('en-US');
  el.textContent = spec.prefix + out + spec.suffix;
}

const COUNT_DURATION_MS = 1100;

export function runCount(el: HTMLElement, reduced: boolean) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';

  const spec = parseCountTarget(el);
  if (!spec || reduced) return; // text already holds the final value

  let start: number | null = null;

  function frame(now: number) {
    if (start === null) start = now;
    const t = Math.min((now - start) / COUNT_DURATION_MS, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    renderCount(el, spec!, spec!.value * eased);
    if (t < 1) window.requestAnimationFrame(frame);
    else renderCount(el, spec!, spec!.value); // land exactly on target
  }

  renderCount(el, spec, 0);
  window.requestAnimationFrame(frame);
}
