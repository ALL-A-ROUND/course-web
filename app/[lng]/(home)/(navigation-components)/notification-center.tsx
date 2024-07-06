"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Bell
} from "lucide-react"

export default function NotificationCenter() {
    return (
        <div className="size-8">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Bell className="size-8 p-1.5 cursor-pointer hover:bg-year-100 rounded-lg" />

                    {/* <ShoppingCart className="size-8 p-1.5 cursor-pointer hover:bg-year-100 rounded-lg" /> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 h-[20rem] bg-white">
                    <DropdownMenuLabel>購物車</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="h-full flex flex-col justify-center">
                        現在購物車是空的，快去選購課程吧！
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}