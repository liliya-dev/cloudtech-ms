import type { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';

import '../style/plyr-custom.css';
import '../style/plyr.css';
import '../style/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
