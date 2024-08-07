"use client"

import React, {useState} from "react"
import {motion} from "framer-motion"
import Link from "next/link"

import {
    LayoutGrid,
    BarChart,
    CreditCard,
    CircleUserRound, Cog,
} from "lucide-react"

import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"

export default function AccountsRelationsLayout({
                                                    children
                                                }: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    // const [tabSelected, setTabSelected] = useState("notification-center")

    return (
        <React.Fragment>
            <div className="w-full min-h-screen">
                {children}

                <nav className="fixed bottom-0 w-full h-16 flex flex-row items-start justify-center">
                    <div
                        className="w-4/5 bg-gray-500 h-4/5 rounded-full flex flex-row justify-between md:justify-center md:gap-4 px-5">
                        <Link href="/abstract" passHref>
                            <div className={cn("text-white rounded-full items-center flex flex-row relative h-full",
                                pathname === "/abstract" ? "w-32" : "w-10"
                            )}>
                                <LayoutGrid className="size-6 z-20 ml-3"/>
                                <span className={cn("z-20 pl-3",
                                    pathname === "/abstract" ? "block" : "hidden"
                                )}>
                                    課程進度
                                </span>
                                {pathname === "/abstract" && (
                                    <motion.div layoutId="buttom-navigation"
                                                className="absolute w-32 h-4/5 bg-red-100/80 z-10 rounded-lg"/>
                                )}
                            </div>
                        </Link>
                        {/*<Link href="/statistics" passHref>*/}
                        {/*    <div className={cn("rounded-full items-center flex flex-row relative h-full",*/}
                        {/*        pathname === "/statistics" ? "w-32" : "w-10"*/}
                        {/*    )}>*/}
                        {/*        <BarChart className="size-6 z-20 ml-3" />*/}
                        {/*        <span className={cn("z-20 pl-3",*/}
                        {/*            pathname === "/statistics" ? "block" : "hidden"*/}
                        {/*        )}>*/}
                        {/*            數據顯示*/}
                        {/*        </span>*/}
                        {/*        {pathname === "/statistics" && (*/}
                        {/*            <motion.div layoutId="buttom-navigation" className="absolute w-32 h-4/5 bg-red-100/80 z-10 rounded-lg" />*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                        {/*<Link href="/payment">*/}
                        {/*    <div className={cn("rounded-full items-center flex flex-row relative h-full",*/}
                        {/*        pathname === "/payment" ? "w-32" : "w-10"*/}
                        {/*    )}>*/}
                        {/*        <CreditCard className="size-6 z-20 ml-3" />*/}
                        {/*        <span className={cn("z-20 pl-3",*/}
                        {/*            pathname === "/payment" ? "block" : "hidden"*/}
                        {/*        )}>*/}
                        {/*            支付方式*/}
                        {/*        </span>*/}
                        {/*        {pathname === "/payment" && (*/}
                        {/*            <motion.div layoutId="buttom-navigation" className="absolute w-32 h-4/5 bg-red-100/80 z-10 rounded-lg" />*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                        {/*<Link href="/about-me">*/}
                        {/*    <motion.div className={cn("rounded-full items-center flex flex-row relative h-full",*/}
                        {/*        pathname === "/about-me" ? "w-32" : "w-10"*/}
                        {/*    )} >*/}
                        {/*        <CircleUserRound className="size-6 z-20 ml-3" />*/}
                        {/*        <span className={cn("z-20 pl-3",*/}
                        {/*            pathname === "/about-me" ? "block" : "hidden"*/}
                        {/*        )}>*/}
                        {/*            關於我*/}
                        {/*        </span>*/}
                        {/*        {pathname === "/about-me" && (*/}
                        {/*            <motion.div layoutId="buttom-navigation" className="absolute w-32 h-4/5 bg-red-100/80 z-10 rounded-lg" />*/}
                        {/*        )}*/}
                        {/*    </motion.div>*/}
                        {/*</Link>*/}
                        <Link href="/member">
                            <motion.div className={cn("text-white rounded-full items-center flex flex-row relative h-full",
                                pathname === "/member" ? "w-32" : "w-10"
                            )}>
                                <Cog className="size-6 z-20 ml-3"/>
                                <span className={cn("z-20 pl-3",
                                    pathname === "/member" ? "block" : "hidden"
                                )}>
                                    設定
                                </span>
                                {pathname === "/member" && (
                                    <motion.div layoutId="buttom-navigation"
                                                className="absolute w-32 h-4/5 bg-red-100/80 z-10 rounded-lg"/>
                                )}
                            </motion.div>
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="hidden md:w-full">
                {children}
            </div>
        </React.Fragment>
    )
}
