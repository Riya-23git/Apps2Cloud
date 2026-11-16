import React, { useState, useRef, useEffect } from 'react';
import './CareerPage.css';
 import SEO from '../SEO';

/* ── Job Openings Data ── */
const JOBS = [
 
  {
    id: 2,
    title: 'Flutter Mobile App Developer',
    type: 'Full-time',
    mode: 'On-site',
    experience: '1–2 Years',
    location: 'Tamil Nadu',
    color: '#c2410c',
    icon: '📱',
    urgency: 'Hiring Now',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Android'],
    responsibilities: [
      'Develop cross-platform Android & iOS apps using Flutter',
      'Integrate Firebase services — Auth, Firestore, FCM',
      'Build offline-capable apps with local SQLite storage',
      'Connect apps to Node.js REST APIs with proper error handling',
      'Deploy apps to Google Play Store and Apple App Store',
    ],
    requirements: [
      '1–3 years of Flutter / Dart development experience',
      'Hands-on experience with Firebase integration',
      'Understanding of offline-first app architecture',
      'Experience publishing apps to Play Store',
      'Good understanding of mobile UI/UX principles',
    ],
    niceToHave: ['SQLite', 'Google Maps SDK', 'BLoC / Provider', 'Riverpod'],
    about: 'You will build delivery apps, attendance apps, and shop management mobile tools that real businesses use every day. You\'ll own features end to end.',
  },
 
 
  {
    id: 5,
    title: 'Junior Software Developer (Fresher)',
    type: 'Full-time',
    mode: 'On-site',
    experience: 'Fresher / 0–1 Year',
    location: 'Tamil Nadu',
    color: '#cf4a0b',
    icon: '🎓',
    urgency: 'Open',
    skills: ['HTML', 'CSS', 'JavaScript', 'Any Framework', 'Eager to Learn'],
    responsibilities: [
      'Assist senior developers in building web and mobile applications',
      'Work on real client projects under senior guidance',
      'Learn our tech stack — React.js, Node.js, Flutter, MySQL',
      'Write and test code following team standards',
      'Grow into an independent developer within 6–12 months',
    ],
    requirements: [
      'B.E / B.Tech / BCA / MCA in Computer Science or related field',
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Completed any project during college (any technology)',
      'Strong willingness to learn and work hard',
      'Good communication in Tamil and basic English',
    ],
    niceToHave: ['React.js basics', 'Flutter basics', 'Any internship experience', 'GitHub profile'],
  
    about: 'This is a real learning opportunity — not an internship. You will work on live client projects, get mentored by senior developers, and grow fast in a supportive team.',
  },
];

/* ── Perks Data ── */
const PERKS = [
  { icon: '🚀', title: 'Real Projects from Day 1', desc: 'Work on live client software used by actual businesses — not dummy projects.' },
  { icon: '📈', title: 'Fast Growth & Appraisals', desc: 'Performance-based salary revisions every 6 months. Grow with the company.' },
  { icon: '🧑‍🏫', title: 'Senior Mentorship', desc: 'Every junior is mentored by a senior developer with weekly 1-on-1 sessions.' },
  { icon: '🕐', title: 'Fixed Working Hours', desc: 'Monday to Saturday, 9:30 AM – 6:30 PM. No forced overtime culture.' },
  { icon: '🎯', title: 'Learn the Full Stack', desc: 'Exposure to React, Flutter, Node.js, MySQL, and AWS across projects.' },
  { icon: '🤝', title: 'Small Team, Big Impact', desc: 'Your work matters. Every developer owns features and sees the client impact.' },
];

