import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { SERVICES } from '../data';
import './Navbar.css';
import Brand from './Brand';
import ServiceIcon from './ServiceIcon';
import { WaIcon } from './LeadForm';
import { PHONE_LABEL, PHONE_HREF, WA_NUMBER } from '../contact';

const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello Apps2Cloud! I would like to know more about your software.')}`;

const LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services', mega: true },
  { path: '/portfolio', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/career', label: 'Careers' },
  { path: '/contact', label: 'Contact' },
];

const Ico = ({ d, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const CHEV = 'M6 9l6 6 6-6';
const ARROW = 'M5 12h14M13 6l6 6-6 6';
const PHONE = 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z';
const SUN = 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4';
const MOON = 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z';
const GO = 'M9 6l6 6-6 6';
const NAV_ICONS = {
  '/': 'M3 10.5L12 3l9 7.5V21h-6v-6H9v6H3z',
  '/services': 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  '/portfolio': 'M3 7h18v13H3zM8 7V4h8v3M3 12h18',
  '/about': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  '/career': 'M12 15l-3-3a22 22 0 0 1 2-4A13 13 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2zM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5',
  '/contact': 'M4 4h16v16H4zM4 6l8 7 8-7',
};
const NAV_SUB = { '/': 'Start here', '/portfolio': 'Projects & case studies', '/about': 'Our team & values', '/career': 'Join the team', '/contact': 'Talk to us' };

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();
  const megaRef = useRef(null);
  const closeT = useRef(null);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); setMega(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('nx-menu-open', open);
    return () => { document.body.style.overflow = ''; document.body.classList.remove('nx-menu-open'); };
  }, [open]);

  useEffect(() => {
    const onDoc = (e) => { if (megaRef.current && !megaRef.current.contains(e.target)) setMega(false); };
    const onKey = (e) => { if (e.key === 'Escape') { setMega(false); setOpen(false); } };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  const canHover = () => window.matchMedia && window.matchMedia('(hover:hover)').matches;
  const enter = () => { if (!canHover()) return; clearTimeout(closeT.current); setMega(true); };
  const leave = () => { if (!canHover()) return; closeT.current = setTimeout(() => setMega(false), 140); };
  const svcActive = pathname.startsWith('/services');
  const solid = scrolled || open || mega;
  // Route changes close the menus, but a link to the current page doesn't change the route.
  const closeOnLink = (e) => { if (e.target.closest('a')) { setOpen(false); setMega(false); } };

  return (
    <>
    <header className={`nx ${scrolled ? 'nx-scrolled' : ''} ${solid ? 'nx-solid' : ''}`}>
      <div className="nx-bar">
        <nav className="nx-inner" aria-label="Main">
          <Brand />

          <ul className="nx-links">
            {LINKS.map(({ path, label, mega: hasMega }) => hasMega ? (
              <li key={path} ref={megaRef} className={`nx-dd ${mega ? 'is-open' : ''}`} onMouseEnter={enter} onMouseLeave={leave}>
                <button type="button" className={`nx-link ${svcActive ? 'is-active' : ''}`} aria-expanded={mega} aria-haspopup="true" onClick={() => setMega(m => !m)}>
                  {label}<span className="nx-chev"><Ico d={CHEV} size={14} /></span>
                </button>

                <div className="nx-mega" role="menu" onClick={closeOnLink}>
                  <div className="nx-mega-grid">
                    {SERVICES.map(s => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="nx-mi" role="menuitem">
                        <span className="nx-mi-ico" aria-hidden="true"><ServiceIcon slug={s.slug} size={20} /></span>
                        <span className="nx-mi-txt">
                          <span className="nx-mi-t">{s.shortTitle}</span>
                          <span className="nx-mi-d">{s.tagline}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <aside className="nx-mega-side">
                    <span className="nx-side-tag">Free consultation</span>
                    <h4>Not sure what you need?</h4>
                    <p>Tell us how your business runs today. We'll suggest the right software and give you a clear price in 24 hours.</p>
                    <Link to="/contact" className="nx-side-btn">Talk to an expert <Ico d={ARROW} size={15} /></Link>
                    <Link to="/services" className="nx-side-all">Browse all services →</Link>
                  </aside>
                </div>
              </li>
            ) : (
              <li key={path}>
                <NavLink to={path} end={path === '/'} className={({ isActive }) => `nx-link ${isActive ? 'is-active' : ''}`}>{label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="nx-right">
            <a href={PHONE_HREF} className="nx-phone" aria-label={`Call ${PHONE_LABEL}`}>
              <span className="nx-phone-ico"><Ico d={PHONE} size={15} /></span>
              <span className="nx-phone-txt"><small>Call us</small>{PHONE_LABEL}</span>
            </a>
            <button type="button" className="nx-icon" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
              <Ico d={theme === 'dark' ? SUN : MOON} />
            </button>
            <Link to="/contact" className="nx-cta">Get a Quote <Ico d={ARROW} size={15} /></Link>
            <button type="button" className={`nx-burger ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              <span /><span />
            </button>
          </div>
        </nav>
        <div className="nx-progress" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className={`nx-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="nx-d-wrap" onClick={closeOnLink}>
          <div className="nx-d-quick">
            <a href={PHONE_HREF} className="nx-q"><span className="nx-q-ico"><Ico d={PHONE} size={18} /></span><b>Call us</b><small>{PHONE_LABEL}</small></a>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="nx-q nx-q-wa"><span className="nx-q-ico"><WaIcon /></span><b>WhatsApp</b><small>Chat now</small></a>
            <Link to="/contact" className="nx-q nx-q-cta"><span className="nx-q-ico"><Ico d={ARROW} size={18} /></span><b>Free quote</b><small>In 24 hours</small></Link>
          </div>

          <p className="nx-d-cap">Menu</p>
          <div className="nx-d-list">
            {LINKS.filter(l => !l.mega).map(({ path, label }, i) => (
              <NavLink key={path} to={path} end={path === '/'} style={{ '--i': i }} className={({ isActive }) => `nx-d-row ${isActive ? 'is-active' : ''}`}>
                <span className="nx-d-ico"><Ico d={NAV_ICONS[path]} size={19} /></span>
                <span className="nx-d-txt"><b>{label}</b><small>{NAV_SUB[path]}</small></span>
                <span className="nx-d-go"><Ico d={GO} size={16} /></span>
              </NavLink>
            ))}
          </div>

          <p className="nx-d-cap">Services <Link to="/services">View all</Link></p>
          <div className="nx-d-svcs">
            {SERVICES.map((sv, i) => (
              <Link key={sv.slug} to={`/services/${sv.slug}`} className="nx-d-svc" style={{ '--i': i }}>
                <span className="nx-d-svc-ico"><ServiceIcon slug={sv.slug} size={19} /></span>{sv.shortTitle}
              </Link>
            ))}
          </div>

          <button type="button" className="nx-d-theme" onClick={toggle}>
            <span className="nx-d-ico"><Ico d={theme === 'dark' ? MOON : SUN} size={18} /></span>
            <span className="nx-d-txt"><b>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</b><small>Tap to switch</small></span>
            <span className={`nx-switch ${theme === 'dark' ? 'on' : ''}`} aria-hidden="true"><i /></span>
          </button>
        </div>
      </div>
    </header>

    <nav className="nx-dock" aria-label="Quick navigation">
      <NavLink to="/" end className={({ isActive }) => `nx-dock-btn ${isActive && !open ? 'on' : ''}`}><Ico d={NAV_ICONS['/']} size={21} /><span>Home</span></NavLink>
      <NavLink to="/services" className={({ isActive }) => `nx-dock-btn ${isActive && !open ? 'on' : ''}`}><Ico d={NAV_ICONS['/services']} size={21} /><span>Services</span></NavLink>
      <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="nx-dock-wa" aria-label="Chat on WhatsApp"><WaIcon /></a>
      <NavLink to="/portfolio" className={({ isActive }) => `nx-dock-btn ${isActive && !open ? 'on' : ''}`}><Ico d={NAV_ICONS['/portfolio']} size={21} /><span>Work</span></NavLink>
      <button type="button" className={`nx-dock-btn ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        <span className={`nx-dock-burger ${open ? 'x' : ''}`}><i /><i /><i /></span><span>{open ? 'Close' : 'Menu'}</span>
      </button>
    </nav>
    </>
  );
}
