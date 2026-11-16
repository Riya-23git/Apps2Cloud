import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import CareerPage from './pages/CareerPage';
import PrivacyPolicy from './pages/privacypolicy';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import './cards.css'; // after the page imports so the shared card styles take precedence

// Inside <Routes>:


export const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function PageFade({ children }) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(false); const t = setTimeout(() => setShow(true), 40); return () => clearTimeout(t); }, [pathname]);
  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? 'none' : 'translateY(16px)',
      transition: 'opacity .5s var(--ease-out), transform .5s var(--ease-out)',
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('pt-theme') || 'light'; } catch (e) { return 'light'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('pt-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <Router>
        <ScrollTop />
        <Navbar />
        <main style={{ paddingTop: 'var(--nav-h)' }}>
          <PageFade>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/privacypolicy" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="/terms-of-service" element={<TermsPage />} />
              <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageFade>
        </main>
        <Footer />
        {/* WhatsApp Float */}
        <a href="https://wa.me/917010213133?text=Hello%20Apps2Cloud!" target="_blank" rel="noopener noreferrer" className="wa-float" title="Chat on WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </Router>
    </ThemeCtx.Provider>
  );
}
