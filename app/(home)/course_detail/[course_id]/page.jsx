"use client"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ClockIcon, FacebookIcon} from "lucide-react";
import {ShoppingCartIcon} from "@heroicons/react/24/solid";


import * as React from "react"
import { ChevronsUpDown, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2"
        >
            <div className="flex items-center justify-between space-x-4 px-4 py-3 w-full bg-white rounded-xl">
                <h4 className="font-semibold">
                    最新消息
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/primitives
            </div>
            <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @stitches/react
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}


function BreadcrumbComponent() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1">
                            <BreadcrumbEllipsis className="h-4 w-4"/>
                            <span className="sr-only">Toggle menu</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Documentation</DropdownMenuItem>
                            <DropdownMenuItem>Themes</DropdownMenuItem>
                            <DropdownMenuItem>GitHub</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default function CourseDetail({params}) {
    return (
        <>
            <div style={{
                fontFamily: "PingFang TC, Microsoft JhengHei;"
            }}>
                <div className={`p-4 relative`}>
                    <div className={"flex justify-between"}>
                        <BreadcrumbComponent/>
                        <div>
                            <button className={"btn btn-primary rounded-full bg-gray-100 p-2"}>
                                <FacebookIcon className={"w-3 h-3"}/>
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            position: "relative",
                            paddingTop: "56.25%",
                        }}
                        className={"mt-4 rounded-xl"}
                    >
                        <iframe
                            src="https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/iframe?poster=https%3A%2F%2Fcustomer-f33zs165nr7gyfy4.cloudflarestream.com%2F6b9e68b07dfee8cc2d116e4c51d6a957%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                            style={{
                                border: "none",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "100%",
                                width: "100%",
                            }}
                            className={"rounded-xl"}
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                            allowFullScreen="true"
                        ></iframe>
                    </div>

                    <div className={"mt-4 flex gap-1 items-center font-extralight"}>
                        <div className={"h-6 w-6"}> {/* AVATAR */}
                            <img src={"https://images.hahow.in/images/6406c9c957e7939a9063aa44?width=48"}/>
                        </div>
                        <div>
                            平凡老師 - 鄭弘煒
                        </div>
                    </div>

                    <div className={"mt-3 font-bold text-lg"}>
                        WordPress 新手第一堂必修入門課
                    </div>

                    <div className={"mt-3 font-light text-gray-400"}>
                        這是給全新手從 0 開始踏入 WordPress 世界的課程。這個課程將透過影片的方式帶你一步步學習 WordPress
                        軟體，系統化地打好基礎，你將可以架設好一個有良好結構的官網與部落格，往後經營上完全沒煩惱。

                    </div>


                </div>

                <div className={"bg-gray-50 p-4"}>
                    <div className={"text-lg my-4"}>關於課程</div>

                    <div className={"grid grid-cols-2"}>
                        <div className={"flex gap-2 items-center"}>
                            <div>
                                <ClockIcon className={"h-6 w-6"}/>
                            </div>
                            <div className={"flex flex-col"}>
                                <div className={"text-gray-400"}>課程時數</div>
                                <div>1 小時 30 分鐘</div>
                            </div>
                        </div>
                    </div>
                </div>

                <CollapsibleDemo></CollapsibleDemo>
            </div>


            <div
                className={"fixed flex items-center gap-4 bottom-0 left-0 right-0 h-20 rounded-t-lg border-t shadow-xl border-gray-200 bg-white  px-4"}>
                <div className={"flex items-center gap-2"}> {/* PRICE */}
                    <div>免費</div>

                    <button className={"border-lime-200 border-2 text-white flex-grow rounded-lg p-2"}>
                        <ShoppingCartIcon className={"h-6 w-6 text-lime-400"}/>
                    </button>
                </div>

                <button className={"bg-lime-400 text-white flex-grow rounded-lg p-2"}>
                    免費加入
                </button>


            </div>

        </>
    )
}
