import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <section>
      <Helmet>
        <title>Page Not Found | Apps2Cloud</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="stag">Error 404</div>
        <h1 className="stitle">Page not found</h1>
        <p className="ssub" style={{ margin: '0 auto 32px' }}>The page you're looking for doesn't exist or may have moved.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link to="/" className="btn btn-p">Back to Home</Link>
          <Link to="/contact" className="btn btn-o">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
