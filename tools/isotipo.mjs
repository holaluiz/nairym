// Regenera los archivos del kit con el Isotipo 02 Fluida (NS).
// Fuente: assets/brand/nairym-isotipo-02-fluida-ns.svg (vector oficial entregado).
// El trazo nunca se redibuja: solo se escala y se traslada.
// Uso: node tools/isotipo.mjs   (requiere @resvg/resvg-js; se toma del proyecto nairym-brand-experience)
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import {createRequire} from 'node:module';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const KIT = path.join(ROOT, 'assets', 'kit');
const RESVG = process.env.RESVG || 'D:/meus documentos/Nairym Sosa/nairym-brand-experience/node_modules/@resvg/resvg-js';
const {Resvg} = createRequire(import.meta.url)(RESVG);

/* ---------- geometry ---------- */
function parse(d) {
  const tk = d.match(/[MCZmcz]|-?\d*\.?\d+(?:e-?\d+)?/g); const subs = []; let i = 0, cur = null, p0 = null, cmd = '';
  const num = () => parseFloat(tk[i++]);
  while (i < tk.length) {
    if (/[MCZ]/i.test(tk[i])) cmd = tk[i++].toUpperCase();
    if (cmd === 'M') { p0 = [num(), num()]; cur = []; subs.push(cur); cmd = 'C'; continue; }
    if (cmd === 'Z') { continue; }
    if (cmd === 'C') { const c1 = [num(), num()], c2 = [num(), num()], p3 = [num(), num()]; cur.push([p0, c1, c2, p3]); p0 = p3; }
  }
  return subs;
}
const bp = (s, t) => { const m = 1 - t, a = m * m * m, b = 3 * m * m * t, c = 3 * m * t * t, e = t * t * t; return [a * s[0][0] + b * s[1][0] + c * s[2][0] + e * s[3][0], a * s[0][1] + b * s[1][1] + c * s[2][1] + e * s[3][1]]; };
function bbox(subs) { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const segs of subs) for (const s of segs) for (let k = 0; k <= 48; k++) { const [x, y] = bp(s, k / 48); x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return {x: x0, y: y0, w: x1 - x0, h: y1 - y0}; }
const f = v => (Math.round(v * 1000) / 1000).toString();
const toD = (subs, s = 1, tx = 0, ty = 0) => subs.map(segs => `M${f(segs[0][0][0] * s + tx)} ${f(segs[0][0][1] * s + ty)}` +
  segs.map(g => `C${[g[1], g[2], g[3]].map(([x, y]) => `${f(x * s + tx)} ${f(y * s + ty)}`).join(' ')}`).join('') + 'Z').join('');

const src = fs.readFileSync(path.join(ROOT, 'assets', 'brand', 'nairym-isotipo-02-fluida-ns.svg'), 'utf8');
const raw = parse(src.match(/ d="([^"]+)"/)[1].replace(/\s+/g, ' '));
const rb = bbox(raw), K = 1000 / rb.w;
const MARK = raw.map(segs => segs.map(g => g.map(([x, y]) => [(x - rb.x) * K, (y - rb.y) * K])));
const HN = Math.round(rb.h * K * 1000) / 1000;
const ND = toD(MARK);
// head of the S-drop (centre of its bulb, in source units) → fractions of the box, for the zoom origin
const HEAD = [(231 - rb.x) / rb.w, (36 - rb.y) / rb.h];

