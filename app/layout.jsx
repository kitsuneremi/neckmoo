'use client';
import { SessionProvider } from "next-auth/react"
import '@/styles/global.scss'
import style from '@/styles/layout/mainLayout.module.scss'
import classNames from "classnames/bind"
import Provider from '@/redux/provider'

const cx = classNames.bind(style)

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <SessionProvider>
        <Provider>
          <body>
            <div className={cx('body')}>
              {children}
            </div>
          </body>
        </Provider>
      </SessionProvider>
    </html>
  )
} 
