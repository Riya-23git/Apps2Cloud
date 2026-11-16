// Single source for the business phone / WhatsApp number used in enquiry flows.
export const WA_NUMBER = '917010213133';
export const PHONE_LABEL = '70102 13133';
export const PHONE_HREF = 'tel:+917010213133';

// Opens WhatsApp (app on phones, WhatsApp Web on desktop) with the message ready to send.
export function openWhatsApp(text) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  // The 'noopener' feature makes window.open return null, which would also trigger the fallback.
  const win = window.open(url, '_blank');
  if (win) win.opener = null;
  else window.location.href = url;
}
