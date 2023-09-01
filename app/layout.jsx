import './globals.css'

import localFont from 'next/font/local'

const jf = localFont({src: "../fonts/jf.ttf"})
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full ${jf.className}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={"h-full"}>{children}</body>
    </html>
  )
}
