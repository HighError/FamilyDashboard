import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ua">
      <Head title="Family Dashboard">
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#000000" />
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID ?? ''}
          src={process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_SRC ?? ''}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
