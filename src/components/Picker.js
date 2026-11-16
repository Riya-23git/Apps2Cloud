import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Picker.css';

const MOBILE = '(max-width: 600px)';
const PANEL_GAP = 28; // the panel's 16px offset from the field plus a 12px margin from the screen edge
const MIN_PANEL = 200;
const CLOSE_DELAY = 1000; // keeps the panel open long enough to see the selected tick

export function useIsMobile() {
  const get = () => typeof window !== 'undefined' && window.matchMedia(MOBILE).matches;
  const [m, setM] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const fn = () => setM(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', fn) : mq.removeListener(fn));
  }, []);
  return m;
}

// Locks page scroll while a phone sheet is open.
export function useScrollLock(on) {
  useEffect(() => {
    if (!on) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [on]);
}

const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
);
const Chev = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
);

/* Bottom sheet on phones, anchored card panel on larger screens. */
export function Sheet({ title, subtitle, onClose, children, mobile, modal = false, className = '', style }) {
  const portal = mobile || modal;
  useScrollLock(portal);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const panel = (
    <div className={`pk-panel ${mobile ? 'pk-sheet' : ''} ${modal && !mobile ? 'pk-modal' : ''} ${className}`} style={style} role="dialog" aria-modal={portal || undefined} aria-label={title}>
      {mobile && <span className="pk-grab" aria-hidden="true" />}
      <div className="pk-head">
        <div><b>{title}</b>{subtitle && <small>{subtitle}</small>}</div>
        <button type="button" className="pk-x" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="pk-body">{children}</div>
    </div>
  );
  if (!portal) return panel;
  return createPortal(
    <div className={`pk-overlay ${mobile ? "" : "pk-center"}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>{panel}</div>,
    document.body,
  );
}

export default function Picker({ label, title, subtitle, placeholder, icon, options, value, onChange, open, onOpen, onClose, cols = 2, align = 'left' }) {
  const ref = useRef(null);
  const mobile = useIsMobile();
  const current = options.find(o => o.value === value);
  const [place, setPlace] = useState({ up: false, maxHeight: undefined });
  const closeT = useRef(null);

  // Cancels a pending close once this picker closes another way, so it can't shut a panel opened after it.
  useEffect(() => () => clearTimeout(closeT.current), [open]);

  const pick = (optionValue) => {
    onChange(optionValue === value ? '' : optionValue);
    clearTimeout(closeT.current);
    closeT.current = setTimeout(onClose, CLOSE_DELAY);
  };

  useEffect(() => {
    if (!open || mobile) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open, mobile, onClose]);

  // Opens upward when the space below is too small and there is more room above, without covering the navbar.
  useLayoutEffect(() => {
    if (!open || mobile) return undefined;
    const measure = () => {
      const panel = ref.current?.querySelector('.pk-panel');
      if (!panel) return;
      const field = ref.current.getBoundingClientRect();
      const navBottom = Math.max(0, document.querySelector('.nx')?.getBoundingClientRect().bottom || 0);
      const wanted = Math.min(420, window.innerHeight * 0.7, panel.querySelector('.pk-head').offsetHeight + panel.querySelector('.pk-body').scrollHeight + 2);
      const below = window.innerHeight - field.bottom - PANEL_GAP;
      const above = field.top - navBottom - PANEL_GAP;
      const up = below < wanted && above > below;
      const room = up ? above : below;
      const maxHeight = room < wanted ? Math.max(MIN_PANEL, Math.round(room)) : undefined;
      setPlace(p => (p.up === up && p.maxHeight === maxHeight ? p : { up, maxHeight }));
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [open, mobile]);

  return (
    <div className={`bh-field pk ${open ? 'is-open' : ''} ${value ? 'has-val' : ''}`} ref={ref}>
      <button type="button" className="bh-trigger" onClick={open ? onClose : onOpen} aria-haspopup="dialog" aria-expanded={open}>
        <span className="bh-lbl">{label}</span>
        <span className="bh-ctl">
          {icon}
          <span className="bh-val">{current ? current.label : placeholder}</span>
          <span className="pk-chev"><Chev /></span>
        </span>
      </button>

      {open && (
        <Sheet
          title={title} subtitle={subtitle} onClose={onClose} mobile={mobile}
          className={`pk-align-${align} ${!mobile && place.up ? 'pk-up' : ''}`}
          style={!mobile && place.maxHeight ? { maxHeight: place.maxHeight } : undefined}
        >
          <div className={`pk-grid pk-cols-${cols}`} style={{ '--cols': cols }}>
            {options.map(o => (
              <button
                key={o.value}
                type="button"
                className={`pk-opt ${o.value === value ? 'on' : ''}`}
                onClick={() => pick(o.value)}
              >
                {o.icon && <span className="pk-ico">{o.icon}</span>}
                <span className="pk-txt"><b>{o.label}</b>{o.desc && <small>{o.desc}</small>}</span>
                <span className="pk-check"><Check /></span>
              </button>
            ))}
          </div>
        </Sheet>
      )}
    </div>
  );
}
