import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import SiteHeader from '../components/layouts/SiteHeader'
import { SiteFooter } from '../components/layouts/SiteFooter'
import { FixedFooter } from '../components/layouts/FixedFooter'
import '../styles//main.css'
import '../styles/globals.scss'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

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
      <FixedFooter>
        <RecoilRoot>
          <SiteHeader />
          <Component {...pageProps} />
        </RecoilRoot>
        <SiteFooter />
      </FixedFooter>
    </>
  )
}

export default MyApp
