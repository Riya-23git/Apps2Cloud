import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PROJECTS, GLOBAL_STATS } from '../data';
import HomeHero from '../components/HomeHero';
import DashMock from '../components/DashMock';
import ServiceIcon from '../components/ServiceIcon';
import ClientLogo from '../components/ClientLogo';
import svcErp from '../assets/svc-erp.svg';
import svcBilling from '../assets/svc-billing.svg';
import svcMobile from '../assets/svc-mobile.svg';
import svcWeb from '../assets/svc-web.svg';
import SEO from '../SEO';
import './Home.css';

const INDUSTRIES = ['Retail Shops', 'Factories', 'Construction', 'Pharmacies', 'Wholesale Traders', 'Schools', 'Rice Mills', 'Logistics', 'Textiles', 'Hardware Stores'];

// Designed placeholder logos. Add `logo: importedImage` to a client to show its real logo instead.
const CLIENTS = [
  { name: 'DreamHouse Construction', mark: 'house', letters: 'DH', color: '#c2410c', accent: '#1f2937', word: ['Dream', 'House'], tag: 'Construction', type: 'sans' },
  { name: 'Diyash Bricks', mark: 'bricks', color: '#b91c1c', accent: '#7f1d1d', word: ['Diyash', ''], tag: 'Bricks', type: 'caps' },
  { name: 'Sri Velavan Finance', mark: 'shield', letters: 'SV', color: '#1e3a8a', accent: '#b45309', word: ['Sri ', 'Velavan'], tag: 'Finance', type: 'serif' },
  { name: 'Lingam Gold Finance', mark: 'coin', letters: 'L', color: '#d97706', accent: '#92400e', ink: '#78350f', word: ['Lingam ', 'Gold'], tag: 'Finance', type: 'serif' },
  { name: 'Sugabramar', mark: 'leaf', letters: 'S', color: '#0f766e', accent: '#134e4a', word: ['Suga', 'bramar'], type: 'sans' },
  { name: 'Sri Madhura Finance', mark: 'diamond', letters: 'SM', color: '#9d174d', accent: '#fbcfe8', word: ['Sri ', 'Madhura'], tag: 'Finance', type: 'serif', wordAccent: '#831843' },
  { name: 'R.V Aqua Water', mark: 'drop', letters: 'RV', color: '#0284c7', accent: '#e0f2fe', word: ['R.V ', 'Aqua'], tag: 'Water', type: 'sans', wordAccent: '#0369a1' },
  { name: 'Velavan Micro Finance', mark: 'hex', letters: 'VM', color: '#15803d', accent: '#bbf7d0', word: ['Velavan ', 'Micro'], tag: 'Finance', type: 'sans', wordAccent: '#166534' },
  { name: 'Bharathi Crackers', mark: 'burst', letters: 'B', color: '#dc2626', accent: '#991b1b', word: ['Bharathi', ''], tag: 'Crackers', type: 'italic' },
  { name: 'Mahapattasu', mark: 'flame', letters: 'M', color: '#ea580c', accent: '#b91c1c', word: ['Maha', 'pattasu'], type: 'italic' },
  { name: 'Factoryoutletscrackers', mark: 'factory', color: '#334155', accent: '#ea580c', word: ['Factoryoutlets', 'crackers'], type: 'sans' },
  { name: 'Ravi Crackers', mark: 'sun', letters: 'R', color: '#ea580c', accent: '#f59e0b', word: ['Ravi', ''], tag: 'Crackers', type: 'caps' },
  { name: 'Sriram Cable TV', mark: 'tv', letters: 'S', color: '#6d28d9', accent: '#a21caf', word: ['Sriram', ''], tag: 'Cable TV', type: 'sans' },
  { name: 'Mukesh Cables', mark: 'wire', letters: 'M', ink: '#1d4ed8', color: '#1d4ed8', accent: '#475569', word: ['Mukesh', ''], tag: 'Cables', type: 'caps' },
  { name: 'Vishnu Crakers', mark: 'star', letters: 'V', color: '#be123c', accent: '#881337', word: ['Vishnu', ''], tag: 'Crakers', type: 'italic' },
];

