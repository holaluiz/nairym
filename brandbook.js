/* Brand book: logo lab, color, type tester, gallery, mockups, social generator, downloads. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const K = 'assets/kit/', PH = n => `assets/photos/${n}.jpg`;
const DL = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M3 13.5h10"/></svg>';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- toast ---------- */
const toast = $('.toast'); let tt;
function say(html) { toast.innerHTML = html; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('on'), 1800); }

/* ---------- reveal on enter ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {rootMargin: '0px 0px -8% 0px'});
const watch = root => $$('.rv', root).forEach(el => io.observe(el));

/* ================= 01 LOGO LAB ================= */
const COLORS = {
  'verde': {name: 'Verde Oliva', hex: '#48552C', light: false},
  'verde-profundo': {name: 'Verde Profundo', hex: '#28321C', light: false},
  'marfil': {name: 'Marfil', hex: '#F5F1E8', light: true},
  'blanco': {name: 'Blanco', hex: '#FFFFFF', light: true},
  'negro': {name: 'Negro', hex: '#000000', light: false}
};
const KINDS = {
  horizontal: {label: 'Horizontal', dir: 'horizontal', base: 'nairym-logo-horizontal-', png: ['', '@2x', '@4x'], colors: ['verde','verde-profundo','marfil','blanco','negro'],
    desc: 'Firma horizontal: la versión principal. Papelería, web, firmas de correo y piezas anchas.'},
  vertical: {label: 'Vertical', dir: 'vertical', base: 'nairym-logo-vertical-', png: ['', '@2x', '@4x'], colors: ['verde','verde-profundo','marfil','blanco','negro'],
    desc: 'Firma vertical: formatos cuadrados y verticales, empaques, portadas y certificados.'},
  isotipo: {label: 'Isotipo', dir: 'isotipo', base: 'nairym-isotipo-', png: ['', '@2x', '@4x'], colors: ['verde','verde-profundo','marfil','blanco','negro'],
    desc: 'Isotipo: una curva continua que termina en gota. Sellos, uniformes, detalles pequeños y redes.'},
  firma: {label: 'Nombre', dir: 'wordmark', base: 'nairym-firma-', png: ['', '@2x'], colors: ['verde','verde-profundo','marfil','blanco','negro'],
    desc: 'Firma tipográfica: el nombre sin el símbolo, para cuando el isotipo ya aparece en la pieza.'},
  avatar: {label: 'Avatar', dir: 'avatar', base: 'nairym-avatar-', png: null, colors: ['verde','verde-profundo','marfil'],
    desc: 'Avatar: foto de perfil para Instagram, WhatsApp y otras redes. Ya incluye el fondo de marca.'}
};
const BGS = {auto: 'Automático', claro: 'Marfil', oscuro: 'Verde profundo', foto: 'Fotografía'};
const lab = {kind: 'horizontal', color: 'verde', bg: 'auto'};
const stg = $('.lv-stage'), stgImg = $('.lv-stage img'), warn = $('.lv-warn'), fileL = $('.lv-file'), desc = $('.lv-desc'), dls = $('.lv-dls');
$('.lv-kinds').innerHTML = Object.entries(KINDS).map(([k, v]) => `<button type="button" data-k="${k}">${v.label}</button>`).join('');
$('.lv-colors').innerHTML = Object.entries(COLORS).map(([k, v]) => `<button type="button" data-c="${k}"><i style="background:${v.hex}"></i>${v.name}</button>`).join('');
$('.lv-bgs').innerHTML = Object.entries(BGS).map(([k, v]) => `<button type="button" data-b="${k}">${v}</button>`).join('');
function paintLab() {
  const k = KINDS[lab.kind];
  if (!k.colors.includes(lab.color)) lab.color = k.colors[0];
  const c = COLORS[lab.color];
  const svg = `${K}logos/${k.dir}/${k.base}${lab.color}.svg`;
  stgImg.src = svg; stgImg.alt = `${k.label} · ${c.name}`;
  stg.className = `lv-stage k-${lab.kind}`;
  let bg = lab.bg === 'auto' ? (c.light ? 'oscuro' : 'claro') : lab.bg;
  if (lab.kind === 'avatar' && lab.bg === 'auto') bg = 'claro';
  stg.style.backgroundImage = '';
  if (bg === 'claro') stg.style.background = '#F5F1E8';
  else if (bg === 'oscuro') stg.style.background = '#28321C';
  else { stg.style.background = ''; stg.classList.add('photo'); stg.style.backgroundImage = `url("${PH(c.light ? 'leaf-drops' : 'silk-texture')}")`; }
  const bad = lab.kind !== 'avatar' && ((bg === 'claro' && c.light) || (bg === 'oscuro' && !c.light && lab.color !== 'verde'));
  warn.classList.toggle('on', bad);
  fileL.textContent = svg.split('/').pop();
  desc.textContent = k.desc;
  let h = `<a class="dl solid" href="${svg}" download>${DL}SVG <small>vector</small></a>`;
  if (k.png) k.png.forEach((s, i) => { h += `<a class="dl" href="${K}logos/${k.dir}/png/${k.base}${lab.color}${s}.png" download>${DL}PNG <small>${['1x','2x','4x'][i]}</small></a>`; });
  else h += `<a class="dl" href="${K}logos/avatar/${k.base}${lab.color}.png" download>${DL}PNG <small>1080 px</small></a>`;
  dls.innerHTML = h;
  $$('.lv-kinds button').forEach(b => b.classList.toggle('on', b.dataset.k === lab.kind));
  $$('.lv-colors button').forEach(b => { b.classList.toggle('on', b.dataset.c === lab.color); b.disabled = !k.colors.includes(b.dataset.c); });
  $$('.lv-bgs button').forEach(b => b.classList.toggle('on', b.dataset.b === lab.bg));
}
$('.lv-kinds').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.kind = b.dataset.k; paintLab(); } });
$('.lv-colors').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.color = b.dataset.c; paintLab(); } });
$('.lv-bgs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.bg = b.dataset.b; paintLab(); } });
paintLab();

fetch(K + 'wrong-uses.json').then(r => r.json()).then(list => {
  $('.wrong').innerHTML = list.map(w => `<figure class="rv"><div class="wt">${w.svg}</div><figcaption>${w.label}</figcaption></figure>`).join('');
  watch($('.wrong'));
}).catch(() => { $('.wrong-wrap').hidden = true; });

/* ================= 02 COLOR ================= */
fetch(K + 'colors/nairym-colores.json').then(r => r.json()).then(data => {
  const tone = {verde: '#48552C', neutro: '#E7DFD0', lila: '#B69AE8'}, ink = {verde: '#F5F1E8', neutro: '#28321C', lila: '#28321C'};
  $('.ratio-big').innerHTML = data.groups.map(g => `<div style="flex:${g.share};background:${tone[g.id]};color:${ink[g.id]}"><b>${g.share}%</b><span>${g.label}</span></div>`).join('');
  $('.cgroups').innerHTML = data.groups.map(g => `<div class="rv"><div class="cg-h"><h3>${g.label}</h3><b>${g.share}%</b><p>${g.meaning}</p></div><div class="swatches">` +
    data.colors.filter(c => c.group === g.id).map(c => `<button type="button" class="swc" data-hex="${c.hex}" data-name="${c.name}">
      <div class="chipc" style="background:${c.hex}"><em>Copiar HEX</em></div>
      <div class="meta"><strong>${c.name}</strong><code>HEX ${c.hex}<br>RGB ${c.rgb.join(' · ')}<br>CMYK ${c.cmyk.join(' · ')}</code><p>${c.role}</p></div></button>`).join('') + '</div></div>').join('');
  $('.cnote').textContent = data.note;
  watch($('.cgroups'));
}).catch(() => {});
$('.cgroups').addEventListener('click', async e => {
  const b = e.target.closest('.swc'); if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.hex); say(`<i style="background:${b.dataset.hex}"></i>${b.dataset.name} · ${b.dataset.hex} copiado`); }
  catch { say(`${b.dataset.name} · ${b.dataset.hex}`); }
});

