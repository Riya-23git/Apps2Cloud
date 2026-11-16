import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICES } from '../data';
import { openWhatsApp, PHONE_LABEL } from '../contact';
import './ContactPage.css';

 import SEO from '../SEO';

const TYPES = ['ERP Software','Construction Management System','Billing / Accounting Software','Custom Web Application','Mobile App (Android / iOS)','Cloud Hosting / Infrastructure','IT Consulting','Other'];

const CONTACT_ITEMS = [
  { icon:'📞', label:'Phone / WhatsApp', val:'+91 70102 13133',   href:'tel:+917010213133' },
  { icon:'✉️', label:'Email Address',    val:'apps2cloud@gmail.com', href:'mailto:apps2cloud@gmail.com' },
  { icon:'📍', label:'Location',         val:'Tamil Nadu, India',   href:null },
  { icon:'⏱️', label:'Response Time',    val:'Within 24 hours',     href:null },
];

const PROMISES = ['Free initial consultation','Fixed-price contracts available','NDA signed before discussions','Dedicated project manager','3-month post-launch support'];

// Home-page project finder → this form's "Project Type" options
const SLUG_TO_TYPE = {
  'erp-software':'ERP Software', 'construction-management':'Construction Management System',
  'billing-software':'Billing / Accounting Software', 'web-applications':'Custom Web Application',
  'mobile-apps':'Mobile App (Android / iOS)', 'cloud-hosting':'Cloud Hosting / Infrastructure',
  'it-consulting':'IT Consulting', 'whatsapp-business':'Other',
};

function prefill(state) {
  if (!state) return { type:'', message:'' };
  const svc = SERVICES.find(s => s.slug === state.service);
  const parts = [
    svc && `I'm looking for ${svc.title}`,
    state.industry && `for my ${state.industry} business`,
  ].filter(Boolean);
  const msg = [
    parts.length ? parts.join(' ') + '.' : '',
    state.budget && `Budget: ${state.budget}.`,
  ].filter(Boolean).join(' ');
  return { type: SLUG_TO_TYPE[state.service] || '', message: msg ? msg + '\n\n' : '' };
}

