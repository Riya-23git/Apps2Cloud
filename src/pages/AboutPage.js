import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';
  import SEO from '../SEO';

const STATS = [
  { val: '30+', label: 'Projects Delivered', icon: '🚀', color: '#f97316' },
  { val: '20+', label: 'Happy Clients',       icon: '🤝', color: '#db630c' },
  { val: '10+',  label: 'Expert Engineers',    icon: '👨‍💻', color: '#f38816' },
];

const TEAM = [
  { initials:'PM', name:'Apps M.',    role:'Founder & CEO',           exp:'10+ yrs', color:'#f97316', area:'Product & Strategy' },
  { initials:'AK', name:'Arun Kumar',   role:'Lead Backend Engineer',   exp:'7+ yrs',  color:'#db630c', area:'Node.js, PostgreSQL, AWS' },
  { initials:'SR', name:'Sunita Raj',   role:'UI/UX Design Lead',       exp:'6+ yrs',  color:'#f39516', area:'Figma, React, Design Systems' },
  { initials:'VK', name:'Vijay K.',     role:'Mobile App Architect',    exp:'8+ yrs',  color:'#f38816', area:'Flutter, Firebase, iOS/Android' },
];

const TIMELINE = [
  { year:'2016', title:'Founded',          desc:'Started with a 3-person team focused on solving local business software problems.' },
  { year:'2018', title:'First ERP Launch', desc:'Launched our first full ERP platform, onboarding 10+ manufacturing clients in 6 months.' },
  { year:'2020', title:'Mobile Expansion', desc:'Expanded into Flutter mobile development. Delivered first healthcare app with 12,000+ patients.' },
  { year:'2022', title:'Cloud Practice',   desc:'Set up dedicated AWS/GCP practice. Crossed 80 clients, expanded to 3 more states.' },
  { year:'2024', title:'Team of 15+',      desc:'Serving clients across 6 industries with 15+ engineers and designers.' },
];

const VALUES = [
  { icon:'🤝', title:'Client First',   desc:'Every decision starts with: does this serve our client\'s actual needs?' },
  { icon:'🔑', title:'Transparency',   desc:'No surprises. Clear communication, honest timelines, full visibility at every stage.' },
  { icon:'⚡', title:'Excellence',     desc:'We take deep pride in code quality, design precision, and performance benchmarks.' },
  { icon:'🔄', title:'Agility',        desc:'We adapt fast, iterate often, and ship working software early and frequently.' },
  { icon:'🔐', title:'Security',       desc:'Every system follows security-first principles from architecture to deployment.' },
  { icon:'🌱', title:'Growth',         desc:'We build scalable systems that grow with your business, not against it.' },
];

function StatCard({ stat }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const num = parseInt((stat.val.match(/\d+/) || ['0'])[0], 10);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      let x = 0;
      const go = () => { x += Math.ceil(num/55); if(x>=num){setN(num);return;} setN(x); requestAnimationFrame(go); };
      requestAnimationFrame(go);
    }, { threshold:.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  const display = stat.val.replace(/\d+/, n);
  return (
    <div ref={ref} className="about-stat-card gcard">
      <div className="about-stat-icon">{stat.icon}</div>
      <div className="about-stat-val" style={{ color: stat.color }}>{display}</div>
      <div className="about-stat-label">{stat.label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="about-wrapper">

    

<SEO
  title="About Us — Software Development Team in Tamil Nadu"
  description="Apps2Cloud is a software development company in Tamil Nadu with 5+ years experience. We build ERP systems, billing software, mobile apps and websites for 40+ businesses. Meet our team."
  keywords="Apps2Cloud about, software company Tamil Nadu, software development team Tamil Nadu, IT company Tamil Nadu, software developers Tamil Nadu"
  url="/about"
  schema={{
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Apps2Cloud",
    "url": "https://apps2cloud.in/about",
    "description": "Apps2Cloud is a software development company in Tamil Nadu building practical digital solutions for businesses.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Apps2Cloud",
      "foundingDate": "2019",
      "numberOfEmployees": "8",
      "areaServed": "Tamil Nadu",
      "url": "https://apps2cloud.in"
    }
  }}
/>

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-bg"/>
        <div className="container">
          <div className="stag anim-up">About Us</div>
          <h1 className="about-hero-title anim-up">
            Technology Built on <span className="gradient-text">Trust & Innovation</span>
          </h1>
          <p className="about-hero-sub anim-up">
            Apps2Cloud has built reliable, scalable digital solutions for businesses across India. We combine technical excellence with deep industry understanding to deliver software that actually works.
          </p>
          <div className="about-hero-ctas anim-up">
            <Link to="/contact" className="btn btn-p btn-lg">Work With Us →</Link>
            <Link to="/portfolio" className="btn btn-o btn-lg">See Our Work</Link>
          </div>
        </div>
      </section>

      


      {/* ── Vision & Mission ── */}
      <section className="about-vm-section">
        <div className="container">
          <div className="about-section-head">
            <div className="stag">Our Philosophy</div>
            <h2 className="stitle">Vision & <span className="gradient-text">Mission</span></h2>
          </div>
          <div className="about-vm-grid">
            {[
              { icon:'🔭', title:'Our Vision', desc:'To be the most trusted technology partner for growing businesses across India — empowering every industry with smart, accessible digital solutions that level the playing field.' },
              { icon:'🎯', title:'Our Mission', desc:'To deliver enterprise-grade software that solves real problems — on time, within budget, and supported beyond deployment. We measure success by our clients\' success.' },
            ].map((v,i) => (
              <div key={i} className="about-vm-card gcard">
                <div className="about-vm-icon">{v.icon}</div>
                <h3 className="about-vm-title">{v.title}</h3>
                <p className="about-vm-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values-section">
        <div className="container">
          <div className="about-section-head">
            <div className="stag">Core Values</div>
            <h2 className="stitle">What <span className="gradient-text">Drives Us</span></h2>
          </div>
          <div className="about-values-grid">
            {VALUES.map((v,i) => (
              <div key={i} className="about-value-card gcard">
                <div className="about-value-icon">{v.icon}</div>
                <div className="about-value-title">{v.title}</div>
                <div className="about-value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta-section">
        <div className="container about-cta-inner">
          <h2 className="stitle">Let's Build Something <span className="gradient-text">Great Together</span></h2>
          <p className="ssub">Whether you have a clear brief or just an idea — we'd love to hear about your project.</p>
          <Link to="/contact" className="btn btn-p btn-lg">Get in Touch →</Link>
        </div>
      </section>
    </div>
  );
}
