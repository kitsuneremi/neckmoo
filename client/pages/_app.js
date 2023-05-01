import '@/styles/globals.css'
import VariableProvider from '@/GlobalVariableStorage/Storage'

export default function App({ Component, pageProps }) {
  return <VariableProvider><Component {...pageProps} /></VariableProvider>
}
