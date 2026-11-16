import React, { useState } from 'react';
import { Sheet, useIsMobile } from './Picker';
import { openWhatsApp, PHONE_LABEL } from '../contact';

export const WaIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z" /></svg>
);

/* Asks for the visitor's number, then opens WhatsApp with the full enquiry addressed to the business. */
export default function LeadForm({ summary, onClose }) {
  const mobile = useIsMobile();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);

  const send = (e) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(digits)) { setErr('Please enter a valid 10-digit mobile number'); return; }
    const lines = [
      'Hello Apps2Cloud! 👋',
      'New enquiry from the website:',
      '',
      ...summary.map(([k, v]) => `• ${k}: ${v}`),
      name.trim() ? `• Name: ${name.trim()}` : null,
      `• Contact: +91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
      '',
      'Please share an estimate.',
    ].filter(l => l !== null);
    openWhatsApp(lines.join('\n'));
    setSent(true);
  };

  return (
    <Sheet
      title={sent ? 'Almost done!' : 'Get your free estimate'}
      subtitle={sent ? undefined : 'We reply on WhatsApp within 24 hours'}
      onClose={onClose}
      mobile={mobile}
      modal
    >
      {sent ? (
        <div className="lead-done">
          <div className="lead-done-ico">✓</div>
          <b>WhatsApp is open with your enquiry</b>
          <p>Tap <strong>Send</strong> in WhatsApp to deliver it to our team at +91 {PHONE_LABEL}. We’ll reply with an estimate shortly.</p>
          <button type="button" className="lead-again" onClick={() => setSent(false)}>WhatsApp didn’t open? Try again</button>
        </div>
      ) : (
        <form onSubmit={send} noValidate>
          {summary.length > 0 && (
            <div className="lead-sum">
              {summary.map(([k, v]) => <span key={k}><i>{k}</i>{v}</span>)}
            </div>
          )}
          <div className="lead-f">
            <label htmlFor="lead-phone">Your mobile number *</label>
            <div className="lead-phone">
              <span>+91</span>
              <input id="lead-phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210"
                value={phone} onChange={e => { setPhone(e.target.value); setErr(''); }} autoFocus={!mobile} />
            </div>
            {err && <span className="lead-err">{err}</span>}
          </div>
          <div className="lead-f">
            <label htmlFor="lead-name">Your name</label>
            <input id="lead-name" className="lead-in" type="text" autoComplete="name" placeholder="Optional"
              value={name} onChange={e => setName(e.target.value)} />
          </div>
          <button type="submit" className="lead-go"><WaIcon />Send on WhatsApp</button>
          <p className="lead-note">🔒 Your number is only used to reply to this enquiry.</p>
        </form>
      )}
    </Sheet>
  );
}
