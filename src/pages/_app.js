import { Footer, Navbar } from '../components'
import { Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  const sg = Space_Grotesk({ subsets: ['latin'] })

  return (
    <div className={"dotted__bg " + sg.className}>
      <Navbar />
      <Component {...pageProps} className="outlet__margin"/>
      <Footer />
    </div>
  )
}
