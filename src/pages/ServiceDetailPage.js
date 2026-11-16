import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES, PROJECTS } from '../data';
import PortfolioGallery from '../components/PortfolioGallery';
import ServiceIcon from '../components/ServiceIcon';
import SEO from '../SEO';
import './ServiceDetailPage.css';

/* Animated counter */
function Counter({ target }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const num = parseInt((target.match(/\d+/) || ['0'])[0], 10);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      let x = 0;
      const go = () => { x += Math.ceil(num/55); if(x>=num){setN(num);return;} setN(x); requestAnimationFrame(go); };
      requestAnimationFrame(go);
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{target.replace(/\d+/,n)}</span>;
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.slug === slug);

  useEffect(() => {
    if (!service) navigate('/services', { replace: true });
  }, [service, navigate]);

  if (!service) return null;

  const relatedProjects = PROJECTS.filter(p => p.tags?.includes(service.portfolioCategory));
  const otherServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 4);
  const demoLabel = service.demoLabel || 'View Live Demo';

  /* Per-service SEO, driven by service data (optional service.seo overrides) */
  const seoTitle = service.seo?.title || service.title;
  const seoDescription = service.seo?.description || service.shortDesc;
  const seoKeywords = service.seo?.keywords || `${service.title}, ${service.shortTitle} Tamil Nadu, Apps2Cloud`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.fullDesc,
    url: `https://apps2cloud.in/services/${service.slug}`,
    areaServed: 'IN',
    provider: { '@type': 'Organization', name: 'Apps2Cloud', url: 'https://apps2cloud.in' },
  };

  const DEFAULT_FAQS = [
    { q: `How long does a ${service.shortTitle} project take?`, a: `Typical ${service.shortTitle} projects take 6–16 weeks depending on complexity. We'll give you a precise timeline in our proposal after the discovery call.` },
    { q: 'Do you offer a fixed price or hourly?', a: 'We offer fixed-price contracts for clearly defined projects. This protects you from budget overruns. We also offer hourly engagement for ongoing support.' },
    { q: 'Can we own the source code?', a: 'Absolutely. You get full source code ownership upon project completion and final payment. We sign an NDA and IP assignment agreement upfront.' },
    { q: 'Do you provide post-launch support?', a: 'Yes — all projects include 3 months of post-launch support (bug fixes, minor changes, training). We offer extended maintenance contracts after that.' },
    { q: 'Can you integrate with our existing systems?', a: 'Yes. We have extensive experience integrating with ERP systems, payment gateways, HR tools, and third-party APIs. Existing systems are no barrier.' },
  ];
  const faqs = service.faqs?.length ? service.faqs : DEFAULT_FAQS;

  return (
    <div className="sdp-wrapper">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={`/services/${service.slug}`}
        schema={serviceSchema}
      />

      {/* ── Breadcrumb ── */}
      <div className="sdp-breadcrumb">
        <div className="container sdp-bc-inner">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/services">Services</Link>
          <span>›</span>
          <span>{service.shortTitle}</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="sdp-hero" style={{ '--sc': service.color }}>
        <div className="sdp-hero-bg" />
        <div className="sdp-orb-1" />
        <div className="sdp-orb-2" />
        <div className="container sdp-hero-inner">
          <div className="sdp-hero-left">
            <div className="sdp-icon-badge" style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}>
              <ServiceIcon slug={service.slug} size={30} />
            </div>
            <div className="stag anim-up" style={{ color: service.color, background: `${service.color}14`, borderColor: `${service.color}30`, marginBottom: 20 }}>
              {service.shortTitle}
            </div>
            <h1 className="sdp-hero-title anim-up" style={{ animationDelay: '.1s' }}>
              {service.title}
            </h1>
            <p className="sdp-hero-sub anim-up" style={{ animationDelay: '.2s' }}>
              {service.fullDesc}
            </p>
            <div className="sdp-hero-ctas anim-up" style={{ animationDelay: '.3s' }}>
              <Link to="/contact" className="btn btn-p btn-lg">
                📅 Get Free Consultation
              </Link>
              {service.hasDemo && (
                <a href={service.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-o btn-lg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                  {demoLabel}
                </a>
              )}
            </div>

            {/* Trust badges */}
            <div className="sdp-trust anim-up" style={{ animationDelay: '.4s' }}>
              {['🔒 NDA Protected','⚡ 24h Response','✅ Fixed-price Contracts'].map(t => (
                <span key={t} className="sdp-trust-badge">{t}</span>
              ))}
            </div>
          </div>

          <div className="sdp-hero-right">
            {/* Service Overview Card */}
            <div className="sdp-overview-card gcard" style={{ '--card-c': service.color }}>
              <div className="sdp-oc-header" style={{ background: `linear-gradient(135deg,${service.color}18,transparent)` }}>
                <ServiceIcon slug={service.slug} size={40} />
                <div>
                  <div className="sdp-oc-title">{service.shortTitle}</div>
                  <div className="sdp-oc-tag">{service.tagline}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="sdp-oc-stats">
                {service.stats.map((s, i) => (
                  <div key={i} className="sdp-oc-stat">
                    <div className="sdp-oc-stat-val" style={{ color: service.color }}>
                      <Counter target={s.val} />
                    </div>
                    <div className="sdp-oc-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="sdp-oc-tech">
                <div className="sdp-oc-tech-label">Tech Stack</div>
                <div className="sdp-oc-tech-pills">
                  {service.techStack.map(t => (
                    <span key={t} className="sdp-tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="sdp-oc-actions">
                <Link to="/contact" className="btn btn-p" style={{ width: '100%', justifyContent: 'center' }}>
                  Start This Project →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="sdp-features" style={{ '--sc': service.color }}>
        <div className="container">
          <div className="sdp-features-header">
            <div className="stag" style={{ color: service.color, background: `${service.color}14`, borderColor: `${service.color}30` }}>
              What's Included
            </div>
            <h2 className="stitle">Everything You Need, <span className="gradient-text">Nothing You Don't</span></h2>
            <p className="ssub">Every feature is purposefully built for real-world business requirements — not just feature-list padding.</p>
          </div>

          <div className="sdp-features-grid">
            {service.features.map((f, i) => (
              <FeatureItem key={i} feature={f} index={i} color={service.color} />
            ))}
          </div>

          {/* Use Cases */}
          <div className="sdp-usecases-wrap">
            <h3 className="sdp-uc-title">Who Is This For?</h3>
            <div className="sdp-uc-grid">
              {service.useCases.map((uc, i) => (
                <div key={i} className="sdp-uc-card gcard" style={{ '--sc': service.color }}>
                  <div className="sdp-uc-icon">🏢</div>
                  <div className="sdp-uc-name">{uc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio for This Service ── */}
      {relatedProjects.length > 0 && (
        <section className="sdp-portfolio">
          <div className="container">
            <div className="sdp-portfolio-header">
              <div className="stag" style={{ color: service.color, background: `${service.color}14`, borderColor: `${service.color}30` }}>
                Case Studies
              </div>
              <h2 className="stitle">Real Projects. <span className="gradient-text">Real Results.</span></h2>
              <p className="ssub">
                Browse actual {service.shortTitle} solutions we've delivered — with live demos, client success metrics, and case studies.
              </p>
            </div>

            {/* Demo CTA Banner */}
            {service.hasDemo && (
              <div className="sdp-demo-banner" style={{ '--sc': service.color }}>
                <div className="sdp-demo-banner-inner">
                  <div className="sdp-demo-icon">🖥️</div>
                  <div>
                    <div className="sdp-demo-title">Try the Live Demo</div>
                    <div className="sdp-demo-sub">See a fully functional {service.shortTitle} system — no signup required.</div>
                  </div>
                  <a href={service.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-p">
                    Launch Demo →
                  </a>
                </div>
              </div>
            )}

            <PortfolioGallery
              filterOverride={service.portfolioCategory}
              showStats={false}
              showFilters={false}
            />

            {relatedProjects.length === 0 && (
              <div className="sdp-no-projects">
                <p>Portfolio case studies coming soon. <Link to="/contact">Contact us</Link> to discuss your project.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Demo CTA (services with a demo but no portfolio projects yet) ── */}
      {service.hasDemo && relatedProjects.length === 0 && (
        <section className="sdp-demo-section" style={{ '--sc': service.color }}>
          <div className="container">
            <div className="sdp-demo-banner" style={{ '--sc': service.color, background: `linear-gradient(135deg,${service.color}14,transparent 80%)`, borderColor: `${service.color}30` }}>
              <div className="sdp-demo-banner-inner">
                <div className="sdp-demo-icon"><ServiceIcon slug={service.slug} size={32} /></div>
                <div className="sdp-demo-text">
                  <div className="sdp-demo-title">{service.demoTitle || 'Try the Live Demo'}</div>
                  <div className="sdp-demo-sub">{service.demoDesc || `See a fully functional ${service.shortTitle} system — no signup required.`}</div>
                </div>
                <a href={service.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-p">
                  {demoLabel} →
                </a>
              </div>
            </div>
            {service.privacyNote && (
              <p className="sdp-privacy-note">
                {service.privacyNote}{' '}
                Read how we handle personal information in our <Link to="/privacy-policy">Privacy Policy</Link>.
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── Process ── */}
      <section className="sdp-process">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="stag" style={{ margin: '0 auto 16px' }}>Our Process</div>
            <h2 className="stitle">How We Deliver <span className="gradient-text">Your Project</span></h2>
          </div>
          <div className="sdp-process-steps">
            {[
              { num: '01', icon: '🗣️', title: 'Free Consultation', desc: '45-minute call to understand your requirements, goals, and existing systems.' },
              { num: '02', icon: '📐', title: 'Proposal & Quote', desc: 'Detailed technical proposal with wireframes, timeline, and fixed-price quote within 48h.' },
              { num: '03', icon: '⚡', title: 'Agile Development', desc: 'Weekly sprint demos. You see working software every 7 days — full transparency.' },
              { num: '04', icon: '🧪', title: 'Testing & QA', desc: 'Rigorous automated and manual testing. Load tests, security scans, UAT with your team.' },
              { num: '05', icon: '🚀', title: 'Launch & Deploy', desc: 'Zero-downtime deployment with full monitoring setup and go-live support.' },
              { num: '06', icon: '🛎️', title: 'Post-launch Support', desc: '3 months of included support — bug fixes, training, and minor enhancements.' },
            ].map((s, i) => (
              <div key={i} className="sdp-step gcard">
                <div className="sdp-step-num">{s.num}</div>
                <div className="sdp-step-icon">{s.icon}</div>
                <h4 className="sdp-step-title">{s.title}</h4>
                <p className="sdp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sdp-faq">
        <div className="container sdp-faq-inner">
          <div>
            <div className="stag">FAQ</div>
            <h2 className="stitle">Common <span className="gradient-text">Questions</span></h2>
            <p className="ssub" style={{ marginBottom: 36 }}>Answers to what clients usually ask before starting a project.</p>
            <Link to="/contact" className="btn btn-p">Ask Us Anything →</Link>
          </div>
          <div className="sdp-faq-list">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className="sdp-other">
        <div className="container">
          <h3 className="sdp-other-title">Explore Other Services</h3>
          <div className="sdp-other-grid">
            {otherServices.map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="sdp-other-card gcard">
                <div className="sdp-other-icon" style={{ background: `${s.color}14`, border: `1px solid ${s.color}25` }}><ServiceIcon slug={s.slug} size={20} /></div>
                <div>
                  <div className="sdp-other-name">{s.shortTitle}</div>
                  <div className="sdp-other-desc">{s.tagline}</div>
                </div>
                <span className="sdp-other-arr" style={{ color: s.color }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="sdp-cta" style={{ '--sc': service.color }}>
        <div className="sdp-cta-orb" />
        <div className="container sdp-cta-inner">
          <div className="sdp-cta-text">
            <h2 className="sdp-cta-title">{service.ctaTitle || `Ready to Build Your ${service.shortTitle}?`}</h2>
            <p className="sdp-cta-sub">
              Get a free consultation, technical proposal, and cost estimate within 24 hours. No commitment required.
            </p>
          </div>
          <div className="sdp-cta-actions">
            <Link to="/contact" className="btn btn-p btn-lg">
              📅 Schedule Free Consultation
            </Link>
            <a href="https://wa.me/917010213133" target="_blank" rel="noopener noreferrer" className="btn btn-o btn-lg">
              💬 WhatsApp Us
            </a>
            {service.privacyNote && (
              <p className="sdp-cta-privacy">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* Feature item */
function FeatureItem({ feature, index, color }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="sdp-feature-item gcard"
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `all .5s var(--ease-out) ${(index % 4) * .07}s` }}>
      <div className="sdp-fi-check" style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}>✓</div>
      <span className="sdp-fi-text">{feature}</span>
    </div>
  );
}

/* FAQ item with accordion */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{q}</span>
        <div className={`faq-icon ${open ? 'open' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      <div className="faq-a" style={{ maxHeight: open ? '400px' : '0' }}>
        <p>{a}</p>
      </div>
    </div>
  );
}
