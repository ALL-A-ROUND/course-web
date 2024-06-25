"use client"
import {
    BellIcon, BookOpenIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon, StarIcon,
    UserCircleIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {api} from "@/app/utils";
import Nav from "@/app/Nav";
import {DocumentMagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Cog, FactoryIcon, LayoutGrid} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import {Spin} from "antd";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";

const secondaryNavigation = [
    {name: '一般設定', icon: UserCircleIcon, path: "/member/general", id: 'general'},
    {name: '組織設定', icon: FactoryIcon, path: "/member/organization", id: 'organization'},
    // {name: '帳戶安全', icon: FingerPrintIcon, path: "/member/security", id: 'security'},
    // {name: '通知設定', icon: BellIcon, path: "/member/notifications", id: 'notification'},
    {name: '訂單查詢', icon: DocumentMagnifyingGlassIcon, path: "/member/order", id: 'order'},
    {name: '點數紀錄', icon: CubeIcon, path: "/member/credit", id: 'machine'},
    {name: '積分園地', icon: StarIcon, path: "/member/point", id: 'points'},
    // {name: '付款方式', icon: CreditCardIcon, path: "/member/billing", id: 'payment'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default async function Layout({children}) {
    const [user, setUser] = useState()
    const [firebaseUser, loading, error] = useAuthState(auth)
    useEffect(() => {
        if (loading) return
        api("GET", "/user?with=organizations", null, {
            disableError: true,
            cache: "reload",
        }).catch(err => {
            alert(err)
            // if (err.status === 401) {
            //     window.location.href = "/auth"
            // }
        }).then(res => {
            setUser(res)
        })
    }, [loading]);
    const pathname = usePathname()
    const router = useRouter()
    if(loading) return <div className={"min-h-screen min-w-screen flex justify-center items-center"}>
        <Spin size={"large"}/></div>;
        // if (!user) return router.push("/auth")
        const config = await import(`@/components/config/${process.env.NEXT_PUBLIC_APP_ID}.json`)
    return (
        <>
            <Nav/>
            <div className="mx-auto max-w-7xl py-16 lg:flex lg:gap-x-16 lg:px-8">
                <aside
                    className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {secondaryNavigation.filter(
                                x => (config?.app?.settings?.[x.id] ?? true) !== false && (user?.organizations?.length > 0 || x.id !== 'organization')
                            ).map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className={classNames(
                                            pathname.startsWith(item.path)
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    {children}
                </main>
            </div>
            <nav className="fixed bottom-0 w-full h-16 flex flex-row items-start justify-center">
                <div className="w-4/5 bg-emerald-100 h-4/5 rounded-full flex flex-row justify-between px-5">
                    <Link href="/abstract" passHref>
                        <div className={cn("rounded-full items-center flex flex-row relative h-full",
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
                        <motion.div className={cn("rounded-full items-center flex flex-row relative h-full",
                            pathname.startsWith("/member") ? "w-32" : "w-10"
                        )}>
                            <Cog className="size-6 z-20 ml-3"/>
                            <span className={cn("z-20 pl-3",
                                pathname.startsWith("/member") ? "block" : "hidden"
                            )}>
                                    設定
                                </span>
                            {pathname.startsWith("/member") && (
                                <motion.div layoutId="buttom-navigation"
                                            className="absolute w-32 h-4/5 bg-red-100/80 z-10 rounded-lg"/>
                            )}
                        </motion.div>
                    </Link>
                </div>
            </nav>
        </>
    )
}
