import React from 'react';
import LegalPage from './LegalPage';
import content from '../legal/privacy.json';

/* Content lives in src/legal/privacy.json.
   public/privacy-policy.html is generated from the same file on build. */
export default function PrivacyPolicy() {
  return <LegalPage content={content} />;
}