/* ---------- helpers ---------- */
const COLORS = {'verde': ['Verde Oliva', '#48552C'], 'verde-profundo': ['Verde Profundo', '#28321C'], 'marfil': ['Marfil', '#F5F1E8'], 'blanco': ['Blanco', '#FFFFFF'], 'negro': ['Negro', '#000000']};
const doc = (w, h, title, desc, body) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(w)} ${f(h)}" width="${f(w)}" height="${f(h)}" role="img" aria-labelledby="t d">
<title id="t">${title}</title>
<desc id="d">${desc}</desc>
${body}
</svg>
`;
const put = (rel, data) => { const p = path.join(KIT, rel); fs.mkdirSync(path.dirname(p), {recursive: true}); fs.writeFileSync(p, data); };
const png = (svg, rel, w) => put(rel, new Resvg(svg, {fitTo: {mode: 'width', value: w}, font: {loadSystemFonts: false}}).render().asPng());
let n = 0;

/* ---------- isotipo ---------- */
for (const [id, [label, hex]] of Object.entries(COLORS)) {
  const svg = doc(1000, HN, 'Nairym Sosa — Isotipo', `Versión ${label}. Isotipo 02 Fluida (NS).`, `<path fill="${hex}" d="${ND}"/>`);
  put(`logos/isotipo/nairym-isotipo-${id}.svg`, svg);
  [['', 256], ['@2x', 512], ['@4x', 1024]].forEach(([s, w]) => png(svg, `logos/isotipo/png/nairym-isotipo-${id}${s}.png`, w)); n += 4;
}

/* ---------- lockups: swap the mark, keep the outlined type ---------- */
for (const kind of ['horizontal', 'vertical']) for (const [id, [label]] of Object.entries(COLORS)) {
  const rel = `logos/${kind}/nairym-logo-${kind}-${id}.svg`;
  let s = fs.readFileSync(path.join(KIT, rel), 'utf8');
  const m = s.match(/<path fill="([^"]+)" d="([^"]+)"\/>/);
  const ob = bbox(parse(m[2])), sc = ob.h / HN, nw = 1000 * sc;
  let [, , , W, H] = s.match(/viewBox="(\S+) (\S+) (\S+) (\S+)"/).map(Number);
  if (kind === 'horizontal') {
    const dW = ob.w - nw;
    s = s.replace(m[0], `<path fill="${m[1]}" d="${toD(MARK, sc, ob.x, ob.y)}"/>`)
         .replace(/transform="translate\((\S+) (\S+)\)"/g, (_, x, y) => `transform="translate(${f(+x - dW)} ${y})"`);
    W -= dW;
  } else {
    s = s.replace(m[0], `<path fill="${m[1]}" d="${toD(MARK, sc, ob.x + (ob.w - nw) / 2, ob.y)}"/>`);
  }
  s = s.replace(/viewBox="[^"]+" width="[^"]+" height="[^"]+"/, `viewBox="0 0 ${f(W)} ${f(H)}" width="${f(W)}" height="${f(H)}"`)
       .replace(/Archivo vectorial oficial derivado del isotipo original\./, 'Isotipo 02 Fluida (NS).');
  put(rel, s);
  const ws = kind === 'horizontal' ? [800, 1600, 3200] : [600, 1200, 2400];
  ['', '@2x', '@4x'].forEach((x, i) => png(s, `logos/${kind}/png/nairym-logo-${kind}-${id}${x}.png`, ws[i])); n += 4;
}

/* ---------- avatar ---------- */
for (const [id, fg, bg] of [['verde-profundo', '#F5F1E8', '#28321C'], ['verde', '#F5F1E8', '#48552C'], ['marfil', '#48552C', '#F5F1E8']]) {
  const S = 1080, pad = S * .22, sc = (S - 2 * pad) / 1000, ih = HN * sc;
  const svg = doc(S, S, 'Nairym Sosa — Avatar', 'Isotipo 02 Fluida (NS) sobre fondo de marca para perfiles.', `<rect width="${S}" height="${S}" fill="${bg}"/><path fill="${fg}" d="${toD(MARK, sc, pad, (S - ih) / 2)}"/>`);
  put(`logos/avatar/nairym-avatar-${id}.svg`, svg); png(svg, `logos/avatar/nairym-avatar-${id}.png`, 1080); n += 2;
}

/* ---------- graphic elements ---------- */
{
  const svg = doc(1040, HN + 40, 'Isotipo en contorno', 'Contorno del isotipo. Uso ornamental, no sustituye la marca.', `<path fill="none" stroke="#B69AE8" stroke-width="4" d="${toD(MARK, 1, 20, 20)}"/>`);
  put('graphic-elements/nairym-isotipo-contorno.svg', svg); png(svg, 'graphic-elements/png/nairym-isotipo-contorno.png', 2000);
  const TW = 456, TH = 311.168, gw = 118.75, sc = gw / 1000, gh = HN * sc;
  const cells = [[54, 44], [282, 44], [54, 199.7], [282, 199.7]].map(([x, y]) => toD(MARK, sc, x, y + (70.2 - gh) / 2)).join('');
  const pat = doc(TW, TH, 'Patrón', 'Módulo repetible con el isotipo en tono sobre tono.', `<rect width="${TW}" height="${TH}" fill="#28321C"/><path fill="#48552C" d="${cells}"/>`);
  put('graphic-elements/nairym-patron-isotipo.svg', pat); png(pat, 'graphic-elements/png/nairym-patron-isotipo.png', 2000);
  fs.writeFileSync(path.join(ROOT, 'assets', 'brand', 'patron-tile.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TW} ${TH}" width="${TW}" height="${TH}"><path fill="#48552C" d="${cells}"/></svg>`);
  for (const old of ['nairym-gota', 'nairym-construccion-vectorial']) for (const p of [`graphic-elements/${old}.svg`, `graphic-elements/png/${old}.png`]) fs.rmSync(path.join(KIT, p), {force: true});
  n += 4;
}

/* ---------- wrong uses ---------- */
{
  const p = path.join(KIT, 'wrong-uses.json'), list = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const w of list) {
    let first = true;
    w.svg = w.svg.replace(/viewBox=\\?"0 0 1000 589\.333\\?"/g, m => m.replace('589.333', f(HN)))
      .replace(/<path([^>]*?) d="([^"]+)"\/>/g, (all, attrs, d) => {
        if (d.startsWith('M797')) return '';               // old droplet: the new mark is one shape
        if (d.startsWith('M0 451.648')) return `<path${attrs} d="${ND}"/>`;
        return all;
      });
  }
  fs.writeFileSync(p, JSON.stringify(list));
}

fs.writeFileSync(path.join(ROOT, 'assets', 'brand', 'isotipo-ns.json'), JSON.stringify({viewBox: [0, 0, 1000, HN], aspect: 1000 / HN, head: HEAD, d: ND}, null, 1));
console.log(`OK · ${n} archivos · viewBox 0 0 1000 ${HN} · aspect ${(1000 / HN).toFixed(4)} · head ${HEAD.map(v => v.toFixed(3))}`);
