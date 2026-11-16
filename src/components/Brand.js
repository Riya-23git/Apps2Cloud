import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/apps2cloud-logo.png';
import logoOnDark from '../assets/apps2cloud-logo-on-dark.png';
import './Brand.css';

// Full logo image. The on-dark version has white in place of the charcoal; CSS picks one per theme.
export default function Brand({ className = '', size = 'md' }) {
  return (
    <Link to="/" className={`brand brand-${size} ${className}`} aria-label="Apps2Cloud home">
      <img src={logo} alt="" className="brand-img brand-img-light" width="1204" height="216" />
      <img src={logoOnDark} alt="" className="brand-img brand-img-dark" width="1204" height="216" />
    </Link>
  );
}
