import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICES, PROJECTS } from '../data';
import PortfolioGallery from '../components/PortfolioGallery';
import './ServicesPage.css';
import SEO from '../SEO';
import ServiceIcon from '../components/ServiceIcon';

/* ── Animated counter ── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = parseInt((target.match(/\d+/) || ['0'])[0], 10);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = () => {
        start += Math.ceil(num / 60);
        if (start >= num) { setCount(num); return; }
        setCount(start);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);

  const display = target.replace(/\d+/, count);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Service card for the overview grid ── */
function ServiceCard({ service, index }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const go = () => navigate(`/services/${service.slug}`);

  return (
    <div
      ref={ref}
      className="svc-card"
      style={{
        '--sc': service.color,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(.97)',
        transition: `all .6s var(--ease-out) ${index * 0.09}s`,
      }}
      onClick={go}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && go()}
    >
      {/* Top accent line */}
      <div className="svc-card-line" />

      <div className="svc-card-icon-wrap">
        <div className="svc-card-icon"><ServiceIcon slug={service.slug} size={30} /></div>
        <div className="svc-card-glow" />
      </div>

      <div className="svc-card-num">0{index + 1}</div>
      <h3 className="svc-card-title">{service.title}</h3>
      <p className="svc-card-desc">{service.shortDesc}</p>

      <div className="svc-card-pills">
        {service.techStack.slice(0, 3).map(t => (
          <span key={t} className="svc-pill">{t}</span>
        ))}
      </div>

      <div className="svc-card-footer">
        <div className="svc-card-badges">
          {service.hasDemo && <span className="svc-badge demo">Live Demo</span>}
          {service.hasCaseStudy && <span className="svc-badge case">Case Study</span>}
        </div>
        <span className="svc-card-arrow">→</span>
      </div>
    </div>
  );
}

