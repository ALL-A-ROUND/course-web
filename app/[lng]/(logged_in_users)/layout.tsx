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
import {Trans} from 'react-i18next/TransWithoutContext'
import {languages} from '@/app/i18n/settings'

export default async function PageLayout({
                                             children,
                                             params: {lng}
                                         }: any) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, loading, error] = useAuthState(auth)

    const logout = async () => {
        await signOut().then(() => {
            router.replace(`/${lng}/auth`)
        })
    }

    useEffect(() => {
        if (!loading && !user) {
            if (pathname?.indexOf('home') == -1 && pathname?.indexOf('/auth') == -1)
                router.replace(`/${lng}/auth`)
        }
    }, [loading, user])

    const {t} = await useTranslation(lng)

    return (
        <div>
            <nav className="h-16 w-full bg-white flex flex-row items-center px-4 space-x-5 justify-between">
                <div className="relative">
                    <Image src={`/public_assets/logo/${process.env.NEXT_PUBLIC_APP_ID}`} alt="logo"
                           width={100}
                           height={100}
                           className={"h-12 w-full p-1"}
                    />
                </div>
                <div className="flex flex-row space-x-5 items-center">
                    <Link href={`/${lng}/home`}>
                        <div>
                            {t("首頁")}
                        </div>
                    </Link>
                    {!loading && (
                        user ? (
                            <button type="button" onClick={logout}>
                                {t("登出")}
                            </button>
                        ) : (
                            <Link href={"/auth"}>
                                {t("登入")}
                            </Link>
                        )
                    )}
                    <AccountRelations/>
                </div>
            </nav>
            {children}
            <footer className="bg-black text-white px-5 py-8 pb-20">
                <h2 className={"text-2xl"}>
                    {t`聯絡我們`}
                </h2>
                {[{
                    title: t`服務信箱`,
                    text: "contact@nthu.dev",
                }, {
                    title: t`LINE ID`,
                    text: "@810sixny"
                }, {
                    title: t`LINE 客服`,
                    text: "https://page.line.me/810sixny"
                }].map(l => (
                    <div key={l.title} className="flex flex-row gap-3">
                        <h2>{l.title}</h2>
                        <p>{l.text}</p>
                    </div>
                ))}

                <Trans i18nKey="languageSwitcher" t={t}>
                    更改語言 <strong>{lng}</strong> 至:{' '}
                </Trans>
                {languages.filter((l) => lng !== l).map((l, index) => {
                    return (
                        <span key={l}>
            {index > 0 && (' or ')}
                            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
                    )
                })}

            </footer>
        </div>
    )
}
