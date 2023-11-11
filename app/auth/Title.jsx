"use client"
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function Title() {
    const pathname = usePathname();
    return (
        <>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                {pathname === "/auth/login" ? "登入您的帳號" : "註冊一個帳號"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                或{' '}
                <Link href={pathname === "/auth/login" ? "/auth/register" : "/auth/login"}
                      className="font-medium text-indigo-600 hover:text-indigo-500">
                    {pathname === "/auth/login" ? "註冊一個帳號" : "登入您的帳號"}
                </Link>
            </p>
            <p className="mt-2 text-sm text-gray-600">
                註冊/登入即代表您同意{' '}
                <Link href={"https://policy.hsuan.app"}
                      className="font-medium text-indigo-600 hover:text-indigo-500">
                    隱私權政策 / 服務條款
                </Link>
            </p>
        </>
    )
}