/* ── Featured service row (alternating layout) ── */
function FeaturedService({ service, index }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const projects = PROJECTS.filter(p => p.tags?.includes(service.portfolioCategory)).slice(0, 2);
  const even = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`fs-row ${even ? '' : 'fs-row-rev'}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : `translateX(${even ? '-32px' : '32px'})`,
        transition: 'all .7s var(--ease-out)',
        '--sc': service.color,
      }}
    >
      {/* Visual side */}
      <div className="fs-visual">
        <div className="fs-visual-card">
          <div className="fs-visual-header">
            <div className="fs-icon-wrap">
              <div className="fs-icon"><ServiceIcon slug={service.slug} size={34} /></div>
            </div>
            <div>
              <div className="fs-visual-title">{service.shortTitle}</div>
              <div className="fs-visual-sub">{service.tagline}</div>
            </div>
          </div>

          {/* Mini stats */}
          <div className="fs-mini-stats">
            {service.stats.map((s, i) => (
              <div key={i} className="fs-mini-stat">
                <div className="fs-ms-val">{s.val}</div>
                <div className="fs-ms-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Sample project thumbnails */}
          {projects.length > 0 && (
            <div className="fs-project-previews">
              <div className="fs-pp-label">Recent Projects</div>
              {projects.map(p => (
                <div key={p.id} className="fs-pp-item">
                  <div className="fs-pp-emoji">{p.emoji}</div>
                  <div>
                    <div className="fs-pp-title">{p.title}</div>
                    <div className="fs-pp-industry">{p.industry}</div>
                  </div>
                  <div className="fs-pp-metric">{p.metrics?.[0]?.val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Glow orb */}
          <div className="fs-visual-orb" />
        </div>
      </div>

      {/* Content side */}
      <div className="fs-content">
        <div className="stag" style={{ color: service.color, background: `${service.color}14`, borderColor: `${service.color}30` }}>
          Service {String(index + 1).padStart(2, '0')}
        </div>
        <h2 className="fs-title">{service.title}</h2>
        <p className="fs-desc">{service.fullDesc}</p>

        {/* Features grid */}
        <div className="fs-features">
          {service.features.slice(0, 6).map(f => (
            <div key={f} className="fs-feature">
              <span className="fs-check" style={{ color: service.color }}>✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Use cases */}
        <div className="fs-usecases">
          <div className="fs-uc-label">Perfect for:</div>
          <div className="fs-uc-tags">
            {service.useCases.map(uc => (
              <span key={uc} className="fs-uc-tag">{uc}</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="fs-actions">
          <button className="btn btn-p" onClick={() => navigate(`/services/${service.slug}`)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
            View Full Details
          </button>
          {service.hasDemo && (
            <a href={service.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-o">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              {service.demoLabel || 'Live Demo'}
            </a>
          )}
          <Link to="/contact" className="btn btn-ghost">Discuss Project</Link>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════
   MAIN SERVICES PAGE
═════════════════════════════════ */
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const TABS = [
    { id: 'overview', label: 'All Services' },
    { id: 'featured', label: 'Detailed View' },
    { id: 'portfolio', label: 'Portfolio Showcase' },
  ];

  /* Highlight services with demo/case study */
  const FEATURED_SERVICES = SERVICES.filter(s => ['erp-software', 'web-applications', 'mobile-apps', 'cloud-hosting', 'whatsapp-business'].includes(s.slug));

  return (
    <div className="svcp-wrapper">
  


<SEO
  title="Software Services — ERP, Billing Software, Mobile Apps & Websites"
  description="We offer ERP software development, GST billing software, Android & iOS mobile apps, business website development, WhatsApp Business integration and shop management systems for Tamil Nadu businesses."
  keywords="ERP software development Tamil Nadu, GST billing software, mobile app development Tamil Nadu, business website development, WhatsApp Business API integration, ERP WhatsApp integration, shop management software, construction management software"
  url="/services"
  schema={{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Apps2Cloud Software Services",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ERP Software Development",
        "description": "Custom ERP systems for manufacturing, trading and service businesses in Tamil Nadu",
        "url": "https://apps2cloud.in/services/erp-software"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Billing Software",
        "description": "GST-compliant billing and accounting software for shops and wholesale businesses",
        "url": "https://apps2cloud.in/services/billing-software"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Mobile App Development",
        "description": "Android and iOS mobile apps for delivery, attendance, ordering and field staff",
        "url": "https://apps2cloud.in/services/mobile-apps"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Business Website Development",
        "description": "Professional websites and web applications for Tamil Nadu businesses",
        "url": "https://apps2cloud.in/services/web-applications"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "WhatsApp Business Integration",
        "description": "WhatsApp Cloud API integration that sends approved order, billing and delivery notifications from ERP and business systems",
        "url": "https://apps2cloud.in/services/whatsapp-business"
      }
    ]
  }}
/>
      {/* ── Hero ── */}
      <section className="svcp-hero">
        <div className="svcp-hero-bg" />
        <div className="svcp-hero-grid" />
        <div className="container svcp-hero-inner">
          <div className="stag anim-up">What We Build</div>
          <h1 className="svcp-hero-title anim-up" style={{ animationDelay: '.1s' }}>
            Transforming Ideas <span className="gradient-text">Into </span>
            <br />Digital Reality
          </h1>
          <p className="svcp-hero-sub anim-up" style={{ animationDelay: '.2s' }}>
            From enterprise ERP to cloud infrastructure — we engineer premium digital products that give Indian businesses a competitive edge.
          </p>
          <div className="svcp-hero-ctas anim-up" style={{ animationDelay: '.3s' }}>
            <Link to="/contact" className="btn btn-p btn-lg">Get Free Consultation →</Link>
            <a href="#portfolio-section" className="btn btn-o btn-lg" onClick={e => { e.preventDefault(); setActiveTab('portfolio'); requestAnimationFrame(() => document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' })); }}>
              View Portfolio
            </a>
          </div>

          {/* Stats row */}
          <div className="svcp-hero-stats anim-up" style={{ animationDelay: '.4s' }}>
            {[
              { val: '30+', label: 'Projects Delivered' },
              { val: '99.9%', label: 'Uptime SLA' },
              { val: '24/7', label: 'Support' },
            ].map((s, i) => (
              <div key={i} className="svcp-hero-stat">
                <div className="svcp-hs-val gradient-text">{s.val}</div>
                <div className="svcp-hs-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <div className="svcp-tabs-wrap">
        <div className="container">
          <div className="svcp-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`svcp-tab ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          TAB: ALL SERVICES (Cards)
      ══════════════════════════ */}
      {activeTab === 'overview' && (
        <section className="svcp-overview">
          <div className="container">
            <div className="svcp-grid">
              {SERVICES.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>

            {/* Process Steps */}
            <div className="svcp-process">
              <div className="svcp-process-header">
                <div className="stag" style={{ margin: '0 auto 16px' }}>How We Work</div>
                <h2 className="svcp-process-title stitle">From Idea to <span className="gradient-text">Launch</span></h2>
              </div>
              <div className="svcp-process-steps">
                {[
                  { num: '01', icon: '🗣️', title: 'Discovery Call', desc: 'We understand your business, goals, and technical requirements in a 45-minute consultation.' },
                  { num: '02', icon: '📐', title: 'Proposal & Design', desc: 'We deliver a detailed technical proposal, wireframes, and fixed-price quote within 48 hours.' },
                  { num: '03', icon: '⚡', title: 'Agile Development', desc: 'Weekly sprints with demos. You see working software every 7 days — no surprises.' },
                  { num: '04', icon: '🚀', title: 'Launch & Support', desc: 'We deploy, test, train your team, and provide 3 months of post-launch support.' },
                ].map((s, i) => (
                  <div key={i} className="svcp-step">
                    <div className="svcp-step-num">{s.num}</div>
                    <div className="svcp-step-icon">{s.icon}</div>
                    <h4 className="svcp-step-title">{s.title}</h4>
                    <p className="svcp-step-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════
          TAB: DETAILED VIEW
      ══════════════════════════ */}
      {activeTab === 'featured' && (
        <section className="svcp-featured">
          <div className="container">
            <div className="svcp-featured-intro">
              <div className="stag">Deep Dives</div>
              <h2 className="stitle">Services with <span className="gradient-text">Live Demos & Case Studies</span></h2>
              <p className="ssub">Explore our most requested services — with real metrics, actual projects, and demo access.</p>
            </div>
            <div className="svcp-featured-list">
              {FEATURED_SERVICES.map((s, i) => (
                <FeaturedService key={s.slug} service={s} index={i} />
              ))}
            </div>

            {/* Other services compact */}
            <div className="svcp-other-services">
              <h3 className="svcp-other-title">Other Services</h3>
              <div className="svcp-other-grid">
                {SERVICES.filter(s => !FEATURED_SERVICES.find(f => f.slug === s.slug)).map(s => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="svcp-other-card">
                    <span className="svcp-other-icon"><ServiceIcon slug={s.slug} size={20} /></span>
                    <span className="svcp-other-label">{s.title}</span>
                    <span className="svcp-other-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════
          TAB: PORTFOLIO
      ══════════════════════════ */}
      {activeTab === 'portfolio' && (
        <section className="svcp-portfolio" id="portfolio-section">
          <div className="container">
            <div className="svcp-portfolio-intro">
              <div className="stag">Portfolio Showcase</div>
              <h2 className="stitle">Real Projects. <span className="gradient-text">Real Results.</span></h2>
              <p className="ssub">Browse our complete portfolio with live demos, case studies, and client success metrics.</p>
            </div>
            <PortfolioGallery showStats={true} showFilters={true} />
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="svcp-cta">
        <div className="svcp-cta-bg" />
        <div className="svcp-cta-orb-1" />
        <div className="svcp-cta-orb-2" />
        <div className="container svcp-cta-inner">
          <div className="stag" style={{ margin: '0 auto 20px', justifyContent: 'center' }}>Start Today</div>
          <h2 className="svcp-cta-title">Want a <span className="gradient-text">Similar Solution?</span></h2>
          <p className="svcp-cta-sub">
            Tell us about your project and we'll send you a detailed proposal, technical approach, and cost estimate within 24 hours — completely free.
          </p>
          <div className="svcp-cta-actions">
            <Link to="/contact" className="btn btn-p btn-lg">
              📅 Schedule a Free Consultation
            </Link>
            <a href="https://wa.me/917010213133?text=Hello%20Apps2Cloud!" target="_blank" rel="noopener noreferrer" className="btn btn-o btn-lg">
              💬 WhatsApp Us Now
            </a>
          </div>
          <div className="svcp-cta-trust">
            {['🔒 NDA Protected', '⚡ 24h Response', '🎯 Free Consultation', '✅ No Commitment Required'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
