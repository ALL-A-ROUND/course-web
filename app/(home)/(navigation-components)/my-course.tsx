"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MyCourse() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-year-100 text-black">
                我的學習
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white h-[20rem] flex flex-col justify-center items-center shadow-md">
                {/* <DropdownMenuLabel></DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                購物車目前是空的，快去選購課程吧！
            </DropdownMenuContent>
        </DropdownMenu>
    )
}