import React from 'react';
import { Link } from 'react-router-dom';
import PortfolioGallery from '../components/PortfolioGallery';
import './PortfolioPage.css';
import SEO from '../SEO';

export default function PortfolioPage() {
  return (
    
    <div className="port-wrapper">

      <SEO
  title="Portfolio — ERP, Billing Software, Mobile Apps & Websites We Built"
  description="Browse our portfolio of real software projects — ERP systems, billing software, construction apps, mobile apps, and business websites built for Tamil Nadu businesses."
  keywords="software portfolio Tamil Nadu, ERP projects, billing software projects, mobile app portfolio, website portfolio Tamil Nadu, software company work samples"
  url="/portfolio"
  schema={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Apps2Cloud Portfolio",
    "description": "Portfolio of software projects built by Apps2Cloud for Tamil Nadu businesses",
    "url": "https://apps2cloud.in/portfolio",
    "provider": {
      "@type": "Organization",
      "name": "Apps2Cloud"
    }
  }}
/>

      <section className="port-hero">
        <div className="port-hero-bg"/>
        <div className="container">
          <div className="stag anim-up">Our Work</div>
          <h1 className="port-hero-title anim-up">
            Projects That <span className="gradient-text">Define Us</span>
          </h1>
          <p className="port-hero-sub anim-up">
            Real software. Real clients. Real results. Browse our complete portfolio of ERP systems, mobile apps, construction platforms, cloud infrastructure, and more.
          </p>
          <div className="port-hero-ctas anim-up">
            <Link to="/contact" className="btn btn-p btn-lg">Start Your Project →</Link>
            <Link to="/services" className="btn btn-o btn-lg">Our Services</Link>
          </div>
        </div>
      </section>

      <section className="port-gallery-section">
        <div className="container">
          <PortfolioGallery showStats={true} showFilters={true} />
        </div>
      </section>

      <section className="port-cta-section">
        <div className="container port-cta-inner">
          <div className="stag port-cta-tag">Want Something Similar?</div>
          <h2 className="stitle">Let's Build Your <span className="gradient-text">Success Story</span></h2>
          <p className="ssub">Every project above started with a single conversation. Tell us about your idea.</p>
          <div className="port-cta-btns">
            <Link to="/contact" className="btn btn-p btn-lg">📅 Schedule a Free Consultation</Link>
            <a href="https://wa.me/917010213133" target="_blank" rel="noopener noreferrer" className="btn btn-o btn-lg">💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
