import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SEO from '../SEO';
import './LegalPage.css';

const CONTACT = {
  email: 'support@apps2cloud.in',
  phone: '+91 70102 13133',
  phoneHref: 'tel:+917010213133',
  whatsapp: 'https://wa.me/917010213133',
  website: 'apps2cloud.in',
  location: 'Tamil Nadu, India',
};

const LEGAL_PAGES = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-of-service', label: 'Terms of Service' },
];

/* Turn email addresses inside plain text into mailto links */
function Linkify({ text }) {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g);
  return parts.map((part, i) =>
    /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)
      ? <a key={i} href={`mailto:${part}`}>{part}</a>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

function Block({ block }) {
  if (block.p) return <p><Linkify text={block.p} /></p>;
  if (block.h3) return <h3>{block.h3}</h3>;
  if (block.ul) return <ul className="lgl-list">{block.ul.map((li, i) => <li key={i}><Linkify text={li} /></li>)}</ul>;
  if (block.ol) return <ol className="lgl-steps">{block.ol.map((li, i) => <li key={i}><Linkify text={li} /></li>)}</ol>;
  if (block.links) {
    return (
      <div className="lgl-ext-links">
        {block.links.map(l => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lgl-ext-link">
            {l.label}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    );
  }
  return null;
}

function ContactCard() {
  return (
    <div className="lgl-contact">
      <div className="lgl-contact-grid">
        <a href={`mailto:${CONTACT.email}`} className="lgl-contact-item">
          <span className="lgl-ci-label">Email</span>
          <span className="lgl-ci-val">{CONTACT.email}</span>
        </a>
        <a href={CONTACT.phoneHref} className="lgl-contact-item">
          <span className="lgl-ci-label">Phone / WhatsApp</span>
          <span className="lgl-ci-val">{CONTACT.phone}</span>
        </a>
        <a href="https://apps2cloud.in" className="lgl-contact-item">
          <span className="lgl-ci-label">Website</span>
          <span className="lgl-ci-val">{CONTACT.website}</span>
        </a>
        <div className="lgl-contact-item">
          <span className="lgl-ci-label">Location</span>
          <span className="lgl-ci-val">{CONTACT.location}</span>
        </div>
      </div>
      <div className="lgl-contact-actions">
        <Link to="/contact" className="btn btn-p">Contact us</Link>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-o">💬 WhatsApp us</a>
      </div>
    </div>
  );
}

export default function LegalPage({ content }) {
  const { title, updated, intro, highlights, sections, slug, seoDescription } = content;
  const [active, setActive] = useState(sections[0]?.id);

  const readMinutes = useMemo(() => {
    const words = JSON.stringify(sections).split(/\s+/).length;
    return Math.max(1, Math.round(words / 220));
  }, [sections]);

  /* Highlight the section currently being read */
  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  /* Support deep links such as /privacy-policy#data-deletion */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 450);
    return () => clearTimeout(t);
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
  };

  const toc = (
    <ol className="lgl-toc-list">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} onClick={e => goTo(e, s.id)} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'location' : undefined}>
            <span className="lgl-toc-num">{i + 1}</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="lgl-page">
      <SEO title={title} description={seoDescription} url={`/${slug}`} />

      {/* ── Header ── */}
      <header className="lgl-hero">
        <div className="lgl-hero-glow" aria-hidden="true" />
        <div className="container lgl-hero-inner">
          <nav className="lgl-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>{title}</span>
          </nav>

          <nav className="lgl-switch" aria-label="Legal documents">
            {LEGAL_PAGES.map(p => (
              <NavLink key={p.to} to={p.to} className={({ isActive }) => `lgl-switch-btn ${isActive ? 'is-active' : ''}`}>
                {p.label}
              </NavLink>
            ))}
          </nav>

          <h1 className="lgl-title">{title}</h1>
          <p className="lgl-intro">{intro}</p>

          <div className="lgl-meta">
            <span><strong>Last updated</strong> {updated}</span>
            <span>{sections.length} sections</span>
            <span>{readMinutes} min read</span>
            <button type="button" className="lgl-print" onClick={() => window.print()}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
              </svg>
              Print or save as PDF
            </button>
          </div>
        </div>
      </header>

      {/* ── At a glance ── */}
      {highlights?.length > 0 && (
        <section className="lgl-glance" aria-labelledby="lgl-glance-title">
          <div className="container">
            <h2 id="lgl-glance-title" className="lgl-glance-title">At a glance</h2>
            <div className="lgl-glance-grid">
              {highlights.map(h => (
                <div key={h.title} className="lgl-glance-card">
                  <span className="lgl-glance-icon" aria-hidden="true">{h.icon}</span>
                  <h3>{h.title}</h3>
                  <p><Linkify text={h.text} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Body ── */}
      <div className="container lgl-body">
        <aside className="lgl-toc" aria-label="On this page">
          <div className="lgl-toc-title">On this page</div>
          {toc}
        </aside>

        <details className="lgl-toc-mobile">
          <summary>On this page</summary>
          {toc}
        </details>

        <article className="lgl-content">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="lgl-section">
              <h2 className="lgl-h2">
                <span className="lgl-num">{i + 1}</span>
                {s.title}
              </h2>
              {s.blocks.map((b, j) => <Block key={j} block={b} />)}
              {s.id === 'contact' && <ContactCard />}
            </section>
          ))}

          <div className="lgl-end">
            <span>© {new Date().getFullYear()} Apps2Cloud. All rights reserved.</span>
            <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a>
          </div>
        </article>
      </div>
    </div>
  );
}
