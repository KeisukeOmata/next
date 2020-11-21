import type { AppProps } from 'next/app'
import '../layouts/globals.css'
import 'minireset.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp