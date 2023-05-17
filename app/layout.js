import Navbar from "@/components/Navbar"
import Sidebar from "@/components/DefaultSidebar"
import '@/styles/global.scss'
import style from '@/styles/mainLayout.module.scss'
import classNames from "classnames/bind"
import VariableProvider from "@/GlobalVariableProvider/Storage"
import Context from "@/GlobalVariableProvider/Context"
import { useContext } from "react"
const cx = classNames.bind(style)
export const metadata = {
  title: 'Carymei',
  description: 'what the f*ck man?',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <VariableProvider>
        <body className={cx('body')}>
          {children}
        </body>
      </VariableProvider>
    </html>
  )
} 
