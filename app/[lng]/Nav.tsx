"use client"
import {Fragment, useEffect} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {redirect, usePathname, useRouter} from "next/navigation";
import {HomeIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import {signOut} from "@/lib/firebase/auth";

const navigation = [
    {name: '課程', href: '/course', id: 'course'},
    // {name: '題目', href: '/problem', id: 'problem'},
    // {name: '狀態', href: '/submission', id: 'status'},
    // {name: '競賽', href: '/contest', id: 'contest'},
    // {name: '排行榜', href: '/rank', id: 'rank'},
]
const userNavigation = [
    {name: '個人檔案', href: '/member'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default async function Nav() {

    const pathname = usePathname()
    const [user, loading, error] = useAuthState(auth)

    // useEffect(() => {
    //     if (!loading && !user) {
    //         router.replace('/auth')
    //     }
    // }, [loading, user])
    const config = await import(`@/components/config/${process.env.NEXT_PUBLIC_APP_ID}.json`)

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {/*<img*/}
                                    {/*    className="h-8 w-8"*/}
                                    {/*    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"*/}
                                    {/*    alt="Your Company"*/}
                                    {/*/>*/}
                                    <Link href={'/'}>
                                        <HomeIcon className="h-8 w-8 text-white"/>
                                    </Link>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.filter(
                                            x => config?.app?.nav?.[x.id] ?? true
                                        ).map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    pathname?.startsWith(item.href)
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={pathname?.startsWith(item.href) ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                {/*<span className={"mx-1"}>Hi, {user?.name} {user?.credit}</span>*/}
                                                {/* {user?.avatar ? (
                                                    <img className="h-8 w-8 rounded-full"
                                                         src={`${process.env.NEXT_PUBLIC_ASSET_ENDPOINT}/avatars/${user?.avatar}`}
                                                         alt=""/>
                                                ) : (
                                                    <UserCircleIcon className="h-8 w-8 rounded-full"/>
                                                )} */}
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({active}) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <button
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'w-full text-left block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >登出
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.filter(
                                x => config.nav?.[x.id] ?? true
                            ).map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        pathname?.startsWith(item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={pathname?.startsWith(item.href) ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pt-4 pb-3">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    {/* {user?.avatar_url ? (
                                        <img className="h-10 w-10 rounded-full" src={user?.avatar_url} alt=""/>
                                    ) : (
                                        <UserCircleIcon className="h-10 w-10 rounded-full text-gray-300"/>
                                    )} */}
                                </div>
                                <div className="ml-3">
                                    {/* <div className="text-base font-medium text-white">{user?.name}</div>
                                    <div className="text-sm font-medium text-gray-400">{user?.email}</div> */}
                                </div>
                                <button
                                    type="button"
                                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                                {
                                    loading && (
                                        user ? (
                                            <Disclosure.Button
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                登出
                                            </Disclosure.Button>
                                        ) : (
                                            <Disclosure.Button
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                登入
                                            </Disclosure.Button>
                                        )
                                    )}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