export default function ContactPage() {
  const { state } = useLocation();
  const [form, setForm] = useState(() => ({ name:'',email:'',phone:'', ...prefill(state) }));
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  // Enquiries go straight to the business WhatsApp with every field filled in.
  const submit = e => {
    e.preventDefault(); setLoading(true);
    openWhatsApp([
      'Hello Apps2Cloud! 👋',
      'New enquiry from the Contact page:',
      '',
      `• Name: ${form.name}`,
      `• Phone: ${form.phone}`,
      form.email ? `• Email: ${form.email}` : false,
      `• Project: ${form.type}`,
      '',
      form.message.trim(),
    ].filter(l => l !== false).join('\n'));
    setLoading(false); setDone(true);
  };

  return (
    <div className="contact-wrapper">


<SEO
  title="Contact Us — Get Free Software Consultation in Tamil Nadu"
  description="Contact Apps2Cloud for a free consultation on ERP software, billing software, mobile apps or business websites. Based in Tamil Nadu. Call +91 70102 13133 or WhatsApp us."
  keywords="contact Apps2Cloud, software company Tamil Nadu contact, ERP software consultation Tamil Nadu, hire software developer Tamil Nadu, software quote Tamil Nadu"
  url="/contact"
  schema={{
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Apps2Cloud",
    "url": "https://apps2cloud.in/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Apps2Cloud",
      "telephone": "+917010213133",
      "email": "hello@apps2cloud.in",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "openingHours": "Mo-Sa 09:30-18:30"
    }
  }}
/>

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg"/>
        <div className="container">
          <div className="stag anim-up">Contact Us</div>
          <h1 className="contact-hero-title anim-up">
            Let's Start Your <span className="gradient-text">Digital Journey</span>
          </h1>
          <p className="contact-hero-sub anim-up">
            Tell us about your project. We'll respond within 24 hours with a free consultation, technical approach, and cost estimate.
          </p>
        </div>
      </section>

      {/* Main section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* Left — Info */}
            <div className="contact-info-col">
              <h2 className="contact-info-title">Get in <span className="gradient-text">Touch</span></h2>
              <p className="contact-info-sub">Available Mon–Sat, 9am–7pm IST. Expect a response within 24 hours.</p>

              <div className="contact-items">
                {CONTACT_ITEMS.map((item, i) => {
                  const Tag = item.href ? 'a' : 'div';
                  return (
                    <Tag key={i} href={item.href} className="contact-item">
                      <div className="contact-item-icon">{item.icon}</div>
                      <div>
                        <div className="contact-item-label">{item.label}</div>
                        <div className="contact-item-val">{item.val}</div>
                      </div>
                    </Tag>
                  );
                })}
              </div>

              <div className="contact-promises">
                <div className="contact-promises-label">Why clients choose us</div>
                {PROMISES.map(p => (
                  <div key={p} className="contact-promise-row">
                    <span className="contact-promise-check">✓</span> {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-form-card gcard">
              {done ? (
                <div className="contact-success">
                  <div className="contact-success-icon">🎉</div>
                  <h3>WhatsApp is open with your message</h3>
                  <p>Tap <strong>Send</strong> in WhatsApp to deliver it to our team at +91 {PHONE_LABEL}. We reply within 24 hours.</p>
                  <button className="btn btn-p" onClick={() => setDone(false)}>WhatsApp didn’t open? Try again</button>
                </div>
              ) : (
                <>
                  <h2 className="contact-form-title">Request a Free Consultation</h2>
                  <p className="contact-form-sub">Fill in the details and we'll craft a response tailored to your needs.</p>
                  <form onSubmit={submit} className="contact-form">
                    <div className="contact-form-row">
                      <div className="contact-field">
                        <label className="contact-label">Full Name *</label>
                        <input className="contact-input" type="text" name="name" placeholder="Your full name" required value={form.name} onChange={change}/>
                      </div>
                      <div className="contact-field">
                        <label className="contact-label">Email Address</label>
                        <input className="contact-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={change}/>
                      </div>
                    </div>
                    <div className="contact-form-row">
                      <div className="contact-field">
                        <label className="contact-label">Phone / WhatsApp *</label>
                        <input className="contact-input" type="tel" name="phone" inputMode="tel" pattern="[+0-9 ]{10,15}" placeholder="+91 98765 43210" required value={form.phone} onChange={change}/>
                      </div>
                      <div className="contact-field">
                        <label className="contact-label">Project Type *</label>
                        <select className="contact-input contact-select" name="type" required value={form.type} onChange={change}>
                          <option value="" disabled>Select a service</option>
                          {TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="contact-field">
                      <label className="contact-label">Tell Us About Your Project *</label>
                      <textarea className="contact-input contact-textarea" name="message" required placeholder="Describe your project, goals, timeline, and requirements..." value={form.message} onChange={change} rows={5}/>
                    </div>
                    <button type="submit" className="btn btn-p contact-submit" disabled={loading}>
                      {loading
                        ? <><span className="contact-spinner"/> Sending...</>
                        : 'Send on WhatsApp →'
                      }
                    </button>
                    <p className="contact-privacy">🔒 Your information is safe. We never share your data.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
     <section className="contact-map-section">
  <div className="container">
    <div className="office-card">

      <div className="office-badge">
        <span className="pulse"></span>
        Headquarters
      </div>

      <h2 className="office-title">
        Visit <span>Apps2Cloud</span>
      </h2>

      <p className="office-desc">
        We'd love to meet you. Visit our office or schedule a meeting to discuss
        your next software project.
      </p>

      <div className="office-info">

        <div className="info-item">
          <div className="info-icon">📍</div>
          <div>
            <h4>Office Address</h4>
            <p>
              Khansapuram,<br />
              Virudhunagar District,<br />
              Tamil Nadu - 626133,<br />
              India
            </p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">🌍</div>
          <div>
            <h4>Serving</h4>
            <p>Clients Across India & Worldwide</p>
          </div>
        </div>

      </div>

      <a
        href="https://maps.google.com/?q=Khansapuram,Tamil+Nadu+626133"
        target="_blank"
        rel="noopener noreferrer"
        className="office-btn"
      >
        🗺️ Get Directions
      </a>

    </div>
  </div>
</section>
    </div>
  );
}
