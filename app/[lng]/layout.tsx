import './globals.css'
import "react-toastify/dist/ReactToastify.css";

import localFont from 'next/font/local'
import Script from "next/script";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/lib/firebase/firebase";
import dynamic from 'next/dynamic';
import { AntdRegistry } from "@ant-design/nextjs-registry";

const jf = localFont({ src: "../../fonts/jf.ttf" })

import { ToastContainer } from 'react-toastify'

export const metadata = {
    title: "全方位課程平台",
    description: "立志中學 全方位課程平台",
}
import { dir } from 'i18next'

import { languages } from '../i18n/settings'

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}



export default function RootLayout({ children,
                                       params: {
                                           lng
                                       } }) {
    const TrackingComponent = dynamic(() => import(`@/components/tracking/${process.env.NEXT_PUBLIC_APP_ID}`), {
        ssr: false,
    });
    return (
        <html lang={lng} dir={dir(lng)} className={`h-full ${jf.className}`}>
            <head />
            <body className={"h-full"}>
                <AntdRegistry> {children}</AntdRegistry>
                <Script data-jsd-embedded data-key="b3282d69-8c52-48af-9cf8-60e9b573fca8"
                    data-base-url="https://jsd-widget.atlassian.com"
                    src="https://jsd-widget.atlassian.com/assets/embed.js" />
                <TrackingComponent />
                <ToastContainer />
            </body>
        </html>
    )
}
