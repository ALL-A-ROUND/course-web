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
import {ChevronsUpDown, Plus, X} from "lucide-react"

import {Button} from "@/components/ui/button"
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
            <div className="flex items-center justify-between space-x-4 px-4 py-3 w-full bg-white rounded-3xl">
                <h4 className="font-semibold">
                    最新消息
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4"/>
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
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


export function Unit() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2"
        >
            <div className="flex items-center justify-between space-x-4 px-4 py-3 w-full bg-lime-200 rounded-lg">
                <h4 className="font-semibold">
                    U1: 什麼是 WordPress？
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4"/>
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
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

                <div className={"bg-gray-50 pt-4"}>
                    <div className={"bg-white p-4"}>
                        <div className={"text-xl font-bold"}>課程內容</div>
                        <div className={""}>
                            哈囉，您好，歡迎來到平凡以上的 WordPress 新手免費課程。
                            平凡以上是由 Youtube 起家的，至今已經解決了超過百名網友的問題，過程中也搜集許多同學的疑問，發現同學很難在網路上學習到系統性的
                            WordPress 教學，除了之外，能在課程中學習到經驗、工作流程、理解的方式更難。因此，我推出一系列
                            WordPress 課程，希望可以節省同學尋找、學習的時間！

                            這是給全新手從 0 開始踏入 WordPress 世界的課程，課程將帶你一步步學習 WordPress
                            軟體，系統化地打好基礎，並且在課程結束後架設好一個有良好結構的官網與部落格，讓往後經營無煩惱。

                            學習 WordPress 的優點
                            什麼是 WordPress？
                            簡單來說，WordPress 是個開源的軟體，以簡單輕鬆的方式製作網站或部落格。複雜一點地說，它是一個基於
                            GPLv2 合約底下的開源免費內容管理系統，以 PHP 與 MySQL
                            為平台開發而成。也因著開源免費的關係，所有人都可以簡單的修改他的原始碼並客製化成自己的應用程式。

                            WordPress 最主要目的就是希望透過開源軟體的方式，幫助所有人都能夠不用會寫程式，也能架設自己的網站。

                            它到底有多受歡迎，你知道目前統計，全世界有 40% 以上的網站都是透過 WordPress
                            架設的，而且這個數字在不斷地持續攀升。

                            為什麼要學習 WordPress，超多優點一次報給你聽！
                            你已經知道 WordPress 的火紅的程度，或許你可以考慮要使用 WordPress 來架設網站。以下特色也是為何你該使用
                            WordPress 的原因。


                        </div>
                    </div>
                </div>


                <div className={"bg-gray-50 p-4"}>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-lg font-bold"}>單元一覽</div>
                        <div className={"text-md"}>6 章 40 單元｜總時長 301 分鐘</div>
                    </div>

                    <div className={"flex flex-col gap-4 mt-4"}>
                        <Unit/>
                        <Unit/>
                        <Unit/>
                        <Unit/>
                        <Unit/>
                        <Unit/>

                    </div>

                </div>


                <div className={"bg-gray-50"}>
                    <div className={"p-4 text-xl"}>關於講師</div>
                    <div className={"mt-4 bg-white p-4"}>
                        <div> {/* AVATAR */}
                            <img src={"https://images.hahow.in/images/6406c9c957e7939a9063aa44?width=128"}
                                 className={"h-24 w-24"}/>
                        </div>
                        <div className={"text-xl font-bold mt-4"}>
                            平凡老師 - 鄭弘煒
                        </div>
                        <div className={"flex gap-3 items-center"}>
                            <div>
                                <span className={"text-lime-500"}>7 </span>堂課程
                            </div>
                            <div className={"bg-gray-300 h-4 w-0.5 block"}></div>
                            <div>
                                <span className={"text-lime-500"}>7 </span>堂課程
                            </div>
                            <div className={"bg-gray-300 h-4 w-0.5 block"}></div>

                            <div>
                                <span className={"text-lime-500"}>2048 </span>位學生
                            </div>
                        </div>

                        <div className={"my-4"}>
                            Hello 你好，我是平凡以上的創辦人東霖。平凡以上致力於 WordPress
                            軟體的線上教學。希望透過線上學習的方式，協助所有想學習的使用者架設屬於自己的網站。

                        </div>
                    </div>
                </div>

                <div className={"bg-gray-50 p-4"}>
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                        <div className={"text-xl border-b pb-2"}>
                            購買單堂課
                        </div>
                        <div className={"mt-4"}>
                            <div className={"flex gap-4 items-center"}>
                                <div className={"flex flex-col gap-1"}>
                                    <div className={"text-lg font-bold"}>單堂課價格</div>
                                    <div className={"text-lg text-lime-500"}>NT$ 1,200</div>
                                </div>
                                <button className={"btn btn-primary"}>
                                    立即購買
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {/* BOTTOM BAR */}
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
