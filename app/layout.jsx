
import './globals.css'

import localFont from 'next/font/local'
import Script from "next/script";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/lib/firebase/firebase";
import dynamic from 'next/dynamic';

const jf = localFont({ src: "../fonts/jf.ttf" })
export default function RootLayout({ children }) {
    // const [user, loading] = useAuthState(auth)
    const TrackingComponent = dynamic(() => import(`@/components/tracking/${process.env.NEXT_PUBLIC_APP_ID}`), {
        ssr: false,
    });
    return (
        <html lang="zh-TW" className={`h-full ${jf.className}`}>
            <head />
            <body className={"h-full"}>
                {children}
                <Script data-jsd-embedded data-key="b3282d69-8c52-48af-9cf8-60e9b573fca8"
                    data-base-url="https://jsd-widget.atlassian.com"
                    src="https://jsd-widget.atlassian.com/assets/embed.js" />
                <TrackingComponent />
            </body>
        </html>
    )
}