/* ================= 03 TYPE TESTER ================= */
const FAM = {
  cormorant: {css: '"Cormorant Garamond",Georgia,serif', min: 300, max: 700, def: 500, italic: true},
  manrope: {css: 'Manrope,system-ui,sans-serif', min: 200, max: 800, def: 400, italic: false},
  sora: {css: 'Sora,system-ui,sans-serif', min: 100, max: 800, def: 200, italic: false}
};
const tOut = $('.t-out'), tFam = $('#t-fam'), tW = $('#t-w'), tS = $('#t-s'), tI = $('#t-i');
function paintType(reset) {
  const f = FAM[tFam.value];
  tW.min = f.min; tW.max = f.max; if (reset) tW.value = f.def;
  tI.disabled = !f.italic; if (!f.italic) tI.checked = false;
  tOut.style.fontFamily = f.css; tOut.style.fontWeight = tW.value; tOut.style.fontSize = tS.value + 'px';
  tOut.style.fontStyle = tI.checked ? 'italic' : 'normal';
  tOut.style.letterSpacing = tFam.value === 'sora' ? '.08em' : '-.01em';
  $('#t-wo').textContent = tW.value; $('#t-so').textContent = tS.value;
}
tFam.addEventListener('change', () => paintType(true));
[tW, tS, tI].forEach(el => el.addEventListener('input', () => paintType(false)));
paintType(true);

/* ================= 04 PHOTOGRAPHY ================= */
const PHOTOS = [
  ['leaf-drops','Hoja con gotas','atmosfera'], ['frances-borgona','Francés borgoña con oro líquido','trabajo'], ['retrato-mesa','Nairym en el estudio','nairym'],
  ['hands-silk','Manos sobre seda verde','atmosfera'], ['olive-nails','Verde oliva sobre lino','trabajo'], ['clase-estudio','Clase en Studio Once','nairym'],
  ['manteca','Amarillo manteca','trabajo'], ['silk-texture','Seda verde con luz cálida','atmosfera'], ['retrato-espejo','Retrato','nairym'],
  ['lunares','Borgoña con lunares','trabajo'], ['studio-desk','Lámpara UV y productos','atmosfera'], ['clase-taller','Práctica guiada','nairym'],
  ['ombre-lavanda','Ombré lavanda','trabajo'], ['tools','Herramientas','atmosfera'], ['retrato-noche','Retrato nocturno','nairym'],
  ['peroladas','Puntas perladas','trabajo'], ['clase-frente','Teoría en clase','nairym']
];
const gal = $('.gallery');
gal.innerHTML = PHOTOS.map(([f, t, g], i) => `<button type="button" data-g="${g}" data-i="${i}"><img src="${PH(f)}" alt="${t}" loading="lazy"><span>${t}</span></button>`).join('');
$('.filters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('.filters button').forEach(x => x.classList.toggle('on', x === b));
  $$('button', gal).forEach(x => x.classList.toggle('hide', b.dataset.f !== 'todo' && x.dataset.g !== b.dataset.f));
});

/* ================= 05 MOCKUPS ================= */
const MOCKS = [
  ['tarjetas','Tarjetas de presentación','Frente marfil con firma horizontal en verde oliva; reverso verde con isotipo marfil.'],
  ['papeleria','Papel membretado','Hoja membretada con firma horizontal, sobre y carpeta verde.'],
  ['certificado','Certificado de curso','Certificado demostrativo; el nombre entre corchetes es un marcador.'],
  ['material-didactico','Cuaderno y material didáctico','Cuaderno con isotipo marfil y portada del material de Manicura Rusa.'],
  ['empaque','Empaque y frascos','Caja rígida marfil y frascos con etiqueta de la firma vertical.'],
  ['uniforme','Uniforme profesional','Isotipo marfil aplicado al pecho (simulación de bordado).'],
  ['pared','Señalética del estudio','Firma en relieve sobre muro marfil.']
];
$('.mocks').innerHTML = MOCKS.map(([f, t, d], i) => `<figure class="rv"><button type="button" data-i="${i}" aria-label="Ver ${t}"><img src="${K}mockups/nairym-mockup-${f}-web.jpg" alt="${t}" loading="lazy"></button><figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`).join('');
const ELEMS = [['gota','Gota'],['isotipo-contorno','Isotipo contorno'],['flow-linea-superior','Línea flow superior'],['flow-linea-inferior','Línea flow inferior'],['marco-flow','Marco flow'],['mascara-flow','Máscara flow'],['patron-isotipo','Patrón']];
$('.elems').innerHTML = ELEMS.map(([f, t]) => `<a href="${K}graphic-elements/nairym-${f}.svg" download title="Descargar SVG"><i><img src="${K}graphic-elements/nairym-${f}.svg" alt="" loading="lazy"></i>${t}</a>`).join('');

/* ================= LIGHTBOX ================= */
const lbx = $('.lbx'), lbImg = $('img', lbx), lbCap = $('.lb-cap', lbx);
let lbList = [], lbI = 0;
function lbShow() { const it = lbList[lbI]; lbImg.src = it.src; lbImg.alt = it.cap; lbCap.innerHTML = `<span>${it.cap}</span>` + (it.full ? `<a href="${it.full}" download>Descargar en alta</a>` : ''); }
function lbOpen(list, i) { lbList = list; lbI = i; lbShow(); lbx.classList.add('on'); window.NS && (NS.locked = true); $('.lb-x').focus(); }
function lbClose() { lbx.classList.remove('on'); window.NS && (NS.locked = false); }
gal.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
  const vis = $$('button:not(.hide)', gal); lbOpen(vis.map(x => ({src: $('img', x).src, cap: $('img', x).alt, full: $('img', x).src})), vis.indexOf(b)); });
$('.mocks').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
  lbOpen(MOCKS.map(([f, t]) => ({src: `${K}mockups/nairym-mockup-${f}-web.jpg`, cap: t, full: `${K}mockups/nairym-mockup-${f}.jpg`})), +b.dataset.i); });
$('.lb-x').onclick = lbClose;
$('.lb-p').onclick = () => { lbI = (lbI - 1 + lbList.length) % lbList.length; lbShow(); };
$('.lb-n').onclick = () => { lbI = (lbI + 1) % lbList.length; lbShow(); };
lbx.addEventListener('click', e => { if (e.target === lbx) lbClose(); });
addEventListener('keydown', e => { if (!lbx.classList.contains('on')) return;
  if (e.key === 'Escape') lbClose(); if (e.key === 'ArrowLeft') $('.lb-p').click(); if (e.key === 'ArrowRight') $('.lb-n').click(); });

