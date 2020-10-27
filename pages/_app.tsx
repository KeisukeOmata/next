import { RecoilRoot } from 'recoil'
import '../lib/firebase'
import '../lib/authentication'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp