import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NextHead from 'next/head'
import { useCallback, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'next-themes'
import { NextSeo } from 'next-seo'
import { SiteHeader } from 'components/layouts/SiteHeader'
import { SiteFooter } from 'components/layouts/SiteFooter'
import { FixedFooter } from 'components/layouts/FixedFooter'
import { Config } from 'lib/site.config'
import 'styles//main.css'
import 'styles/globals.scss'
import 'keen-slider/keen-slider.min.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Focus on main when the page transitions.
  const router = useRouter()

  const handleRouteChange = useCallback(() => {
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  })

  return (
    <>
      <NextSeo {...Config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" key="site-manifest" />
        <script
          async
          src="https://unpkg.com/pwacompat"
          crossOrigin="anonymous"
        ></script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/images/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/images/icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </NextHead>
      <ThemeProvider>
        <FixedFooter>
          <RecoilRoot>
            <SiteHeader />
            <main id="main" tabIndex={-1} aria-label="メイン">
              <Component {...pageProps} />
            </main>
            <SiteFooter />
          </RecoilRoot>
        </FixedFooter>
      </ThemeProvider>
    </>
  )
}

export default MyApp
