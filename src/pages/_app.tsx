import React from 'react'
import Head from 'next/head'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="manifest" href="manifest.webmanifest" />
        <script
          async
          src="https://unpkg.com/pwacompat"
          crossOrigin="anonymous"
        ></script>
        <link rel="icon" type="image/png" href="pwa.png" sizes="128x128" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
