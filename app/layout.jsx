'use client';
import { SessionProvider } from "next-auth/react"
import '@/styles/global.scss'
import style from '@/styles/layout/mainLayout.module.scss'
import classNames from "classnames/bind"
import VariableProvider from "@/GlobalVariableProvider/Storage"

const cx = classNames.bind(style)

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <SessionProvider>
        <VariableProvider>
          <body className={cx('body')}>
            {children}
          </body>
        </VariableProvider>
      </SessionProvider>
    </html>
  )
} 
