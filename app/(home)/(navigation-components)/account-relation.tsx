"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {CircuitBoard, DoorClosed, Menu, PlusCircle, Settings, Table, User} from "lucide-react"
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import {Mail} from "lucide-react"

import {Button} from "@/components/ui/button"
import Link from "next/link";
import {signOut} from "@/lib/firebase/auth";
import BulletinBoard from "@/app/course/[course_id]/bulletin/BulletinBoard";


export default function AccountRelation() {
    const [user, loading, error] = useAuthState(auth)

    if (loading) return <div>.</div>
    return (
        <div className="size-8">
            <DropdownMenu>
                <DropdownMenuTrigger className="">
                    <Menu className="size-8 p-1.5 cursor-pointer hover:bg-year-100 rounded-lg"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 h-fit bg-white">
                    <DropdownMenuItem className="h-fit flex flex-col items-start">
                        {user ? (
                            <div className={"flex flex-col"}>
                                <Link href='/member'>
                                    <Button>
                                        <Settings className="mr-2 h-4 w-4"/> 設定
                                    </Button>
                                </Link>
                                <Link href='/manage/course/own'>
                                    <Button>
                                        <CircuitBoard className="mr-2 h-4 w-4"/> 我的開課
                                    </Button>
                                </Link>
                                <Link href='/manage/course/new'>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4"/> 新開課程
                                    </Button>
                                </Link>
                                <Link href='/manage/course/business'>
                                    <Button>
                                        <Table className="mr-2 h-4 w-4"/> 管理組織
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className={"flex flex-col"}>
                                <Link href='/auth'>
                                    <Button>
                                        <User className="mr-2 h-4 w-4"/> 登入帳號
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}
