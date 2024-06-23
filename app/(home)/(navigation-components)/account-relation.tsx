"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CircuitBoard,
    Menu,
    PersonStanding,
    PlusCircle,
    Settings,
    Table,
    User,
    Video,
} from "lucide-react"
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";

import {Button} from "@/components/ui/button"
import Link from "next/link";
import {useEffect, useState} from "react";
import {api} from "@/app/utils";
import {Divider} from "antd";


export default function AccountRelation() {
    const [user, loading, error] = useAuthState(auth)
    const [dbUser, setDbUser] = useState<any>(null)
    useEffect(() => {
        if (user) {
            api("GET", "/user?with=organizations").then(setDbUser).catch(console.error)
        }
    }, [user])

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
                                <Link href={'/member'}>
                                    <Button>
                                        <Settings className="mr-2 h-4 w-4"/> 設定
                                    </Button>
                                </Link>
                                <Link href={"/manage/course/my"}>
                                    <Button>
                                        <CircuitBoard className="mr-2 h-4 w-4"/> 我的課程
                                    </Button>
                                </Link>
                                <Link href={'/history'}>
                                    <Button>
                                        <Video className="mr-2 h-4 w-4"/> 觀看紀錄
                                    </Button>
                                </Link>


                                {dbUser && dbUser.organizations && dbUser.organizations.length > 0 ? (
                                    <>
                                        <Divider/>
                                        <Link href={'/manage/course/own'}>
                                            <Button>
                                                <CircuitBoard className="mr-2 h-4 w-4"/> 我的開課
                                            </Button>
                                        </Link>
                                        <Link href={'/manage/course/new'}>
                                            <Button>
                                                <PlusCircle className="mr-2 h-4 w-4"/> 新開課程
                                            </Button>
                                        </Link>
                                        <Link href={'/member/organization'}>
                                            <Button>
                                                <Table className="mr-2 h-4 w-4"/> 組織設定
                                            </Button>
                                        </Link>
                                        <Link href={'/manage/course/business'}>
                                            <Button>
                                                <PersonStanding className="mr-2 h-4 w-4"/> 組織教師
                                            </Button>
                                        </Link>

                                    </>
                                ) : null}
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
