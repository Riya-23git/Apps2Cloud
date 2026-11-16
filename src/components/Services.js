import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const SERVICES = [
  {
    icon: '🧩',
    title: 'ERP Software Development',
    desc: 'End-to-end enterprise resource planning systems tailored for your business workflows — inventory, HR, procurement, and more.',
    tags: ['Modular', 'Scalable', 'Real-time'],
    color: '#f97316',
  },
  {
    icon: '🏗️',
    title: 'Construction Management Systems',
    desc: 'Comprehensive platforms for project tracking, BOQ management, contractor billing, and site progress reporting.',
    tags: ['BOQ', 'Progress Tracking', 'Billing'],
    color: '#f59e0b',
  },
  {
    icon: '💳',
    title: 'Billing & Accounting Software',
    desc: 'GST-compliant invoicing, multi-branch accounting, stock management, and financial reporting built for Indian businesses.',
    tags: ['GST Ready', 'Multi-branch', 'Reports'],
    color: '#db630c',
  },
  {
    icon: '🌐',
    title: 'Custom Web Applications',
    desc: 'Bespoke web platforms for portals, dashboards, booking systems, CRM, and any industry-specific digital solution.',
    tags: ['React', 'Node.js', 'REST API'],
    color: '#fb923c',
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'Cross-platform Android & iOS apps with native performance, offline capabilities, and seamless backend integration.',
    tags: ['Android', 'iOS', 'Flutter'],
    color: '#f38816',
  },
  {
    icon: '💡',
    title: 'IT Consulting & Digital Transformation',
    desc: 'Strategic technology roadmaps, cloud migration, legacy system modernization, and digital-first business processes.',
    tags: ['Cloud', 'Strategy', 'DevOps'],
    color: '#f39516',
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="service-card glass-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
        '--card-accent': service.color,
      }}
    >
      <div className="service-icon-wrap">
        <div className="service-icon">{service.icon}</div>
        <div className="service-icon-glow" />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.desc}</p>
      <div className="service-tags">
        {service.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
      </div>
      <Link to="/services" className="service-link">
        Learn More
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <path d="M3 8h10M9 4l4 4-4 4"/>
        </svg>
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Our Services</div>
          <h2 className="section-title">Everything You Need to <span className="gradient-text">Go Digital</span></h2>
          <p className="section-subtitle">
            From concept to deployment, we build software solutions that solve real problems and drive measurable results.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>

        <div className="services-cta">
          <Link to="/contact" className="btn btn-primary">
            Discuss Your Project
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </Link>
          <Link to="/portfolio" className="btn btn-outline">View Our Work</Link>
        </div>
      </div>
    </section>
  );
}
