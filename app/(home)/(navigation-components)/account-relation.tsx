"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

export default function AccountRelation() {
    return (
        <div className="size-8">
            <DropdownMenu>
                <DropdownMenuTrigger className="">
                    <Menu className="size-8 p-1.5 cursor-pointer hover:bg-year-100 rounded-lg" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 h-[20rem] bg-white">
                    <DropdownMenuItem className="h-full flex flex-col justify-center">
                        現在購物車是空的，快去選購課程吧！
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}