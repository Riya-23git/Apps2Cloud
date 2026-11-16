import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data';
import Picker from './Picker';
import LeadForm from './LeadForm';
import ServiceIcon from './ServiceIcon';
import './HomeHero.css';

const IP = {
  retail: 'M3 9l1.5-5h15L21 9M4 9v11h16V9M9 20v-6h6v6M3 9h18',
  factory: 'M2 20h20M4 20V9l5 3V9l5 3V9l5 3v8M17 4h2v5',
  build: 'M2 20h20M5 20V8l7-5 7 5v12M10 20v-5h4v5',
  pharmacy: 'M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7zM8.5 8.5l7 7',
  wholesale: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
  school: 'M22 9L12 4 2 9l10 5 10-5zM6 11v5c3 2 9 2 12 0v-5',
  agro: 'M12 21V9M12 9c0-3 2-5 5-5 0 3-2 5-5 5zM12 13c0-3-2-5-5-5 0 3 2 5 5 5zM12 17c0-3 2-5 5-5 0 3-2 5-5 5z',
  logistics: 'M1 4h13v12H1zM14 9h4l3 3v4h-7M5.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  other: 'M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z',
};
const svg = (d) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export const INDUSTRIES = [
  ['Retail & Shops', 'Billing, stock, customers', IP.retail],
  ['Manufacturing & Factory', 'Production, raw material, dealers', IP.factory],
  ['Construction', 'Sites, labour, materials', IP.build],
  ['Pharmacy & Clinic', 'Batch, expiry, GST billing', IP.pharmacy],
  ['Wholesale & Distribution', 'Party ledger, credit, orders', IP.wholesale],
  ['School & Education', 'Fees, students, exams', IP.school],
  ['Agro & Rice Mill', 'Purchase, moisture, sales', IP.agro],
  ['Logistics & Delivery', 'Orders, tracking, drivers', IP.logistics],
  ['Other', 'Tell us about your business', IP.other],
].map(([label, desc, d]) => ({ value: label, label, desc, icon: svg(d) }));

export const BUDGETS = [
  ['Under ₹25,000', 'Simple website or billing setup'],
  ['₹25,000 – ₹1 Lakh', 'Shop software or business website'],
  ['₹1 – ₹5 Lakh', 'ERP, mobile app or multi-branch'],
  ['₹5 Lakh & above', 'Large custom platform'],
  ['Not sure yet', 'We’ll suggest the right fit'],
].map(([label, desc]) => ({ value: label, label, desc, icon: <span className="pk-rupee" aria-hidden="true">₹</span> }));

const SERVICE_OPTS = SERVICES.map(sv => ({ value: sv.slug, label: sv.shortTitle, desc: sv.tagline, icon: <ServiceIcon slug={sv.slug} size={20} /> }));

const QUICK = [
  { slug: 'erp-software', label: 'ERP Software',
    icon: <path d="M3 3h18v6H3zM3 13h8v8H3zM15 13h6v8h-6z" /> },
  { slug: 'billing-software', label: 'Billing Software',
    icon: <path d="M6 2h12v20l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6" /> },
  { slug: 'mobile-apps', label: 'Mobile Apps',
    icon: <path d="M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2" /> },
  { slug: 'web-applications', label: 'Websites',
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" /> },
];

const Ico = ({ children, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export default function HomeHero() {
  const [service, setService] = useState('');
  const [industry, setIndustry] = useState('');
  const [budget, setBudget] = useState('');
  const [open, setOpen] = useState(null);
  const [lead, setLead] = useState(false);
  const close = () => setOpen(null);

  const summary = [
    service && ['Need', SERVICES.find(sv => sv.slug === service).shortTitle],
    industry && ['Industry', industry],
    budget && ['Budget', budget],
  ].filter(Boolean);

  // Ask for the visitor's number, then hand the enquiry to WhatsApp.
  const submit = (e) => { e.preventDefault(); setOpen(null); setLead(true); };

  return (
    <section className="bh">
      <div className="bh-bg" aria-hidden="true" />
      <div className="bh-shade" aria-hidden="true" />

      <div className="bh-inner">
        <p className="bh-eyebrow"><span className="bh-live" aria-hidden="true" />Software studio for growing businesses</p>
        <h1 className="bh-title">Run your business on <span>smarter software.</span></h1>
        <p className="bh-sub">
          Billing, ERP, mobile apps and websites built around the way your shop, factory or site
          already works. Ready in weeks, not months.
        </p>

        <form className="bh-search" onSubmit={submit} aria-label="Find the right software">
          <Picker
            label="I need" title="What do you need?" subtitle="Pick the software closest to your idea"
            placeholder="Any software" icon={<Ico><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /></Ico>}
            options={SERVICE_OPTS} value={service} onChange={setService}
            open={open === 'svc'} onOpen={() => setOpen('svc')} onClose={close}
          />

          <span className="bh-sep" aria-hidden="true" />

          <Picker
            label="For my" title="Your industry" subtitle="We tailor every system to how your business runs"
            placeholder="Industry" icon={<Ico><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 10h.01M15 10h.01" /></Ico>}
            options={INDUSTRIES} value={industry} onChange={setIndustry} align="center"
            open={open === 'ind'} onOpen={() => setOpen('ind')} onClose={close}
          />

          <span className="bh-sep" aria-hidden="true" />

          <Picker
            label="Budget" title="Your budget" subtitle="A rough range is fine — we’ll refine it together"
            placeholder="Select range" icon={<Ico><path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l2-3h12v3M17 13.5h.01" /></Ico>}
            options={BUDGETS} value={budget} onChange={setBudget} cols={1} align="right"
            open={open === 'bud'} onOpen={() => setOpen('bud')} onClose={close}
          />

          <button type="submit" className="bh-go">
            Get free estimate
            <Ico size={17}><path d="M5 12h14M13 6l6 6-6 6" /></Ico>
          </button>
        </form>

        <p className="bh-ask">Popular solutions</p>
        <div className="bh-pills">
          {QUICK.map(q => (
            <Link key={q.slug} to={`/services/${q.slug}`} className="bh-pill">
              <Ico size={18}>{q.icon}</Ico>{q.label}
            </Link>
          ))}
        </div>

        <ul className="bh-trust">
          <li>Free consultation</li>
          <li>Proposal in 24 hours</li>
          <li>3 months free support</li>
        </ul>
      </div>

      <a href="#home-next" className="bh-scroll" aria-label="Scroll down"><span /></a>

      {lead && <LeadForm summary={summary} onClose={() => setLead(false)} />}
    </section>
  );
}
