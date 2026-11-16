import React from 'react';

// Evenly spaced star outline, used by the firework style marks.
const burst = (points, outer, inner, cx = 22, cy = 22) => Array.from({ length: points * 2 }, (_, i) => {
  const r = i % 2 ? inner : outer;
  const a = (Math.PI * i) / points - Math.PI / 2;
  return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

// Each mark draws on a 44x44 grid; `y` and `size` place its letters, `ink` overrides their colour.
const MARKS = {
  house: {
    y: 31, size: 12,
    draw: (c, a) => <><path d="M9 20v22h26V20L22 9z" fill={c} /><path d="M3 22 22 5l19 17" fill="none" stroke={a} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></>,
  },
  bricks: {
    draw: (c, a) => (
      <>
        <rect x="2" y="6" width="19" height="9.5" rx="1.5" fill={c} /><rect x="23" y="6" width="19" height="9.5" rx="1.5" fill={a} />
        <rect x="2" y="17.5" width="8.5" height="9.5" rx="1.5" fill={a} /><rect x="12.5" y="17.5" width="19" height="9.5" rx="1.5" fill={c} /><rect x="33.5" y="17.5" width="8.5" height="9.5" rx="1.5" fill={a} />
        <rect x="2" y="29" width="19" height="9.5" rx="1.5" fill={c} /><rect x="23" y="29" width="19" height="9.5" rx="1.5" fill={a} />
      </>
    ),
  },
  shield: {
    y: 22, size: 15,
    draw: (c, a) => <><path d="M22 2l18 6v13c0 10-7 17-18 21C11 38 4 31 4 21V8z" fill={c} /><path d="M22 7l13 4.500v9.500c0 7-5 12-13 15.500" fill="none" stroke={a} strokeWidth="2" /></>,
  },
  coin: {
    y: 23, size: 22, ink: '#78350f',
    draw: (c, a) => <><circle cx="22" cy="22" r="21" fill={c} /><circle cx="22" cy="22" r="16" fill="none" stroke={a} strokeWidth="2" /></>,
  },
  leaf: {
    y: 23, size: 19,
    draw: c => <path d="M5 39C5 16 17 5 39 5c0 23-11 34-34 34z" fill={c} />,
  },
  diamond: {
    y: 23, size: 14,
    draw: (c, a) => <><path d="M22 1l21 21-21 21L1 22z" fill={c} /><path d="M22 7l15 15-15 15L7 22z" fill="none" stroke={a} strokeWidth="1.6" /></>,
  },
  drop: {
    y: 29, size: 12,
    draw: (c, a) => <><path d="M22 1s16 16.500 16 27a16 16 0 0 1-32 0C6 17.500 22 1 22 1z" fill={c} /><path d="M12 19c3-3 6-3 10 0s7 3 10 0" fill="none" stroke={a} strokeWidth="2.400" strokeLinecap="round" /></>,
  },
  hex: {
    y: 23, size: 14,
    draw: (c, a) => <><path d="M22 1l19 11v21L22 43 3 33V12z" fill={c} /><path d="M22 7l14 8v14l-14 8-14-8V15z" fill="none" stroke={a} strokeWidth="1.600" /></>,
  },
  burst: {
    y: 23, size: 16,
    draw: (c, a) => <><polygon points={burst(12, 22, 15)} fill={c} /><circle cx="22" cy="22" r="11.500" fill={a} /></>,
  },
  flame: {
    y: 32, size: 14,
    draw: (c, a) => <><path d="M23 1c2 9 14 14 14 28a15 15 0 0 1-30 0c0-7 3-11 6-15 1 4 3 6 5 7 2-7 1-13 5-20z" fill={c} /><path d="M22 20c1 4 8 6 8 13a8 8 0 0 1-16 0c0-5 5-7 8-13z" fill={a} /></>,
  },
  factory: {
    draw: (c, a) => <><path d="M2 42V21l12 7v-7l12 7V9h15v33z" fill={c} /><polygon points={burst(4, 8, 2.500, 11, 10)} fill={a} /></>,
  },
  sun: {
    y: 23, size: 15,
    draw: (c, a) => (
      <>
        <g stroke={a} strokeWidth="3" strokeLinecap="round">
          <path d="M22 2v5M22 37v5M2 22h5M37 22h5M7.900 7.900l3.500 3.500M32.600 32.600l3.500 3.500M36.100 7.900l-3.500 3.500M11.400 32.600l-3.500 3.500" />
        </g>
        <circle cx="22" cy="22" r="12.500" fill={c} />
      </>
    ),
  },
  tv: {
    y: 27, size: 15,
    draw: (c, a) => <><path d="M14 3l8 9 8-9" fill="none" stroke={a} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><rect x="2" y="12" width="40" height="30" rx="7" fill={c} /></>,
  },
  wire: {
    y: 23, size: 14,
    draw: (c, a) => <><path d="M34 9a18 18 0 1 0 4 22" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" /><path d="M31 24h12M37 18v-6M41 18v-6" fill="none" stroke={a} strokeWidth="3" strokeLinecap="round" /></>,
  },
  star: {
    y: 23, size: 13,
    draw: (c, a) => <><polygon points={burst(8, 22, 12)} fill={c} /><circle cx="22" cy="22" r="9" fill={a} /></>,
  },
};

// Pass `logo` on a client to show its real logo image in place of the designed mark.
export default function ClientLogo({ client }) {
  if (client.logo) return <img src={client.logo} alt={`${client.name} logo`} className="hx-client-logo" />;
  const mark = MARKS[client.mark];
  return (
    <span className={`hx-brand hx-brand-${client.type}`}>
      <svg className="hx-brand-mark" viewBox="0 0 44 44" aria-hidden="true">
        {mark.draw(client.color, client.accent)}
        {client.letters && <text x="22" y={mark.y} fontSize={mark.size} fontWeight="800" textAnchor="middle" dominantBaseline="central" fill={client.ink || mark.ink || '#fff'}>{client.letters}</text>}
      </svg>
      <span className="hx-brand-txt">
        <span className="hx-brand-word" style={{ color: client.color }}>{client.word[0]}<wbr /><em style={{ color: client.wordAccent || client.accent }}>{client.word[1]}</em></span>
        {client.tag && <small>{client.tag}</small>}
      </span>
    </span>
  );
}
