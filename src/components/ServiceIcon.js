import React from 'react';

// Line icons per service slug — replaces the emoji icons for a cleaner, business look.
const PATHS = {
  'web-applications': 'M3 4h18v12H3zM8 20h8M12 16v4M7 8h6M7 11h10',
  'mobile-apps': 'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2',
  'cloud-hosting': 'M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4 12.5 3.5 3.5 0 0 0 6.5 19zM12 13v6M9.5 15.5 12 13l2.5 2.5',
  'erp-software': 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  'construction-management': 'M2 21h20M4 21V10l8-6 8 6v11M9 21v-6h6v6M9 11h.01M15 11h.01',
  'billing-software': 'M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4',
  'whatsapp-business': 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.7A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01',
  'it-consulting': 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z',
};
const FALLBACK = 'M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z';

export default function ServiceIcon({ slug, size = 22, stroke = 1.9 }) {
  return (
    <svg className="svc-line-ico" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[slug] || FALLBACK} />
    </svg>
  );
}
