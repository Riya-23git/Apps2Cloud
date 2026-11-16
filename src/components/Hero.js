import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const STATS = [
  { value: '70+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  
  { value: '10+', label: 'Expert Engineers' },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    function initParticles() {
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(249,115,22, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Gradient Orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Grid Pattern */}
      <div className="hero-grid" />

      <div className="container hero-inner">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <span className="badge-dot" />
            <span>Trusted by 20+ Companies</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Building <span className="gradient-text">Smart Digital</span>
            <br />Solutions for Every
            <br />
            <span className="hero-title-outline">Industry</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtitle animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            ERP, Construction Systems, Billing Software & Mobile Apps – All in One Place.
            We craft enterprise-grade software that scales with your business.
          </p>

          {/* CTAs */}
          <div className="hero-ctas animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <Link to="/contact" className="btn btn-primary hero-btn-primary">
              Get a Free Consultation
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </Link>
            <Link to="/services" className="btn btn-outline hero-btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              View Our Solutions
            </Link>
          </div>

          {/* Tech Stack Badges */}
         
        </div>

        {/* Hero Visual */}
        <div className="hero-visual animate-float" style={{ animationDelay: '0.3s' }}>
          <div className="hero-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span /><span /><span />
              </div>
              <div className="mockup-url">Apps2Cloud.in/dashboard</div>
            </div>
            <div className="mockup-body">
              {/* Dashboard Preview */}
              <div className="dash-stats">
                {[
                  { label: 'Revenue', val: '₹24.5L', up: true, pct: '+12%' },
                  { label: 'Orders', val: '1,248', up: true, pct: '+8%' },
                  { label: 'Projects', val: '43', up: false, pct: '+4%' },
                ].map(s => (
                  <div key={s.label} className="dash-stat-card">
                    <div className="dash-stat-label">{s.label}</div>
                    <div className="dash-stat-val">{s.val}</div>
                    <div className={`dash-stat-pct ${s.up ? 'up' : 'down'}`}>{s.pct}</div>
                  </div>
                ))}
              </div>
              <div className="dash-chart">
                <div className="dash-chart-label">Monthly Performance</div>
                <div className="dash-bars">
                  {[40, 65, 55, 80, 70, 90, 85, 95, 75, 88, 72, 100].map((h, i) => (
                    <div key={i} className="dash-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }} />
                  ))}
                </div>
              </div>
              <div className="dash-table-row">
                <div className="dash-table-cell active">ERP Module ✓</div>
                <div className="dash-table-cell">Billing Live</div>
                <div className="dash-table-cell warning">Reports</div>
              </div>
            </div>
          </div>
          {/* Floating Cards */}
          <div className="hero-float-card hero-float-card-1">
            <div className="float-icon">🚀</div>
            <div>
              <div className="float-val">99.9%</div>
              <div className="float-label">Uptime SLA</div>
            </div>
          </div>
          <div className="hero-float-card hero-float-card-2">
            <div className="float-icon">⚡</div>
            <div>
              <div className="float-val">2x</div>
              <div className="float-label">Faster Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="hero-stats">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value gradient-text">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
