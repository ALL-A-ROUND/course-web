"use client"

import React, {useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import {signOut} from "@/lib/firebase/auth";
import {usePathname, useRouter} from "next/navigation";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import AccountRelations from "@/app/[lng]/(home)/(navigation-components)/account-relation";
import {useTranslation} from "@/app/i18n";

export default async function PageLayout({
                                             children,
                                             params: {lng}
                                         }: any) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, loading, error] = useAuthState(auth)

    const logout = async () => {
        await signOut().then(() => {
            router.replace(`${lng}/auth`)
        })
    }

    useEffect(() => {
        if (!loading && !user) {
            if (pathname !== '/home' && pathname !== '/auth')
                router.replace(`${lng}/auth`)
        }
    }, [loading, user])

    const {t} = await useTranslation(lng)

    return (
        <div>
            <nav className="h-16 w-full bg-[#9F9C79] flex flex-row items-center px-4 space-x-5 justify-between">
                <div className="relative">
                    <Image src="/logo/LCVS.png" alt="logo"
                           width={100}
                           height={100}
                           className={"h-12 w-full"}
                    />
                </div>
                <div className="flex flex-row space-x-5 items-center">
                    <Link href={`/${lng}/home`}>
                        <div>
                            {t("首頁")}
                        </div>
                    </Link>
                    <button type="button" onClick={logout}>
                        {t("登出")}
                    </button>
                    <AccountRelations/>
                </div>
            </nav>
            {children}
            <footer className="bg-gray-100 px-5 py-8 pb-20">
                <h2>
                    {t`聯絡我們`}
                </h2>
                {[{
                    title: t`服務電話`,
                    text: "0965-168-725"
                }, {
                    title: t`服務信箱`,
                    text: "administrator@esgltc.com",
                }, {
                    title:  t`LINE 客服`,
                    text: "@home-angel"
                }].map(l => (
                    <div key={l.title} className="flex flex-row gap-3">
                        <h2>{l.title}</h2>
                        <p>{l.text}</p>
                    </div>
                ))}
            </footer>
        </div>
    )
}
