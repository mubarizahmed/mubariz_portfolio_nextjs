import { Footer, Navbar } from '../components'

import '@/styles/globals.css'
import '@/styles/github-dark.css'

export default function App({ Component, pageProps }) {
  return (
    <div className={"dotted__bg "}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
