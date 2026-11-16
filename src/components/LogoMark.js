import React, { useId } from 'react';

/* Apps2Cloud mark: a solid orange cloud with an upload arrow cut through it —
   "your apps, up to the cloud". The arrow is a real cut-out, so it shows whatever
   is behind the logo and works on both the charcoal and the light theme. */
export default function LogoMark({ size = 40, className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`a2c-g-${id}`} x1="10" y1="12" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset=".45" stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <mask id={`a2c-m-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          <path d="M32 44V26M24 34l8-8 8 8" stroke="#000" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>
      <path
        d="M18 50H47a13 13 0 0 0 1.5-25.9A17 17 0 0 0 16 24.3 13 13 0 0 0 18 50z"
        fill={`url(#a2c-g-${id})`} mask={`url(#a2c-m-${id})`}
      />
    </svg>
  );
}
