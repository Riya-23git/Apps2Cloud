import React from 'react';
import LegalPage from './LegalPage';
import content from '../legal/terms.json';

/* Content lives in src/legal/terms.json.
   public/terms-of-service.html is generated from the same file on build. */
export default function TermsPage() {
  return <LegalPage content={content} />;
}
