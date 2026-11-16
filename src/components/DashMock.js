import React, { useId } from 'react';
import './DashMock.css';

/* Modern product-screenshot preview for a portfolio project, drawn in HTML/SVG.
   Layout follows the project type; headline numbers come from the project's real metrics,
   everything else (names, chart shape) is illustrative sample content. */

const kindOf = (p) => {
  const l = (p.categoryLabel || '').toLowerCase();
  if (l.includes('website')) return 'site';
  if (l.includes('app')) return 'phone';
  return 'app';
};

const domainOf = (p) => {
  const l = (p.categoryLabel || '').toLowerCase();
  const t = (p.title || '').toLowerCase();
  if (l.includes('school')) return 'school';
  if (l.includes('mill')) return 'mill';
  if (l.includes('erp')) return 'erp';
  if (t.includes('construction') || l.includes('construction')) return 'site';
  if (t.includes('delivery') || t.includes('courier')) return 'delivery';
  if (t.includes('staff') || t.includes('attendance')) return 'staff';
  return 'billing';
};

const DOMAINS = {
  billing: {
    nav: ['Dashboard', 'Billing', 'Stock', 'Customers', 'Reports'], cta: 'New Bill', panel: 'Recent bills',
    rows: [['Ravi Traders', '₹12,480', 'Paid'], ['Sri Murugan Stores', '₹8,150', 'Paid'], ['Lakshmi Agencies', '₹4,920', 'Due'], ['Walk-in Customer', '₹1,260', 'Paid']],
    insight: '6 items running low on stock', toast: 'Bill #A-2048 sent on WhatsApp', table: true,
  },
  erp: {
    nav: ['Overview', 'Production', 'Inventory', 'Dealers', 'Reports'], cta: 'New Batch', panel: 'Production output',
    insight: 'Kiln 2 efficiency up this week', toast: 'Dealer order DO-311 approved',
  },
  school: {
    nav: ['Overview', 'Students', 'Fees', 'Exams', 'Reports'], cta: 'Admission', panel: 'Fee collection',
    insight: 'Fee reminders sent to parents', toast: 'SMS sent to Class 8-A',
  },
  mill: {
    nav: ['Overview', 'Purchase', 'Production', 'Sales', 'Reports'], cta: 'Purchase', panel: 'Paddy processed',
    insight: 'Moisture within target range', toast: 'Lorry challan LC-118 created',
  },
  site: {
    hello: 'Site overview', list: [['Tower A · Slab work', 72], ['Villa 12 · Plastering', 45], ['Block C · Plumbing', 88]],
  },
  delivery: {
    hello: 'Today’s deliveries', list: [['#4821 · Anna Nagar', 100], ['#4822 · KK Nagar', 60], ['#4823 · T Nagar', 30]],
  },
  field: {
    hello: 'Field team', list: [['Orders captured', 82], ['Visits completed', 64], ['Payments collected', 91]],
  },
  staff: {
    hello: 'Attendance', list: [['Shift A · Present', 92], ['Shift B · Present', 84], ['Overtime approved', 40]],
  },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const BASE = [30, 42, 36, 55, 48, 64, 58, 72, 66, 80, 76, 90];

const series = (seed, base = BASE) =>
  base.map((v, i) => Math.max(8, Math.min(96, v + (((seed * 37 + i * 17) % 21) - 10))));

function curve(pts, w, h) {
  const step = w / (pts.length - 1);
  const P = pts.map((v, i) => [i * step, h - (v / 100) * h]);
  let d = `M${P[0][0]},${P[0][1]}`;
  for (let i = 1; i < P.length; i++) {
    const [x0, y0] = P[i - 1]; const [x1, y1] = P[i]; const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { line: d, area: `${d} L${w},${h} L0,${h} Z`, P };
}

const initials = (s) => s.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
const shortName = (p) => (p.title || '').split('—')[0].trim();
const appName = (p) => { const x = (p.title || '').split('—'); return (x[1] || x[0]).trim(); };

const ICONS = [
  'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  'M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6',
  'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8',
  'M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'M3 3v18h18M7 15l4-4 3 3 5-6',
];
const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

function Spark({ seed }) {
  const { line } = curve(series(seed, [40, 52, 46, 60, 55, 70, 66, 78]), 40, 14);
  return <svg className="dm-spark" viewBox="0 0 40 14" preserveAspectRatio="none"><path d={line} /></svg>;
}

function AreaChart({ seed, gid }) {
  const { line, area, P } = curve(series(seed), 300, 100);
  const tip = P[8];
  return (
    <div className="dm-chartwrap">
      <div className="dm-plot">
      <svg className="dm-area" viewBox="0 0 300 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--dc)" stopOpacity=".38" />
            <stop offset="1" stopColor="var(--dc)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map(y => <line key={y} x1="0" x2="300" y1={y} y2={y} className="dm-gridline" />)}
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} className="dm-line" />
        <line x1={tip[0]} x2={tip[0]} y1={tip[1]} y2="100" className="dm-cursor" />
      </svg>
      <span className="dm-dot" style={{ left: `${(tip[0] / 300) * 100}%`, top: `${tip[1]}%` }} />
      <span className="dm-tip" style={{ left: `${(tip[0] / 300) * 100}%`, top: `${tip[1]}%` }}>Peak</span>
      </div>
      <div className="dm-axis">{MONTHS.map(m => <span key={m}>{m}</span>)}</div>
    </div>
  );
}

function AppView({ p, m, gid }) {
  const d = DOMAINS[domainOf(p)] || DOMAINS.billing;
  return (
    <>
      <div className="dm-win">
        <div className="dm-top">
          <span className="dm-dots"><i /><i /><i /></span>
          <span className="dm-search"><Ico d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4-4" />Search…<kbd>⌘K</kbd></span>
          <span className="dm-top-r"><span className="dm-bell"><Ico d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /></span><span className="dm-avatar">AK</span></span>
        </div>
        <div className="dm-shell">
          <aside className="dm-side">
            <div className="dm-brand"><b /><span className="dm-brand-name">{shortName(p)}</span></div>
            {d.nav.map((n, i) => (
              <span key={n} className={`dm-nav ${i === (d.table ? 1 : 0) ? 'on' : ''}`}><Ico d={ICONS[i]} /><span className="dm-nav-lbl">{n}</span></span>
            ))}
          </aside>
          <main className="dm-main">
            <div className="dm-head">
              <div><small>{appName(p)}</small><strong>{d.table ? 'Billing' : 'Overview'}</strong></div>
              <span className="dm-chipbtn">This month ▾</span>
              <span className="dm-primary">+ {d.cta}</span>
            </div>
            <div className="dm-kpis">
              {m.slice(0, 3).map((k, i) => (
                <div key={k.label} className="dm-kpi">
                  <small>{k.label}</small>
                  <div className="dm-kpi-row"><strong>{k.val}</strong><Spark seed={p.id + i} /></div>
                </div>
              ))}
            </div>
            <div className="dm-panels">
              <section className="dm-card dm-grow">
                <header><b>{d.panel}</b><span className="dm-live"><i />Live</span></header>
                {d.table ? (
                  <div className="dm-table">
                    {d.rows.map(([n, a, s]) => (
                      <div key={n} className="dm-tr">
                        <span className="dm-ini">{initials(n)}</span>
                        <span className="dm-name">{n}</span>
                        <span className="dm-amt">{a}</span>
                        <span className={`dm-status ${s === 'Due' ? 'due' : ''}`}>{s}</span>
                      </div>
                    ))}
                  </div>
                ) : <AreaChart seed={p.id} gid={gid} />}
              </section>
              <section className="dm-card dm-aside">
                <header><b>{d.table ? 'Sales' : 'Split'}</b></header>
                {d.table ? <AreaChart seed={p.id} gid={gid} /> : (
                  <div className="dm-ring"><span>{m[3] ? m[3].val : '78%'}</span><small>{m[3] ? m[3].label : 'Target'}</small></div>
                )}
              </section>
            </div>
          </main>
        </div>
      </div>
      <div className="dm-float dm-ai"><span className="dm-ai-ico">✦</span><div><b>AI insight</b><small>{d.insight}</small></div></div>
      <div className="dm-float dm-toast"><span className="dm-ok">✓</span><small>{d.toast}</small></div>
    </>
  );
}

function SiteView({ p, m }) {
  const name = shortName(p);
  const host = name.replace(/[^a-z]/gi, '').toLowerCase().slice(0, 18) || 'business';
  return (
    <>
      <div className="dm-win dm-browser">
        <div className="dm-top">
          <span className="dm-dots"><i /><i /><i /></span>
          <span className="dm-url"><Ico d="M6 10V8a6 6 0 0 1 12 0v2M5 10h14v11H5z" />{host}.in</span>
        </div>
        <div className="dm-page">
          <div className="dm-pnav"><span className="dm-plogo"><b />{name.split(' ')[0]}</span><span>Products</span><span>About</span><span>Contact</span><em>Enquire</em></div>
          <div className="dm-phero">
            <div className="dm-pcopy">
              <span className="dm-ptag">★ Trusted locally</span>
              <strong>{name}</strong>
              <small>{p.industry}</small>
              <div className="dm-pbtns"><em>Shop now →</em><i>WhatsApp</i></div>
            </div>
            <div className="dm-pgrid">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="dm-ptile" style={{ '--t': i }}><span /><b>₹{[499, 1299, 249, 899][i]}</b></div>
              ))}
            </div>
          </div>
          <div className="dm-pstats">
            {m.slice(0, 3).map(k => <div key={k.label}><strong>{k.val}</strong><small>{k.label}</small></div>)}
          </div>
        </div>
      </div>
      <div className="dm-float dm-toast"><span className="dm-ok">✓</span><small>New enquiry via WhatsApp</small></div>
    </>
  );
}

function PhoneView({ p, m, gid }) {
  const found = DOMAINS[domainOf(p)];
  const d = found && found.list ? found : DOMAINS.field;
  const { line, area } = curve(series(p.id, [30, 45, 40, 62, 55, 75, 70, 88]), 100, 40);
  return (
    <div className="dm-phone">
      <div className="dm-island" />
      <div className="dm-scr">
        <div className="dm-ph-top"><span><small>Good morning</small><b>{d.hello || 'Overview'}</b></span><span className="dm-avatar">SK</span></div>
        <div className="dm-ph-hero">
          <small>{m[0] ? m[0].label : appName(p)}</small>
          <strong>{m[0] ? m[0].val : '24'}</strong>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".45" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient></defs>
            <path d={area} fill={`url(#${gid})`} /><path d={line} fill="none" stroke="#fff" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="dm-seg"><span className="on">Today</span><span>Week</span><span>Month</span></div>
        {(d.list || []).map(([t, pct]) => (
          <div key={t} className="dm-ph-item">
            <div className="dm-ph-item-top"><b>{t}</b><span>{pct}%</span></div>
            <div className="dm-bar"><i style={{ width: `${pct}%` }} /></div>
          </div>
        ))}
        <div className="dm-tabbar"><i className="on" /><i /><em>+</em><i /><i /></div>
      </div>
      {m[1] && <div className="dm-float dm-pf-r"><strong>{m[1].val}</strong><small>{m[1].label}</small></div>}
      <div className="dm-float dm-pf-l"><span className="dm-ok">✓</span><small>Synced to cloud</small></div>
    </div>
  );
}

const VIEWS = { app: AppView, site: SiteView, phone: PhoneView };

export default function DashMock({ project }) {
  const gid = `dm${useId().replace(/:/g, '')}`;
  const kind = kindOf(project);
  const View = VIEWS[kind];
  return (
    <div className={`dm dm-k-${kind}`} style={{ '--dc': project.color }} aria-hidden="true">
      <View p={project} m={project.metrics || []} gid={gid} />
    </div>
  );
}
