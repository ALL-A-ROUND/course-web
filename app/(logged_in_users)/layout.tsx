import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function PageLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <nav className="h-16 w-full bg-[#9F9C79] flex flex-row items-center px-4 space-x-5 justify-between">
                <div className="size-14 relative">
                    <Image src="/logo-ne.png" alt="logo"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="flex flex-row space-x-5">
                    <Link href="/home">
                        <div>首頁</div>
                    </Link>
                    <Link href="/abstract">
                        <div>更多設定</div>
                    </Link>
                </div>
            </nav>
            {children}
        </div>
    )
}