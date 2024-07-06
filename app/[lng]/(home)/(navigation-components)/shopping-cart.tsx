"use client"

import { ShoppingCart } from "lucide-react"
import React, { useEffect, useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ShoppingCartComponent() {
    const [showCart, setShowCart] = useState<boolean>(false);

    const fetchCartData = async () => {

    }

    useEffect(() => {
        fetchCartData();
    }, [])

    return (
        <div className="size-8">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <ShoppingCart className="size-8 p-1.5 cursor-pointer hover:bg-year-100 rounded-lg" />
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