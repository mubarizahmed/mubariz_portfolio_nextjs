import { Footer, Navbar } from '../components'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="dotted__bg">
      <Navbar />
      <Component {...pageProps} className="outlet__margin"/>
      <Footer />
    </div>
  )
}
