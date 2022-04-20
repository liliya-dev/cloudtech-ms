import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const shouldEnableMarker = () =>
  process.env.NEXT_PUBLIC_SANITY_DATASET === 'client-staging';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#003e56"
          />
          <meta name="msapplication-TileColor" content="#003e56" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="google-site-verification"
            content="uVaIgFWwHWBo6OHEk3guGHC-6byeCM09tOpHbQ9qu7s"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="crossOrigin"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap"
            rel="stylesheet"
          />

          {shouldEnableMarker() && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.markerConfig = { destination: '6194cb5ce8a98103607e6fb0' };`,
              }}
            />
          )}
          {shouldEnableMarker() && (
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);`,
              }}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