/* ================= 06 SOCIAL: canvas templates ================= */
const ISO_D = $('#iso path').getAttribute('d');
const isoPath = new Path2D(ISO_D);
const C = {marfil: '#F5F1E8', beige: '#E7DFD0', oliva: '#48552C', profundo: '#28321C', musgo: '#65734B', salvia: '#A8B396', lila: '#B69AE8', lilaL: '#D3C1FF'};
const imgCache = {};
const loadImg = n => imgCache[n] || (imgCache[n] = new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = PH(n); }));
function cover(ctx, img, x, y, w, h, fy = .5) {
  if (!img) { ctx.fillStyle = C.beige; ctx.fillRect(x, y, w, h); return; }
  const s = Math.max(w / img.width, h / img.height), iw = img.width * s, ih = img.height * s;
  ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) * fy, iw, ih);
}
function iso(ctx, x, y, w, color) { ctx.save(); ctx.translate(x, y); ctx.scale(w / 1000, w / 1000); ctx.fillStyle = color; ctx.fill(isoPath); ctx.restore(); }
function wrap(ctx, text, maxW) {
  const out = []; String(text).split('\n').forEach(par => { let line = '';
    par.split(' ').forEach(w => { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; });
    out.push(line); }); return out;
}
function txt(ctx, text, x, y, {font, color, align = 'left', ls = 0, maxW = 0, lh = 1.2, size = 40}) {
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
  if ('letterSpacing' in ctx) ctx.letterSpacing = ls + 'px';
  const lines = maxW ? wrap(ctx, text, maxW) : [String(text)];
  lines.forEach((l, i) => ctx.fillText(l, x + (align === 'center' && ls ? ls / 2 : 0), y + i * size * lh));
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  return lines.length;
}
const TPL = {
  cita: {name: 'Cita', w: 1080, h: 1350, photo: false, title: 'Tu esencia no necesita artificios. Su fuerza está en ser auténtica.', sub: 'Nairym Sosa · Máster Nail Artist',
    draw(ctx, d) {
      ctx.fillStyle = C.profundo; ctx.fillRect(0, 0, 1080, 1350);
      const g = ctx.createRadialGradient(880, 180, 0, 880, 180, 620); g.addColorStop(0, 'rgba(182,154,232,.22)'); g.addColorStop(1, 'rgba(182,154,232,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1350);
      iso(ctx, 440, 190, 200, C.marfil);
      ctx.font = 'italic 400 80px "Cormorant Garamond"'; const n = wrap(ctx, d.title, 840).length;
      const y0 = 690 - (n - 1) * 80 * 1.18 / 2;
      txt(ctx, d.title, 540, y0, {font: 'italic 400 80px "Cormorant Garamond"', color: C.marfil, align: 'center', maxW: 840, lh: 1.18, size: 80});
      ctx.fillStyle = C.lila; ctx.fillRect(510, y0 + n * 94 + 10, 60, 2);
      txt(ctx, d.sub.toUpperCase(), 540, 1240, {font: '200 24px Sora', color: C.salvia, align: 'center', ls: 8});
    }},
  trabajo: {name: 'Trabajo', w: 1080, h: 1350, photo: 'frances-borgona', title: 'Francés borgoña', sub: 'Detalle en oro líquido',
    draw(ctx, d, img) {
      ctx.fillStyle = C.marfil; ctx.fillRect(0, 0, 1080, 1350);
      cover(ctx, img, 0, 0, 1080, 1070);
      txt(ctx, d.title, 72, 1188, {font: '500 72px "Cormorant Garamond"', color: C.profundo});
      txt(ctx, d.sub.toUpperCase(), 72, 1252, {font: '300 24px Sora', color: C.musgo, ls: 5});
      iso(ctx, 860, 1150, 150, C.oliva);
      ctx.fillStyle = C.lila; ctx.beginPath(); ctx.arc(1024, 56, 7, 0, 7); ctx.fill();
    }},
  serie: {name: 'Serie', w: 1080, h: 1350, photo: 'tools', title: 'Nairym explica', sub: '[Tema del episodio]',
    draw(ctx, d, img) {
      ctx.fillStyle = C.profundo; ctx.fillRect(0, 0, 1080, 1350);
      ctx.save(); ctx.globalAlpha = .55; cover(ctx, img, 0, 760, 1080, 590); ctx.restore();
      const g = ctx.createLinearGradient(0, 760, 0, 1350); g.addColorStop(0, C.profundo); g.addColorStop(1, 'rgba(40,50,28,.2)');
      ctx.fillStyle = g; ctx.fillRect(0, 760, 1080, 590);
      iso(ctx, 455, 210, 170, C.marfil);
      txt(ctx, 'SERIE', 540, 470, {font: '300 24px Sora', color: C.lilaL, align: 'center', ls: 10});
      const n = txt(ctx, d.title.toUpperCase(), 540, 580, {font: '500 86px "Cormorant Garamond"', color: C.marfil, align: 'center', ls: 6, maxW: 960, lh: 1.05, size: 86});
      const yl = 580 + (n - 1) * 90 + 52; ctx.fillStyle = C.lila; ctx.fillRect(480, yl, 120, 2);
      txt(ctx, d.sub, 540, yl + 78, {font: '300 32px Sora', color: C.beige, align: 'center', maxW: 860, lh: 1.4, size: 32});
    }},
  curso: {name: 'Curso', w: 1080, h: 1350, photo: 'clase-estudio', title: 'Manicura Rusa', sub: '[Fecha] · [Ciudad]',
    draw(ctx, d, img) {
      cover(ctx, img, 0, 0, 1080, 1350, .35);
      const g = ctx.createLinearGradient(0, 520, 0, 1350); g.addColorStop(0, 'rgba(40,50,28,0)'); g.addColorStop(.55, 'rgba(40,50,28,.82)'); g.addColorStop(1, 'rgba(40,50,28,.97)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1350);
      const g2 = ctx.createLinearGradient(0, 0, 0, 260); g2.addColorStop(0, 'rgba(40,50,28,.55)'); g2.addColorStop(1, 'rgba(40,50,28,0)');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, 1080, 260);
      iso(ctx, 72, 68, 120, C.marfil);
      ctx.font = '400 22px Sora'; if ('letterSpacing' in ctx) ctx.letterSpacing = '6px'; const pw = ctx.measureText('CURSO').width + 52; if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      ctx.fillStyle = C.lila; ctx.beginPath(); ctx.roundRect(72, 930, pw, 52, 26); ctx.fill();
      txt(ctx, 'CURSO', 98, 965, {font: '400 22px Sora', color: C.profundo, ls: 6});
      const n = txt(ctx, d.title, 72, 1100, {font: '500 116px "Cormorant Garamond"', color: C.marfil, maxW: 930, lh: 1, size: 116});
      txt(ctx, d.sub, 72, 1100 + (n - 1) * 116 + 96, {font: '300 30px Sora', color: C.beige});
    }},
  story: {name: 'Story', w: 1080, h: 1920, photo: 'studio-desk', title: 'Detrás de la técnica', sub: 'Precisión que se aprende, se practica y se comparte.',
    draw(ctx, d, img) {
      ctx.fillStyle = C.marfil; ctx.fillRect(0, 0, 1080, 1920);
      iso(ctx, 470, 92, 140, C.oliva);
      const x = 110, y = 250, w = 860, h = 1060, r = w / 2;
      ctx.save(); ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + r); ctx.arc(x + r, y + r, r, Math.PI, 0); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.clip();
      cover(ctx, img, x, y, w, h); ctx.restore();
      ctx.strokeStyle = C.lila; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 40, y + h + 1); ctx.lineTo(x + w - 40, y + h + 1); ctx.stroke();
      const n = txt(ctx, d.title, 540, 1470, {font: 'italic 400 98px "Cormorant Garamond"', color: C.profundo, align: 'center', maxW: 900, lh: 1.05, size: 98});
      txt(ctx, d.sub, 540, 1470 + (n - 1) * 103 + 92, {font: '400 36px Manrope', color: '#5E6450', align: 'center', maxW: 820, lh: 1.5, size: 36});
      txt(ctx, 'NAIRYM SOSA · MÁSTER NAIL ARTIST', 540, 1840, {font: '200 24px Sora', color: C.musgo, align: 'center', ls: 8});
    }}
};
const fontsReady = Promise.all([
  'italic 400 80px "Cormorant Garamond"', '500 80px "Cormorant Garamond"', '200 24px Sora', '300 24px Sora', '400 24px Sora', '400 36px Manrope'
].map(f => document.fonts.load(f).catch(() => {}))).then(() => document.fonts.ready);
async function render(canvas, key, d, scale = 1) {
  const t = TPL[key]; await fontsReady;
  const img = t.photo !== false ? await loadImg(d.photo || t.photo) : null;
  canvas.width = t.w * scale; canvas.height = t.h * scale;
  const ctx = canvas.getContext('2d'); ctx.setTransform(scale, 0, 0, scale, 0, 0);
  t.draw(ctx, {title: d.title ?? t.title, sub: d.sub ?? t.sub}, img);
}

