import { Footer, Navbar } from '../components'
import { Space_Grotesk, Manrope, Inconsolata } from 'next/font/google';
import '@/styles/globals.css'

const sg = Space_Grotesk({subsets: ['latin'], variable: '--font-family'});
const manrope = Manrope({subsets: ['latin'], variable: '--font-text'});
const inconsolata = Inconsolata({subsets: ['latin'], variable: '--font-code'});


export default function App({ Component, pageProps }) {
  return (
    <div className={"dotted__bg " + sg.className}>
      <Navbar />
      <Component {...pageProps} className="outlet__margin"/>
      <Footer />
    </div>
  )
}
