import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, FILTER_TABS } from '../data';
import ProjectModal from './ProjectModal';
import DashMock from './DashMock';
import './PortfolioGallery.css';

function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pg-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(.97)',
        transition: `opacity .55s var(--ease-out) ${(index % 3) * 0.08}s, transform .55s var(--ease-out) ${(index % 3) * 0.08}s`,
        '--c': project.color,
      }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(project)}
    >
      {/* Thumbnail */}
      <div className="pg-thumb">
        <div className="pg-thumb-bg" />
        <DashMock project={project} />
        <span className="pg-badge">{project.categoryLabel}</span>
        <div className="pg-overlay">
          <span className="pg-overlay-text">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            View Details
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="pg-body">
        <div className="pg-industry">{project.industry}</div>
        <h3 className="pg-title">{project.title}</h3>
        <p className="pg-desc">{project.shortDesc}</p>

        {/* Top 2 metrics */}
        <div className="pg-quick-metrics">
          {(project.metrics || []).slice(0, 2).map((m, i) => (
            <div key={i} className="pg-quick-metric">
              <span className="pgm-val">{m.val}</span>
              <span className="pgm-lbl">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="pg-footer">
          <div className="pg-tech-row">
            {(project.tech || []).slice(0, 3).map(t => (
              <span key={t} className="pg-tech-tag">{t}</span>
            ))}
            {project.tech && project.tech.length > 3 && (
              <span className="pg-tech-tag pg-tech-more">+{project.tech.length - 3}</span>
            )}
          </div>
          <button className="pg-details-btn" onClick={e => { e.stopPropagation(); onClick(project); }}>
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGallery({ filterOverride, limit, showFilters = true, showStats = true }) {
  const [filter, setFilter] = useState(filterOverride || 'all');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (filterOverride) setFilter(filterOverride);
  }, [filterOverride]);

  const filtered = (
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter(p => p.tags && p.tags.includes(filter))
  ).slice(0, limit || 9999);

  const STATS = [
    { val: '50+', label: 'Projects Delivered', icon: '🚀' },
    { val: '99.9%', label: 'Cloud Uptime', icon: '☁️' },
    { val: '20+', label: 'Mobile Applications', icon: '📱' },
    { val: '20+', label: 'Happy Clients', icon: '🤝' },
  ];

  return (
    <div className="pg-wrapper">
      {/* Stats Bar */}
      {showStats && (
        <div className="pg-stats">
          {STATS.map((s, i) => (
            <div key={i} className="pg-stat">
              <div className="pg-stat-icon">{s.icon}</div>
              <div className="pg-stat-val gradient-text">{s.val}</div>
              <div className="pg-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="pg-filters">
          {FILTER_TABS.map(f => (
            <button
              key={f.id}
              className={`pg-filter-btn ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="pg-filter-count">
                {f.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.tags?.includes(f.id)).length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="pg-empty">
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
          <p>No projects found for this category.</p>
        </div>
      ) : (
        <div className={`pg-grid ${filtered.length === 1 ? 'pg-grid-1' : filtered.length === 2 ? 'pg-grid-2' : ''}`}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={setModal} />
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
