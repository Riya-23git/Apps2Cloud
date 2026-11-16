import React, { useState } from 'react';
import './BlogPage.css';
import SEO from '../SEO';

const BLOGS = [
  { emoji:'🧩', tag:'ERP',          date:'Dec 10, 2024', read:'5 min', title:'Why Your Business Needs a Custom ERP (Not a Generic One)',                              excerpt:'Off-the-shelf ERP systems often force you to change your workflows to fit the software. Here\'s why custom ERPs pay for themselves within a year.',                color:'#f97316' },
  { emoji:'🏗️', tag:'Construction', date:'Nov 28, 2024', read:'7 min', title:'How Construction Companies Can Eliminate Billing Disputes with Software',               excerpt:'BOQ discrepancies and contractor billing fights cost construction companies lakhs every year. Here\'s how a CMS solves this permanently.',                       color:'#f59e0b' },
  { emoji:'📱', tag:'Mobile Dev',   date:'Nov 15, 2024', read:'6 min', title:'Flutter vs React Native: Which to Choose for Your Business App in 2025',                excerpt:'We\'ve built apps in both frameworks. Here\'s an honest comparison of performance, developer experience, and long-term maintainability.',                       color:'#f38816' },
  { emoji:'☁️', tag:'Cloud',        date:'Oct 30, 2024', read:'8 min', title:'Moving Your Business Software to the Cloud: A Step-by-Step Guide',                     excerpt:'Cloud migration doesn\'t have to be scary. We break it down into a practical roadmap any business can follow, without downtime.',                             color:'#fb923c' },
  { emoji:'🔒', tag:'Security',     date:'Oct 14, 2024', read:'6 min', title:'Top 5 Security Mistakes in Custom Business Software (And How to Avoid Them)',           excerpt:'From SQL injection to improper session management — the most common vulnerabilities we see in SME software, and how to fix them.',                            color:'#f35916' },
  { emoji:'📊', tag:'Analytics',    date:'Sep 22, 2024', read:'5 min', title:'How Real-Time Dashboards Changed How Our Client Runs Their Business',                   excerpt:'A case study on how live data visibility helped a retail chain reduce stockouts by 60% and improve purchase decisions dramatically.',                          color:'#db630c' },
];

const TAGS = ['All','ERP','Construction','Mobile Dev','Cloud','Security','Analytics'];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? BLOGS : BLOGS.filter(b => b.tag === active);

  return (
    <div className="blog-wrapper">
      <SEO
        title="Blog — ERP, Mobile App & Cloud Insights"
        description="Practical articles on ERP, mobile apps, cloud technology and digital transformation, written by engineers for business owners."
        keywords="ERP blog, business software articles, mobile app development blog, cloud migration guide, software company Tamil Nadu"
        url="/blog"
      />

      {/* ── Hero ── */}
      <section className="blog-hero">
        <div className="blog-hero-bg"/>
        <div className="container">
          <div className="stag anim-up">Insights & Resources</div>
          <h1 className="blog-hero-title anim-up">
            Tech Insights for <span className="gradient-text">Business Leaders</span>
          </h1>
          <p className="blog-hero-sub anim-up">
            Practical articles on ERP, mobile apps, cloud technology, and digital transformation — written by engineers, for business owners.
          </p>
        </div>
      </section>

      {/* ── Grid Section ── */}
      <section className="blog-section">
        <div className="container">

          {/* Filter pills */}
          <div className="blog-filters">
            {TAGS.map(t => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`blog-filter-btn ${active === t ? 'active' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="blog-grid">
            {filtered.map((b, i) => (
              <article key={i} className="blog-card gcard" style={{ '--bc': b.color }}>
                <div className="blog-card-thumb" style={{ background: `linear-gradient(135deg,${b.color}20,${b.color}08)` }}>
                  <span className="blog-card-emoji">{b.emoji}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-tag" style={{ color: b.color, background: `${b.color}15`, border: `1px solid ${b.color}28` }}>{b.tag}</span>
                    <span className="blog-date">{b.date}</span>
                    <span className="blog-read">{b.read}</span>
                  </div>
                  <h3 className="blog-card-title">{b.title}</h3>
                  <p className="blog-card-excerpt">{b.excerpt}</p>
                  <a href="#" className="blog-read-link" style={{ color: b.color }}>
                    Read Article
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                      <path d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="blog-newsletter">
        <div className="container blog-nl-inner">
          <div className="stag blog-nl-tag">Stay Updated</div>
          <h2 className="stitle blog-nl-title">Tech Insights in Your Inbox</h2>
          <p className="ssub blog-nl-sub">One useful article per month. No spam. Unsubscribe anytime.</p>
          <div className="blog-nl-form">
            <input
              type="email"
              placeholder="your@email.com"
              className="blog-nl-input"
            />
            <button className="btn btn-p">Subscribe →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