// Top row scrolls left, bottom row scrolls right.
const CLIENT_ROWS = [CLIENTS.slice(0, 8), CLIENTS.slice(8)];

const FEATURED_IDS = [1, 3, 4, 5];

// Core solutions shown as image cards.
const CORE = [
  { slug: 'erp-software', image: svcErp },
  { slug: 'billing-software', image: svcBilling },
  { slug: 'mobile-apps', image: svcMobile },
  { slug: 'web-applications', image: svcWeb },
];

const STEPS = [
  { n: '01', tag: 'Day 1', t: 'Free consultation', d: 'We visit or call, understand how your business runs today and where time and money leak.' },
  { n: '02', tag: 'Within 24 hours', t: 'Clear proposal', d: 'A fixed scope, a fixed price and a timeline, in writing, within 24 hours.' },
  { n: '03', tag: 'Every week', t: 'Build with weekly demos', d: 'You see working software every week and shape it before it ships.' },
  { n: '04', tag: 'Go-live', t: 'Launch & support', d: 'We install, train your staff and stay on call with 3 months of free support.' },
];

const PROMISES = [
  { t: 'You own the code', d: 'Full source code and data handed over. No lock-in, ever.' },
  { t: 'Fixed-price projects', d: 'The price we quote is the price you pay.' },
  { t: 'Works offline', d: 'Billing and stock keep running even when the internet does not.' },
  { t: 'Local, reachable team', d: 'Based in Tamil Nadu. Call, WhatsApp or meet us in person.' },
];

