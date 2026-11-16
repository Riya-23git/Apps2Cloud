// src/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  keywords,
  url,
  image = 'https://apps2cloud.in/og-image.png',
  type = 'website',
  schema,
}) {
  const fullTitle = title
    ? `${title} | Apps2Cloud`
    : 'Apps2Cloud — Software Development Company in Tamil Nadu';

  const fullUrl = url
    ? `https://apps2cloud.in${url}`
    : 'https://apps2cloud.in';

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="keywords"           content={keywords} />
      <meta name="author"             content="Apps2Cloud" />
      <meta name="robots"             content="index, follow" />
      <link rel="canonical"           href={fullUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content="Apps2Cloud" />
      <meta property="og:locale"      content="en_IN" />

      {/* ── Twitter ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── Schema / Structured Data ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}