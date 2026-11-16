import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Apex ERP Suite',
    category: 'erp',
    categoryLabel: 'ERP Software',
    desc: 'Full-featured ERP for a manufacturing company — inventory, purchase orders, HR, payroll, and real-time dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    color: '#f97316',
    emoji: '🏭',
    metrics: ['40% cost reduction', '3x faster reporting', '500+ daily users'],
  },
  {
    id: 2,
    title: 'BuildTrack Pro',
    category: 'construction',
    categoryLabel: 'Construction CMS',
    desc: 'Construction project management platform with site tracking, BOQ, contractor billing, and progress photos.',
    tech: ['React', 'Python', 'MongoDB', 'GCP'],
    color: '#f59e0b',
    emoji: '🏗️',
    metrics: ['25 project sites', 'Real-time tracking', 'Mobile-first'],
  },
  {
    id: 3,
    title: 'MediCare HMS',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    desc: 'Hospital management app with OPD registration, appointment booking, pharmacy, billing, and doctor portal.',
    tech: ['Flutter', 'Firebase', 'Node.js'],
    color: '#db630c',
    emoji: '🏥',
    metrics: ['iOS & Android', '10,000+ patients', '4.8★ rating'],
  },
  {
    id: 4,
    title: 'RetailPOS Cloud',
    category: 'web',
    categoryLabel: 'Web Application',
    desc: 'GST-compliant POS and inventory management for a multi-branch retail chain with cloud sync and analytics.',
    tech: ['Vue.js', 'Laravel', 'MySQL'],
    color: '#fb923c',
    emoji: '🛍️',
    metrics: ['12 branches', 'GST compliant', 'Offline mode'],
  },
  {
    id: 5,
    title: 'SchoolBridge LMS',
    category: 'web',
    categoryLabel: 'Web Application',
    desc: 'Learning management system for a school group with video lessons, assessments, attendance, and fee collection.',
    tech: ['React', 'Django', 'Redis', 'S3'],
    color: '#f38816',
    emoji: '🎓',
    metrics: ['5,000 students', 'HD video lessons', 'Parent portal'],
  },
  {
    id: 6,
    title: 'LogiFleet Tracker',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    desc: 'Real-time fleet management and delivery tracking app for a logistics company with route optimization.',
    tech: ['React Native', 'Google Maps API', 'Node.js'],
    color: '#f39516',
    emoji: '🚛',
    metrics: ['200+ vehicles', 'Live GPS', 'Delivery ETA'],
  },
];

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'erp', label: 'ERP' },
  { id: 'construction', label: 'Construction' },
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile Apps' },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="project-card glass-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
        '--card-color': project.color,
      }}
    >
      <div className="project-preview" style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}06)` }}>
        <div className="project-emoji">{project.emoji}</div>
        <span className="project-category-badge">{project.categoryLabel}</span>
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-metrics">
          {project.metrics.map(m => (
            <span key={m} className="project-metric">✓ {m}</span>
          ))}
        </div>
        <div className="project-tech">
          {project.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
        </div>
        <Link to="/contact" className="project-cta">
          Request Similar Solution
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function Portfolio({ limit }) {
  const [filter, setFilter] = useState('all');

  const filtered = (filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter))
    .slice(0, limit);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-header centered">
          <div className="section-tag">Our Portfolio</div>
          <h2 className="section-title">Products We've <span className="gradient-text">Built & Launched</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Real solutions built for real businesses — each project crafted with precision, purpose, and passion.
          </p>
        </div>

        {!limit && (
          <div className="portfolio-filters">
            {FILTERS.map(f => (
              <button
                key={f.id}
                className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="portfolio-grid">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {limit && (
          <div className="portfolio-view-all">
            <Link to="/portfolio" className="btn btn-outline">
              View All Projects
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
