"use client"
import './globals.css'

import localFont from 'next/font/local'
import Script from "next/script";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";

const jf = localFont({src: "../fonts/jf.ttf"})
export default function RootLayout({children}) {
    const [user, loading] = useAuthState(auth)
    return (
        <html lang="zh" className={`h-full ${jf.className}`}>
        <Script id="ms-clarity" strategy="afterInteractive">
            {`(function (c, l, a, r, i, t, y) {
                c[a] = c[a] || function () {
                    (c[a].q = c[a].q || []).push(arguments)
                };
                t = l.createElement(r);
                t.async = 1;
                t.src = "https://www.clarity.ms/tag/" + i;
                y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "j95q53c3qt");`}
        </Script>
        {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head/>
        <body className={"h-full"}>
        {loading ? (
            <div>Loading....</div>
        ): children}

        <script data-jsd-embedded data-key="b3282d69-8c52-48af-9cf8-60e9b573fca8"
                data-base-url="https://jsd-widget.atlassian.com"
                src="https://jsd-widget.atlassian.com/assets/embed.js"></script>
        </body>
        </html>
    )
}
