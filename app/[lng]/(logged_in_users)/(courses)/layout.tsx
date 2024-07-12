"use client"

import React from "react";

import Link from "next/link"
import {usePathname} from "next/navigation";

import {
    Home,
    Search,
    Bell,
    GraduationCap,
} from "lucide-react"

import {cn} from "@/lib/utils"
import {useTranslation} from "@/app/i18n";

export default async function HomeLayout({
                                             children,
                                             params: {lng}
                                         }: {
    children: React.ReactNode,
    params: { lng: string }
}) {
    const pathname = usePathname()
    const {t} = await useTranslation(lng)

    return (
        <div className=" w-full min-h-screen">
            {children}

            <nav
                className="fixed md:hidden bottom-0 w-full h-16 flex flex-row items-center justify-between md:justify-center gap-4 px-4"
                style={{
                    backgroundColor: "rgb(29, 29, 31)"
                }}>
                <Link href="/home" passHref>
                    <div className={cn("text-white rounded-full items-center flex flex-col relative h-full w-20",
                    )}>
                        <Home className="size-6 z-20 ml-3"/>
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                        )}>
                            {t`首頁`}
                        </span>
                    </div>
                </Link>
                <Link href="/notification" passHref>
                    <div className={cn("text-white rounded-full items-center flex flex-col relative h-full w-20",
                        // pathname === "/notification" ? "w-40" : "w-40"
                    )}>
                        <Bell className="size-6 z-20 ml-3"/>
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                            // pathname === "/home" ? "block" : "hidden"
                        )}>
                            {t`通知`}
                        </span>
                    </div>
                </Link>
                <Link href="/search" passHref>
                    <div className={cn("text-white rounded-full items-center flex flex-col relative h-full w-20",
                        // pathname === "/search" ? "w-40" : "w-40"
                    )}>
                        <Search className="size-6 z-20 ml-3"/>
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                            // pathname === "/search" ? "block" : "hidden"
                        )}>

                            {t`搜尋課程`}
                        </span>
                    </div>
                </Link>
                <Link href="/abstract" passHref>
                    <div className={cn("text-white rounded-full items-center flex flex-col relative h-full w-20",
                        // pathname === "/search" ? "w-40" : "w-40"
                    )}>
                        <GraduationCap className="size-6 z-20 ml-3"/>
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                            // pathname === "/search" ? "block" : "hidden"
                        )}>
                            {t`學習狀態`}
                        </span>
                    </div>
                </Link>
            </nav>
        </div>
    )
}