/* ── Apply Modal ── */
function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', portfolio: '', cover: '', resume: null });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleFile = e => {
    const file = e.target.files[0];
    if (file) { setForm(f => ({ ...f, resume: file })); setFileName(file.name); }
  };
  const submit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  return (
    <div className="career-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="career-modal modal-scroll">

       

        {/* Header */}
        <div className="career-modal-header" style={{ '--jc': job.color }}>
          <div className="career-modal-header-bg" />
          <div className="career-modal-header-inner">
            <div className="career-modal-job-icon">{job.icon}</div>
            <div>
              <div className="career-modal-applying">Applying for</div>
              <h2 className="career-modal-title">{job.title}</h2>
              <div className="career-modal-meta-row">
                <span>{job.type}</span>
                <span>·</span>
                <span>{job.experience}</span>
                <span>·</span>
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <button className="career-modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="career-modal-success">
            <div className="career-success-anim">🎉</div>
            <h3>Application Submitted!</h3>
            <p>Thank you for applying for <strong>{job.title}</strong>. We'll review your application and reach out within <strong>3–5 working days</strong>.</p>
            <div className="career-success-steps">
              {['Application received','Resume review (2–3 days)','Phone screening','Technical interview'].map((s, i) => (
                <div key={i} className="career-success-step">
                  <div className={`career-ss-dot ${i === 0 ? 'active' : ''}`} style={{ '--jc': job.color }}/>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-p career-success-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="career-modal-form">
            {/* Personal Info */}
            <div className="career-form-section">
              <div className="career-form-section-title">Personal Information</div>
              <div className="career-form-row-2">
                <div className="career-field">
                  <label className="career-label">Full Name *</label>
                  <input className="career-input" type="text" name="name" placeholder="Your full name" required value={form.name} onChange={change}/>
                </div>
                <div className="career-field">
                  <label className="career-label">Phone Number *</label>
                  <input className="career-input" type="tel" name="phone" placeholder="+91 98765 43210" required value={form.phone} onChange={change}/>
                </div>
              </div>
              <div className="career-field">
                <label className="career-label">Email Address *</label>
                <input className="career-input" type="email" name="email" placeholder="your@email.com" required value={form.email} onChange={change}/>
              </div>
            </div>

            {/* Experience */}
            <div className="career-form-section">
              <div className="career-form-section-title">Experience & Skills</div>
              <div className="career-field">
                <label className="career-label">Years of Experience *</label>
                <select className="career-input career-select" name="experience" required value={form.experience} onChange={change}>
                  <option value="" disabled>Select experience level</option>
                  <option>Fresher (0–6 months)</option>
                  <option>6 months – 1 year</option>
                  <option>1–2 years</option>
                  <option>2–3 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <div className="career-field">
                <label className="career-label">Portfolio / GitHub / LinkedIn URL</label>
                <input className="career-input" type="url" name="portfolio" placeholder="https://github.com/yourname" value={form.portfolio} onChange={change}/>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="career-form-section">
              <div className="career-form-section-title">Resume</div>
              <div className="career-field">
                <label className="career-label">Upload Resume * <span className="career-label-hint">(PDF or DOC, max 5MB)</span></label>
                <label className="career-upload-box" style={{ '--jc': job.color }}>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{ display: 'none' }}/>
                  <div className="career-upload-icon">📎</div>
                  <div className="career-upload-text">
                    {fileName
                      ? <><span className="career-upload-filename">{fileName}</span><span className="career-upload-change">Change file</span></>
                      : <><span>Click to upload resume</span><span className="career-upload-hint">PDF or DOC · Max 5MB</span></>
                    }
                  </div>
                  {fileName && <div className="career-upload-check" style={{ color: job.color }}>✓</div>}
                </label>
              </div>
            </div>

            {/* Cover Note */}
            <div className="career-form-section">
              <div className="career-form-section-title">Why Do You Want to Join? <span className="career-optional">Optional</span></div>
              <div className="career-field">
                <textarea
                  className="career-input career-textarea"
                  name="cover"
                  placeholder="Tell us briefly why you're excited about this role and what you'd bring to the team..."
                  value={form.cover}
                  onChange={change}
                  rows={4}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="career-modal-footer">
              <div className="career-footer-privacy">
                🔒 Your information is confidential and used only for this application.
              </div>
              <button type="submit" className="career-submit-btn" style={{ '--jc': job.color }} disabled={loading}>
                {loading
                  ? <><span className="career-spinner"/>Submitting Application...</>
                  : <>Submit Application <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                }
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Job Card ── */
function JobCard({ job, index, onApply }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`career-job-card ${expanded ? 'expanded' : ''}`}
      style={{
        '--jc': job.color,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity .55s ease ${index * 0.1}s, transform .55s ease ${index * 0.1}s`,
      }}
    >
      {/* Top accent */}
      <div className="career-card-accent" />

      {/* Card Header */}
      <div className="career-card-header">
        <div className="career-card-left">
          <div className="career-card-icon-wrap" style={{ background: `${job.color}18`, border: `1px solid ${job.color}30` }}>
            {job.icon}
          </div>
          <div>
            <div className="career-card-badges">
              <span className={`career-urgency-badge ${job.urgency === 'Hiring Now' ? 'urgent' : ''}`}
                style={ job.urgency === 'Hiring Now' ? { color: '#22c55e', background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.25)' } : {} }>
                {job.urgency === 'Hiring Now' && <span className="career-live-dot"/>}{job.urgency}
              </span>
            </div>
            <h3 className="career-card-title">{job.title}</h3>
            <div className="career-card-meta">
              <span className="career-meta-tag"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><rect x="1" y="3" width="14" height="11" rx="2"/><path d="M5 3V2a1 1 0 012 0v1"/><path d="M9 3V2a1 1 0 012 0v1"/></svg>{job.type}</span>
              <span className="career-meta-tag"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="8" cy="6" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>{job.experience}</span>
              <span className="career-meta-tag"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M8 14s-5-4.5-5-8a5 5 0 0110 0c0 3.5-5 8-5 8z"/><circle cx="8" cy="6" r="1.5"/></svg>{job.mode}</span>
              {job.salary && <span className="career-meta-tag"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="8" cy="8" r="6"/><line x1="8" y1="4" x2="8" y2="8"/><line x1="8" y1="8" x2="11" y2="10"/></svg>{job.salary}</span>}
            </div>
          </div>
        </div>
        <div className="career-card-actions">
          <button className="career-apply-btn" style={{ '--jc': job.color }} onClick={() => onApply(job)}>
            Apply Now
          </button>
          <button className="career-toggle-btn" onClick={() => setExpanded(!expanded)} aria-label="Toggle details">
            <svg className={`career-chevron ${expanded ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Skills row */}
      <div className="career-skills-row">
        {job.skills.map(s => (
          <span key={s} className="career-skill-tag" style={{ '--jc': job.color }}>{s}</span>
        ))}
      </div>

      {/* Expanded Details */}
      <div className={`career-card-details ${expanded ? 'open' : ''}`}>
        <div className="career-details-inner">
          {/* About the role */}
          <div className="career-detail-section">
            <div className="career-detail-title">About This Role</div>
            <p className="career-about-role">{job.about}</p>
          </div>

          <div className="career-details-grid">
            {/* Responsibilities */}
            <div className="career-detail-section">
              <div className="career-detail-title">What You'll Do</div>
              <ul className="career-detail-list">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="career-detail-item">
                    <span className="career-detail-dot" style={{ background: job.color }}/>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="career-detail-section">
              <div className="career-detail-title">What We're Looking For</div>
              <ul className="career-detail-list">
                {job.requirements.map((r, i) => (
                  <li key={i} className="career-detail-item">
                    <span className="career-detail-dot" style={{ background: job.color }}/>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nice to have */}
          <div className="career-detail-section">
            <div className="career-detail-title">Nice to Have</div>
            <div className="career-nice-tags">
              {job.niceToHave.map(n => (
                <span key={n} className="career-nice-tag">+ {n}</span>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="career-detail-cta">
            <div className="career-detail-cta-text">
              <div className="career-detail-cta-title">Sounds like you?</div>
              <div className="career-detail-cta-sub">Apply now — we respond to every application within 3–5 working days.</div>
            </div>
            <button className="career-apply-btn career-apply-lg" style={{ '--jc': job.color }} onClick={() => onApply(job)}>
              Apply for This Role →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   MAIN CAREER PAGE
══════════════════════════════ */
export default function CareerPage() {
  const [applyJob, setApplyJob] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Full-time', 'Fresher'];
  const filtered = activeFilter === 'All'
    ? JOBS
    : activeFilter === 'Fresher'
      ? JOBS.filter(j => j.experience.includes('Fresher'))
      : JOBS.filter(j => j.type === activeFilter);

  return (
    <div className="career-wrapper">

<SEO
  title="Careers — Software Developer Jobs in Tamil Nadu"
  description="Join Apps2Cloud — a growing software team in Tamil Nadu. We're hiring React developers, Flutter app developers, Node.js developers and UI designers. Real projects, fast growth."
  keywords="software jobs Tamil Nadu, developer jobs Tamil Nadu, React developer job Tamil Nadu, Flutter developer job, IT jobs Tamil Nadu, software company hiring Tamil Nadu"
  url="/career"
  schema={{
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Software Developer",
    "description": "Join our software development team in Tamil Nadu. Work on real client projects.",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Apps2Cloud",
      "sameAs": "https://apps2cloud.in"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    },
    "employmentType": "FULL_TIME",
    "datePosted": "2025-06-01"
  }}
/>

      {/* ── HERO ── */}
      <section className="career-hero">
        <div className="career-hero-bg"/>
        <div className="career-hero-grid"/>
        <div className="career-hero-orb-1"/><div className="career-hero-orb-2"/>
        <div className="container career-hero-inner">
          <div className="career-hero-content">
            <div className="career-hero-badge anim-up">
              <span className="career-hero-badge-dot"/>
              We're Hiring — Join Our Team
            </div>
            <h1 className="career-hero-title anim-up">
              Build Real Software.<br/>
              <span className="gradient-text">Grow Your Career.</span>
            </h1>
            <p className="career-hero-sub anim-up">
              We're a small, focused software team building practical digital solutions for Tamil Nadu businesses. Every developer here works on real client projects, gets mentored, and grows fast.
            </p>
            <div className="career-hero-stats anim-up">
              {[
                { val: '8+', label: 'Team Members' },
                { val: '30+', label: 'Projects Delivered' },
                { val: '5+', label: 'Years Building' },
            
              ].map((s, i) => (
                <div key={i} className="career-hero-stat">
                  <div className="career-hs-val gradient-text">{s.val}</div>
                  <div className="career-hs-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="career-hero-visual anim-in">
            <div className="career-visual-card">
              <div className="career-visual-header">
                <div className="career-visual-dot r"/><div className="career-visual-dot y"/><div className="career-visual-dot g"/>
                <span className="career-visual-label">apps2cloud.in/careers</span>
              </div>
              <div className="career-visual-body">
                <div className="career-visual-title">Open Positions</div>
                {JOBS.slice(0, 4).map(j => (
                  <div key={j.id} className="career-visual-item">
                    <span>{j.icon}</span>
                    <div>
                      <div className="career-vi-title">{j.title}</div>
                      <div className="career-vi-exp">{j.experience}</div>
                    </div>
                    <div className="career-vi-badge" style={{ color: j.color, background: `${j.color}15` }}>{j.urgency}</div>
                  </div>
                ))}
                {JOBS.length > 4 && <div className="career-visual-more">+{JOBS.length - 4} more positions</div>}
              </div>
            </div>
            <div className="career-visual-float f1"><span>📩</span><div><div className="cvf-val">3–5 days</div><div className="cvf-lbl">Response time</div></div></div>
            <div className="career-visual-float f2"><span>🌱</span><div><div className="cvf-val">Join with Us</div><div className="cvf-lbl"></div></div></div>
          </div>
        </div>
      </section>

     

      {/* ── JOB OPENINGS ── */}
      <section className="career-jobs-section" id="openings">
        <div className="container">
          <div className="career-jobs-header">
            <div>
              <div className="stag">Current Openings</div>
              <h2 className="stitle">{JOBS.length} Open <span className="gradient-text">Positions</span></h2>
            </div>
            <div className="career-job-filters">
              {filters.map(f => (
                <button key={f} className={`career-filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
                  {f}
                  <span className="career-filter-count">
                    {f === 'All' ? JOBS.length : f === 'Fresher' ? JOBS.filter(j => j.experience.includes('Fresher')).length : JOBS.filter(j => j.type === f).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="career-jobs-list">
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onApply={setApplyJob} />
            ))}
          </div>

          {/* No openings match */}
          {filtered.length === 0 && (
            <div className="career-empty">
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
              <p>No openings match this filter right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── OPEN APPLICATION ── */}
      <section className="career-open-section">
        <div className="container">
          <div className="career-open-card">
            <div className="career-open-orb"/>
            <div className="career-open-left">
              <div className="career-open-icon">📮</div>
              <div>
                <h3 className="career-open-title">Don't See the Right Role?</h3>
                <p className="career-open-sub">Send us your resume anyway. We consider strong candidates even when we don't have an active opening for their profile.</p>
              </div>
            </div>
            <button className="career-apply-btn career-apply-open" style={{ '--jc': '#c2410c' }}
              onClick={() => setApplyJob({ id: 99, title: 'Open Application', type: 'Full-time', experience: 'Any', mode: 'To be discussed', location: 'Tamil Nadu', color: '#fb923c', icon: '📮', salary: 'Based on experience' })}>
              Send Open Application →
            </button>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="career-process-section">
        <div className="container">
          <div className="career-section-head centered">
            <div className="stag">How We Hire</div>
            <h2 className="stitle">Simple & <span className="gradient-text">Transparent Process</span></h2>
          </div>
          <div className="career-process-steps">
            {[
              { num: '01', icon: '📝', title: 'Apply Online', desc: 'Fill the application form with your resume and a short note about yourself.' },
              { num: '02', icon: '📞', title: 'Phone Call', desc: 'A 15-minute friendly call to understand your background and answer your questions.' },
              { num: '03', icon: '💻', title: 'Practical Test', desc: 'A short, take-home practical task relevant to the role. No trick questions.' },
              { num: '04', icon: '🤝', title: 'Final Meeting', desc: 'Meet the team, ask anything, and we\'ll make a decision within 2–3 days.' },
            ].map((s, i) => (
              <div key={i} className="career-process-step">
                <div className="career-step-num">{s.num}</div>
                <div className="career-step-icon-wrap">{s.icon}</div>
                <h4 className="career-step-title">{s.title}</h4>
                <p className="career-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY MODAL ── */}
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