/* feed */
const FEED = [
  ['tpl', 'trabajo', {}], ['ph', 'olive-nails'], ['tpl', 'cita', {}],
  ['ph', 'clase-estudio'], ['tpl', 'serie', {}], ['ph', 'manteca'],
  ['tpl', 'curso', {}], ['ph', 'lunares'], ['tpl', 'trabajo', {photo: 'ombre-lavanda', title: 'Ombré lavanda', sub: 'Del lila al amarillo manteca'}]
];
const grid = $('.ig-grid');
FEED.forEach(([type, a, d], i) => {
  if (type === 'ph') { const b = document.createElement('button'); b.type = 'button'; b.style.backgroundImage = `url("${PH(a)}")`; b.setAttribute('aria-label', 'Foto'); b.dataset.ph = a; grid.appendChild(b); }
  else { const c = document.createElement('canvas'); c.dataset.i = i; c.setAttribute('role', 'button'); c.setAttribute('aria-label', `Plantilla ${TPL[a].name}`); grid.appendChild(c); render(c, a, d, .4); }
});
grid.addEventListener('click', e => {
  const c = e.target.closest('canvas'); if (c) { const [, k, d] = FEED[+c.dataset.i]; setGen(k, d); }
  const b = e.target.closest('button[data-ph]'); if (b) { setGen(gen.key === 'cita' ? 'trabajo' : gen.key, {photo: b.dataset.ph}); }
});

