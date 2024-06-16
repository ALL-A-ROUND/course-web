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
import {FactoryIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import {Spin} from "antd";

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
    if(loading) return <Spin size={"large"}/>;
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
        </>
    )
}
