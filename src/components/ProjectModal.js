import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!project) return null;

  const screens = project.screenshots || ['📊', '📱', '☁️', '📈'];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box modal-scroll">
        {/* Close */}
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Header */}
        <div className="modal-header" style={{ '--mc': project.color }}>
          <div className="modal-header-bg" />
          <div className="modal-header-inner">
            <span className="modal-cat-badge">{project.categoryLabel}</span>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-industry">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <path d="M13 7c0 5-5 8-5 8S3 12 3 7a5 5 0 0110 0z"/>
                <circle cx="8" cy="7" r="1.5"/>
              </svg>
              {project.industry}
            </p>
          </div>
        </div>

        {/* Screenshot Carousel */}
        <div className="modal-carousel" style={{ '--mc': project.color }}>
          <div className="carousel-main">
            <div className="carousel-screen" style={{ background: `${project.color}12` }}>
              <div className="carousel-emoji">{screens[imgIdx]}</div>
              <div className="carousel-label">Screenshot {imgIdx + 1} of {screens.length}</div>
            </div>
            <button className="carousel-arrow left" onClick={() => setImgIdx(i => (i - 1 + screens.length) % screens.length)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="carousel-arrow right" onClick={() => setImgIdx(i => (i + 1) % screens.length)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
          <div className="carousel-dots">
            {screens.map((_, i) => (
              <button key={i} className={`cdot ${i === imgIdx ? 'active' : ''}`} onClick={() => setImgIdx(i)} />
            ))}
          </div>
        </div>

        <div className="modal-body">
          {/* Description */}
          <div className="modal-section">
            <h3 className="modal-section-title">Project Overview</h3>
            <p className="modal-desc">{project.fullDesc}</p>
          </div>

          {/* Metrics */}
          <div className="modal-section">
            <h3 className="modal-section-title">Client Impact & Results</h3>
            <div className="modal-metrics">
              {(project.metrics || []).map((m, i) => (
                <div key={i} className="modal-metric" style={{ '--mc': project.color }}>
                  <div className="modal-metric-icon">{m.icon}</div>
                  <div className="modal-metric-val">{m.val}</div>
                  <div className="modal-metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="modal-section">
            <h3 className="modal-section-title">Key Features</h3>
            <div className="modal-features">
              {(project.features || []).map((f, i) => (
                <div key={i} className="modal-feature-item">
                  <span className="modal-feature-check" style={{ color: project.color }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="modal-section">
            <h3 className="modal-section-title">Technology Stack</h3>
            <div className="modal-tech">
              {(project.tech || []).map(t => (
                <span key={t} className="modal-tech-pill">{t}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="modal-cta-row">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-p">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Live Demo
            </a>
            <a href={project.caseStudyUrl} className="btn btn-o">
              📖 Read Case Study
            </a>
            <Link to="/contact" className="btn btn-ghost" onClick={onClose}>
              💬 Request Similar Solution
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
