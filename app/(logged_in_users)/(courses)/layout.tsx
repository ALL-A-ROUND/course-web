"use client"

import React from "react";

import Link from "next/link"
import { usePathname } from "next/navigation";

import {
    Home,
    Search,
    Bell,
    GraduationCap,
} from "lucide-react"

import { cn } from "@/lib/utils"

export default function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="md:hidden w-full min-h-screen">
            {children}

            <nav className="fixed bottom-0 w-full h-16 flex flex-row items-center justify-between bg-[#9F9C79]">
                <Link href="/home" passHref>
                    <div className={cn("rounded-full items-center flex flex-col relative h-full w-20",
                    )}>
                        <Home className="size-6 z-20 ml-3" />
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                        )}>
                            主頁面
                        </span>
                    </div>
                </Link>
                <Link href="/notification" passHref>
                    <div className={cn("rounded-full items-center flex flex-col relative h-full w-20",
                        // pathname === "/notification" ? "w-40" : "w-40"
                    )}>
                        <Bell className="size-6 z-20 ml-3" />
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                            // pathname === "/home" ? "block" : "hidden"
                        )}>
                            通知中心
                        </span>
                    </div>
                </Link>
                <Link href="/search" passHref>
                    <div className={cn("rounded-full items-center flex flex-col relative h-full w-20",
                        // pathname === "/search" ? "w-40" : "w-40"
                    )}>
                        <Search className="size-6 z-20 ml-3" />
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                            // pathname === "/search" ? "block" : "hidden"
                        )}>
                            搜尋課程
                        </span>
                    </div>
                </Link>
                <Link href="/abstract" passHref>
                    <div className={cn("rounded-full items-center flex flex-col relative h-full w-20",
                        // pathname === "/search" ? "w-40" : "w-40"
                    )}>
                        <GraduationCap className="size-6 z-20 ml-3" />
                        <span className={cn("z-20 pl-3 md:text-md text-sm",
                            // pathname === "/search" ? "block" : "hidden"
                        )}>
                            學習狀態
                        </span>
                    </div>
                </Link>
            </nav>
        </div>
    )
}