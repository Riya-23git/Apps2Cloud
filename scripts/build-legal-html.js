/*
 * Generates static, JavaScript-free copies of the legal pages:
 *   public/privacy-policy.html
 *   public/terms-of-service.html
 *
 * Content comes from src/legal/*.json — the same files the React pages use —
 * so the two versions never drift apart. Runs automatically before `npm run build`.
 * Crawlers that don't run JavaScript (such as Meta's app review) read these files.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCS = ['privacy.json', 'terms.json'].map(f =>
  JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'legal', f), 'utf8'))
);
const NAV = DOCS.map(d => ({ slug: d.slug, title: d.title }));

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const linkify = s => esc(s).replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');

function block(b) {
  if (b.p) return `<p>${linkify(b.p)}</p>`;
  if (b.h3) return `<h3>${esc(b.h3)}</h3>`;
  if (b.ul) return `<ul>${b.ul.map(li => `<li>${linkify(li)}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol class="steps">${b.ol.map(li => `<li>${linkify(li)}</li>`).join('')}</ol>`;
  if (b.links) return `<p class="ext">${b.links.map(l =>
    `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('')}</p>`;
  return '';
}

const CSS = `
:root{--bg:#17181b;--bg1:#1d1f23;--card:rgba(255,255,255,.04);--t0:#f5f5f4;--t1:#d6d3d1;--t2:#a8a29e;--line:rgba(255,255,255,.1);--blue:#fb923c}
@media(prefers-color-scheme:light){:root{--bg:#faf9f7;--bg1:#f4f2ef;--card:#fff;--t0:#1c1917;--t1:#44403c;--t2:#57534e;--line:rgba(28,25,23,.1);--blue:#c2410c}}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--t0);font-family:'Plus Jakarta Sans',system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;line-height:1.75}
a{color:var(--blue)}
.top{border-bottom:1px solid var(--line);background:var(--bg1)}
.wrap{max-width:820px;margin:0 auto;padding:0 22px}
.bar{display:flex;justify-content:space-between;align-items:center;padding:18px 0}
.brand{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-weight:800;font-size:1.2rem;color:var(--t0);text-decoration:none}
.brand span{color:var(--blue)}
.bar .back{font-size:.88rem;color:var(--t2);text-decoration:none}
.hero{padding:28px 0 44px}
.switch{display:inline-flex;gap:4px;padding:4px;border:1px solid var(--line);border-radius:100px;margin-bottom:24px}
.switch a{padding:7px 16px;border-radius:100px;font-size:.84rem;font-weight:600;color:var(--t2);text-decoration:none}
.switch a.on{background:linear-gradient(135deg,#b83c0a,#cf4a0b);color:#fff}
h1{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:clamp(2.2rem,6vw,3.4rem);letter-spacing:-.03em;line-height:1.08;margin-bottom:16px}
.intro{color:var(--t1);font-size:1.05rem;margin-bottom:16px}
.meta{color:var(--t2);font-size:.88rem}
.glance{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:36px 0 8px}
.glance div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
.glance b{display:block;margin-bottom:4px}
.glance p{color:var(--t2);font-size:.88rem;line-height:1.6}
nav.toc{margin:28px 0;padding:18px 22px;border:1px solid var(--line);border-radius:14px;background:var(--card)}
nav.toc b{display:block;margin-bottom:8px;font-size:.9rem}
nav.toc ol{padding-left:22px;columns:2;column-gap:28px;font-size:.88rem}
nav.toc a{color:var(--t1);text-decoration:none}
nav.toc a:hover{color:var(--blue)}
section{padding:28px 0;border-top:1px solid var(--line)}
h2{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:1.35rem;letter-spacing:-.01em;margin-bottom:12px}
h2 .n{color:var(--blue);margin-right:10px}
h3{font-size:1rem;margin:20px 0 8px}
p,li{color:var(--t1)}
p{margin-bottom:12px}
ul,ol{padding-left:22px;margin:4px 0 14px}
li{margin-bottom:6px}
.steps li{margin-bottom:10px}
.ext a{display:inline-block;margin:0 10px 8px 0;padding:6px 14px;border:1px solid var(--line);border-radius:100px;font-size:.85rem;text-decoration:none}
.contact{margin-top:14px;padding:18px 20px;border:1px solid var(--line);border-radius:14px;background:var(--card);display:grid;gap:4px}
.contact strong{color:var(--t0)}
footer{border-top:1px solid var(--line);padding:24px 0 48px;color:var(--t2);font-size:.85rem}
@media(max-width:600px){.glance{grid-template-columns:1fr}nav.toc ol{columns:1}.switch{display:flex}.switch a{flex:1;text-align:center}}
`;

function render(doc) {
  const url = `https://apps2cloud.in/${doc.slug}.html`;
  const switcher = NAV.map(n =>
    `<a href="/${n.slug}.html"${n.slug === doc.slug ? ' class="on" aria-current="page"' : ''}>${esc(n.title)}</a>`).join('');
  const glance = (doc.highlights || []).map(h =>
    `<div><b>${esc(h.icon)} ${esc(h.title)}</b><p>${linkify(h.text)}</p></div>`).join('');
  const toc = doc.sections.map(s => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('');
  const body = doc.sections.map((s, i) => `
    <section id="${s.id}">
      <h2><span class="n">${i + 1}.</span>${esc(s.title)}</h2>
      ${s.blocks.map(block).join('\n      ')}
      ${s.id === 'contact' ? `<div class="contact"><strong>Apps2Cloud</strong>
        <span>Email: <a href="mailto:support@apps2cloud.in">support@apps2cloud.in</a></span>
        <span>Phone / WhatsApp: <a href="tel:+917010213133">+91 70102 13133</a></span>
        <span>Website: <a href="https://apps2cloud.in">apps2cloud.in</a></span>
        <span>Location: Tamil Nadu, India</span></div>` : ''}
    </section>`).join('');

  return `<!DOCTYPE html>
<!-- Generated by scripts/build-legal-html.js from src/legal/${doc.slug === 'privacy-policy' ? 'privacy' : 'terms'}.json. Do not edit by hand. -->
<html lang="en">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(doc.title)} | Apps2Cloud</title>
<meta name="description" content="${esc(doc.seoDescription)}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${esc(doc.title)} | Apps2Cloud" />
<meta property="og:description" content="${esc(doc.seoDescription)}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />
<link rel="icon" href="/favicon.ico" />
<style>${CSS}</style>
</head>
<body>
<div class="top"><div class="wrap">
  <div class="bar"><a class="brand" href="/">Apps<span>2Cloud</span></a><a class="back" href="/">Back to website</a></div>
  <div class="hero">
    <div class="switch">${switcher}</div>
    <h1>${esc(doc.title)}</h1>
    <p class="intro">${linkify(doc.intro)}</p>
    <p class="meta">Last updated: ${esc(doc.updated)}</p>
  </div>
</div></div>
<main class="wrap">
  <div class="glance">${glance}</div>
  <nav class="toc" aria-label="Contents"><b>Contents</b><ol>${toc}</ol></nav>
  ${body}
</main>
<footer class="wrap">© ${new Date().getFullYear()} Apps2Cloud. All rights reserved.</footer>
</body>
</html>
`;
}

for (const doc of DOCS) {
  const out = path.join(ROOT, 'public', `${doc.slug}.html`);
  fs.writeFileSync(out, render(doc));
  console.log(`legal: wrote public/${doc.slug}.html`);
}
