import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sections.css';

// ===========================
// INDUSTRIES
// ===========================
const INDUSTRIES = [
  { icon: '🏗️', name: 'Construction', desc: 'Project tracking, contractor billing, BOQ & progress reports' },
  { icon: '🏥', name: 'Healthcare', desc: 'Hospital management, patient records & pharmacy systems' },
  { icon: '🛍️', name: 'Retail', desc: 'POS, inventory management & e-commerce integrations' },
  { icon: '🎓', name: 'Education', desc: 'LMS, student portals, fees & attendance management' },
  { icon: '🏭', name: 'Manufacturing', desc: 'Production planning, quality control & supply chain' },
  { icon: '💰', name: 'Finance', desc: 'Accounting systems, loan tracking & compliance reporting' },
  { icon: '🚛', name: 'Logistics', desc: 'Fleet management, route optimization & delivery tracking' },
  { icon: '🏨', name: 'Hospitality', desc: 'Hotel PMS, reservations & guest experience systems' },
];

export function Industries() {
  return (
    <section className="industries-section">
      <div className="container">
        <div className="section-header centered">
          <div className="section-tag">Industries We Serve</div>
          <h2 className="section-title">Built for <span className="gradient-text">Every Sector</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Deep domain expertise across diverse industries, delivering solutions that understand your unique challenges.
          </p>
        </div>

        <div className="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={i} {...ind} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({ icon, name, desc, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="industry-card glass-card"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.5s ease ${index * 0.07}s` }}>
      <div className="industry-icon">{icon}</div>
      <h4 className="industry-name">{name}</h4>
      <p className="industry-desc">{desc}</p>
    </div>
  );
}

// ===========================
// WHY CHOOSE US
// ===========================
const FEATURES = [
  { icon: '⚡', title: 'Scalable Architecture', desc: 'Built to grow with your business — handle thousands of users without breaking a sweat.' },
  { icon: '🔒', title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime SLA, regular audits and backups.' },
  { icon: '☁️', title: 'Cloud-Native Integration', desc: 'AWS, Azure, GCP deployments with auto-scaling, CDN and serverless support.' },
  { icon: '📊', title: 'Real-time Analytics', desc: 'Live dashboards, custom reports and actionable insights to drive decisions.' },
  { icon: '🧩', title: 'Modular & Customizable', desc: 'Pay only for what you need. Expand with plug-and-play modules anytime.' },
  { icon: '🛎️', title: '24/7 Dedicated Support', desc: 'Round-the-clock technical assistance, maintenance and rapid bug fixes.' },
];

export function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-bg-orb" />
      <div className="container">
        <div className="why-inner">
          <div className="why-left">
            <div className="section-tag">Why Apps2Cloud</div>
            <h2 className="section-title">Your Success is Our <span className="gradient-text">Primary Goal</span></h2>
            <p className="section-subtitle">
              We don't just write code. We become your technology partner — understanding your business, your users, and your growth ambitions.
            </p>
            <div className="why-highlights">
              {['ISO-aligned processes', 'Agile development', 'Fixed-price contracts', 'NDA protected'].map(h => (
                <div key={h} className="why-highlight-item">
                  <span className="why-check">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 32 }}>
              Start Your Project
            </Link>
          </div>

          <div className="why-right">
            {FEATURES.map((f, i) => (
              <FeatureItem key={i} {...f} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, desc, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="feature-item"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(30px)', transition: `all 0.55s ease ${index * 0.09}s` }}>
      <div className="feature-icon-box">{icon}</div>
      <div>
        <h4 className="feature-title">{title}</h4>
        <p className="feature-desc">{desc}</p>
      </div>
    </div>
  );
}

// ===========================
// TESTIMONIALS
// ===========================
const TESTIMONIALS = [
  {
    name: 'Ravi Kumar', role: 'MD, Bharath Constructions',
    text: 'Apps2Cloud built our construction management system from scratch. The project tracking and billing modules saved us 20+ hours a week. Excellent team and delivery.',
    avatar: 'RK', rating: 5,
  },
  {
    name: 'Arthi Rajesh', role: 'CEO, MedCore Clinics',
    text: 'Their hospital management software is intuitive and complete. The mobile app for doctors is brilliant. Our staff adopted it within days.',
    avatar: 'PS', rating: 5,
  },
  {
    name: 'Sasitharan', role: 'Director, Dream House Construction ,Rajapalayam',
    text: 'We had a custom ERP requirement with multi-location inventory. Apps2Cloud delivered on time, within budget, and the system is rock-solid.',
    avatar: 'SP', rating: 5,
  },
  {
    name: 'Anitha Raj', role: 'Principal, GreenLeaf School',
    text: 'The student management portal and fee collection app completely transformed our admin work. Parents love the mobile app too!',
    avatar: 'AR', rating: 5,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-bg" />
      <div className="container">
        <div className="section-header centered">
          <div className="section-tag">Client Stories</div>
          <h2 className="section-title">Trusted by <span className="gradient-text">Industry Leaders</span></h2>
        </div>

        <div className="testimonials-carousel">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testimonial-card glass-card ${i === active ? 'active' : ''}`}
              style={{ transform: i === active ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)', opacity: i === active ? 1 : 0.35, transition: 'all 0.5s ease', pointerEvents: i === active ? 'auto' : 'none' }}>
              <div className="testimonial-stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-dots">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} className={`dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===========================
// CTA SECTION
// ===========================
export function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <div className="cta-orb-1" />
        <div className="cta-orb-2" />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>Ready to Build?</div>
          <h2 className="cta-title">Let's Build Your Next <span className="gradient-text">Digital Product</span></h2>
          <p className="cta-subtitle">
            Tell us about your project and we'll provide a free consultation, technical proposal and cost estimate.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn-main">
              Contact Us Today
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </Link>
            <a href="tel:+917010213133" className="btn btn-outline">
              📞 Call Us Now
            </a>
          </div>
          <div className="cta-trust">
            <span>🔒 NDA protected</span>
            <span>⚡ 24h response</span>
            <span>🎯 Free consultation</span>
            <span>✅ No commitment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
