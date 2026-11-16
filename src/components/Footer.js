import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data';
import './Footer.css';
import Brand from './Brand';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <Brand className="footer-logo" />
              <p className="footer-tagline">Smart Software. Real Results. Building digital solutions that scale with your business.</p>
              <div className="footer-socials">
                {[
                  { href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                  { href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg> },
                  { href: '#', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                ].map((s, i) => (
                  <a key={i} href={s.href} className="footer-social">{s.icon}</a>
                ))}
              </div>
            </div>
            {/* Services */}
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                {SERVICES.map(s => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`} className="footer-link">{s.shortTitle}</Link></li>
                ))}
                <li><a href="https://apps2cloud.in/whatsapp-demo" className="footer-link">WhatsApp Demo</a></li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {[['/', 'Home'],['/about','About Us'],['/portfolio','Portfolio'],['/blog','Blog'],['/contact','Contact'],['/privacy-policy','Privacy Policy']].map(([p,l]) => (
                  <li key={p}><Link to={p} className="footer-link">{l}</Link></li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <div className="footer-col-title">Get in Touch</div>
              <div className="footer-contacts">
                {[
                  { href: 'mailto:apps2cloud@gmail.com', icon: '✉️', val: 'apps2cloud@gmail.com' },
                  { href: 'tel:+917010213133', icon: '📞', val: '+91 70102 13133' },
                  { href: null, icon: '📍', val: 'Tamil Nadu, India' },
                ].map((c, i) => {
                  const Tag = c.href ? 'a' : 'div';
                  return <Tag key={i} href={c.href} className="footer-contact-item"><span>{c.icon}</span>{c.val}</Tag>;
                })}
              </div>
              <div className="footer-avail"><span className="avail-dot"/>Available for new projects</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Apps2Cloud. All rights reserved.</span>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