/* generator */
const gc = $('#gen-canvas'), gT = $('#g-tpl'), gP = $('#g-photo'), gTi = $('#g-title'), gS = $('#g-sub');
const gen = {key: 'trabajo', photo: null};
gT.innerHTML = Object.entries(TPL).map(([k, v]) => `<option value="${k}">${v.name} · ${v.w}×${v.h}</option>`).join('');
gP.innerHTML = PHOTOS.map(([f, t]) => `<option value="${f}">${t}</option>`).join('');
let rq = 0;
function draw() { const id = ++rq; requestAnimationFrame(() => { if (id === rq) render(gc, gen.key, {photo: gP.value, title: gTi.value, sub: gS.value}, .5); }); }
function setGen(k, d = {}) {
  const t = TPL[k]; gen.key = k; gT.value = k;
  gTi.value = d.title ?? t.title; gS.value = d.sub ?? t.sub;
  gP.value = d.photo || t.photo || gP.value; gP.disabled = t.photo === false;
  draw();
}
gT.addEventListener('change', () => setGen(gT.value));
[gP, gTi, gS].forEach(el => el.addEventListener('input', draw));
$('#g-dl').addEventListener('click', async () => {
  const c = document.createElement('canvas'); await render(c, gen.key, {photo: gP.value, title: gTi.value, sub: gS.value}, 1);
  c.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `nairym-${gen.key}-${TPL[gen.key].w}x${TPL[gen.key].h}.png`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); say('PNG listo para publicar'); }, 'image/png');
});
setGen('trabajo');

/* reels: play only in view */
const rio = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting && !RM) v.play().catch(() => {}); else v.pause(); }), {threshold: .3});
$$('.reels video').forEach(v => rio.observe(v));

watch(document);
if (/[?&]static\b/.test(location.search)) $$('.rv').forEach(el => el.classList.add('in'));
/* deep links: /#redes, /#logotipo… land on the chapter once images have settled */
if (location.hash.length > 1) addEventListener('load', () => {
  const el = document.getElementById(location.hash.slice(1));
  if (el && el.closest('#book')) setTimeout(() => NS.go ? NS.go(el.getBoundingClientRect().top + scrollY) : el.scrollIntoView(), 60);
});
})();