const FAQS = [
  { q: 'How much does custom software cost?', a: 'Small billing systems and business websites start under ₹25,000. ERP and multi-branch systems are quoted after a free consultation, as a fixed price with no hidden charges.' },
  { q: 'How long does a project take?', a: 'Websites take 1–2 weeks, billing software 2–4 weeks, and ERP or mobile apps 4–10 weeks depending on scope. You see progress every week.' },
  { q: 'Will it work without internet?', a: 'Yes. Our billing and stock systems are built offline-first and sync to the cloud automatically when the connection returns.' },
  { q: 'Do you provide support after launch?', a: 'Every project includes 3 months of free support, staff training and bug fixes. Annual maintenance plans are available after that.' },
  { q: 'Can you work with my existing data?', a: 'Yes. We import products, customers and balances from Excel, Tally or your old software so you can start on day one.' },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.hx-reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const stats = GLOBAL_STATS.slice(0, 4);
const COUNT_MS = 2500;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Home() {
  const [countProgress, setCountProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));
  const [faq, setFaq] = useState(0);
  const statsRef = useRef(null);
  const featured = PROJECTS.filter(p => FEATURED_IDS.includes(p.id));
  const core = CORE.map(c => ({ ...c, s: SERVICES.find(x => x.slug === c.slug) }));
  const more = SERVICES.filter(sv => !CORE.some(c => c.slug === sv.slug));

  useReveal();

  // Numbers stay at 0 until the section scrolls into view, then count up; leaving resets them so each visit replays the count.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let frame;
    const obs = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(frame);
      if (!e.isIntersecting) { setCountProgress(0); return; }
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / COUNT_MS);
        setCountProgress(1 - Math.pow(1 - p, 2));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .4 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => { obs.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="hx">
      <SEO
        description="Apps2Cloud builds ERP systems, billing software, mobile apps, and business websites for shops, factories, and construction companies in Tamil Nadu. 50+ projects delivered. Call +91 70102 13133."
        keywords="software company Tamil Nadu, ERP software Tamil Nadu, billing software Tamil Nadu, mobile app development Tamil Nadu, business website Tamil Nadu, shop management software"
        url="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Apps2Cloud",
          "url": "https://apps2cloud.in",
          "logo": "https://apps2cloud.in/android-chrome-512x512.png",
          "description": "Software development company in Tamil Nadu building ERP, billing software, mobile apps and websites for businesses.",
          "telephone": "+917010213133",
          "email": "hello@apps2cloud.in",
          "address": { "@type": "PostalAddress", "addressRegion": "Tamil Nadu", "addressCountry": "IN" },
          "areaServed": "Tamil Nadu",
          "sameAs": ["https://www.justdial.com/apps2cloud", "https://www.indiamart.com/apps2cloud"]
        }}
      />

      {/* ── HERO ── */}
      <HomeHero />

      {/* ── INDUSTRIES MARQUEE ── */}
      <div id="home-next" className="hx-marquee" aria-label="Industries we serve">
        <div className="hx-marquee-track">
          {[...INDUSTRIES, ...INDUSTRIES].map((t, i) => <span key={i} aria-hidden={i >= INDUSTRIES.length}>{t}<i>✦</i></span>)}
        </div>
      </div>

      {/* ── CLIENTS ── */}
      <section className="hx-clients">
        <div className="container">
          <h2 className="hx-h2 hx-clients-title hx-reveal">Some of our <span className="gradient-text">valued clients</span></h2>
        </div>
        <div className="hx-clients-wall hx-reveal">
          {CLIENT_ROWS.map((row, r) => (
            <div key={r} className="hx-clients-marquee">
              <ul className={`hx-clients-track${r ? ' is-reverse' : ''}`} style={{ animationDuration: `${row.length * 10}s` }}>
                {[...row, ...row, ...row, ...row].map((c, i) => (
                  <li key={i} className="hx-client" aria-hidden={i >= row.length}>
                    <ClientLogo client={c} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="hx-stats" ref={statsRef}>
        <div className="container">
          <div className="hx-trust-head hx-reveal">
            <h2 className="hx-h2">Numbers that <span className="gradient-text">build trust</span></h2>
            <p className="hx-trust-p">A local team building software that businesses in Tamil Nadu use every day.</p>
          </div>
          <div className="hx-trust-grid hx-reveal">
            {stats.map(s => {
              const shown = s.val.replace(/\d+/, n => Math.round(Number(n) * countProgress));
              return (
                <div key={s.label} className="hx-trust-card">
                  <div className="hx-trust-v">{shown}</div>
                  <div className="hx-trust-l">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES: image cards ── */}
      <section className="hx-sec zz-sec">
        <div className="container">
          <div className="wb-head hx-reveal">
            <span className="hx-eyebrow">What we build</span>
            <h2 className="hx-h2">Software for every part of <span className="gradient-text">your business</span></h2>
            <p>From the billing counter to the factory floor, one team designs, builds and supports it all.</p>
          </div>

          <div className="wb-grid">
            {core.map(({ s, image }) => (
              <article key={s.slug} className="wb-card hx-reveal">
                <div className="wb-img"><img src={image} alt="" loading="lazy" /></div>
                <div className="wb-body">
                  <h3>{s.title}</h3>
                  <p>{s.shortDesc}</p>
                  <div className="wb-ctas">
                    <Link to={`/services/${s.slug}`} className="wb-more" aria-label={`Explore ${s.shortTitle}`}>Explore More <Arrow /></Link>
                    <Link to="/contact" state={{ service: s.slug }} className="wb-est">Get estimate</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="zz-more hx-reveal">
            <span className="zz-more-cap">More solutions</span>
            <div className="zz-more-grid">
              {more.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="zz-mini">
                  <span className="hx-svc-ico"><ServiceIcon slug={s.slug} size={22} /></span>
                  <span className="zz-mini-txt"><b>{s.shortTitle}</b><small>{s.tagline}</small></span>
                  <span className="zz-mini-go"><Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS: zig-zag timeline ── */}
      <section className="hx-sec hw-sec">
        <div className="container">
          <div className="hx-head hx-head-c hx-reveal">
            <span className="hx-eyebrow">How it works</span>
            <h2 className="hx-h2">From first call to go-live in <span className="gradient-text">four steps</span></h2>
          </div>
          <ol className="zz-time">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`zz-step ${i % 2 ? 'zz-right' : 'zz-left'}`}>
                <span className="zz-node hx-reveal">{s.n}</span>
                <div className={`zz-card hx-reveal ${i % 2 ? 'from-right' : 'from-left'}`}>
                  <span className="zz-card-tag">{s.tag}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FEATURED WORK: zig-zag case studies ── */}
      <section className="hx-sec sw-sec">
        <div className="container">
          <div className="sw-head hx-reveal">
            <span className="hx-eyebrow">Selected work</span>
            <h2 className="hx-h2">Built for real businesses in <span className="gradient-text">Tamil Nadu</span></h2>
          </div>
          <div className="sw-grid">
            {featured.map(p => (
              <article key={p.id} className="sw-card hx-reveal">
                <Link to="/portfolio" className="zz-art sw-art" style={{ '--c': p.color }} aria-label={p.title}>
                  <DashMock project={p} />
                </Link>
                <div className="sw-body">
                  <span className="sw-tag">{p.categoryLabel}</span>
                  <h3>{p.title}</h3>
                  <span className="sw-client">{p.industry.replace(/\s+,/g, ',')}</span>
                  {p.metrics && (
                    <div className="sw-metrics">
                      {p.metrics.slice(0, 3).map(m => <div key={m.label}><b>{m.val}</b><small>{m.label}</small></div>)}
                    </div>
                  )}
                  <div className="sw-foot">
                    <div className="zz-tech">{(p.tech || []).slice(0, 3).map(t => <span key={t}>{t}</span>)}</div>
                    <Link to="/portfolio" className="sw-link">View case study <Arrow /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="sw-all hx-reveal">
            <Link to="/portfolio" className="hx-btn hx-btn-p">All projects <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="hx-sec wy-sec">
        <div className="container hx-why">
          <div className="hx-reveal">
            <span className="hx-eyebrow">Why Apps2Cloud</span>
            <h2 className="hx-h2">A technology partner, not just a vendor</h2>
            <p className="hx-why-p">We work with business owners who want software that fits their process, a fair price and a team that picks up the phone.</p>
            <Link to="/about" className="hx-btn hx-btn-p">About us <Arrow /></Link>
          </div>
          <div className="hx-promises">
            {PROMISES.map((p, i) => (
              <div key={p.t} className="hx-promise hx-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="hx-check">✓</span>
                <div><h3>{p.t}</h3><p>{p.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hx-sec">
        <div className="container hx-faq-wrap">
          <div className="hx-head hx-reveal">
            <span className="hx-eyebrow">FAQ</span>
            <h2 className="hx-h2">Questions business owners ask us</h2>
          </div>
          <div className="hx-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`hx-faq-i ${faq === i ? 'open' : ''}`}>
                <button type="button" onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}>
                  {f.q}<span className="hx-faq-pm" aria-hidden="true" />
                </button>
                <div className="hx-faq-a"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hx-cta-sec">
        <div className="container">
          <div className="hx-cta hx-reveal">
            <span className="hx-blob b1" aria-hidden="true" /><span className="hx-blob b2" aria-hidden="true" />
            <h2>Ready to stop running your business on paper and Excel?</h2>
            <p>Tell us what you need. You'll get a clear proposal and price within 24 hours, free and with no commitment.</p>
            <div className="hx-ctas">
              <Link to="/contact" className="hx-btn hx-btn-w">Start your project <Arrow /></Link>
              <a href="tel:+917010213133" className="hx-btn hx-btn-line">Call +91 70102 13133</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
