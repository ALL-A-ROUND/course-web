"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import CourseList from "./CourseList"
import { useEffect, useState } from "react";
import { api } from "@/app/utils";
import { PersonStanding, Star } from "lucide-react";

export default function Course() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        // api('GET', '/user').then(data => setUser(data))
    }, []);
    return (
        <div className="flex min-h-full flex-col">
            <Link
                href={'/manage/course/my'}
                className={"bg-indigo-400 mx-8 rounded-lg p-2 text-center text-white block"}>
                切換到新版介面
            </Link>


            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4 ">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex ">
                    {/*<SideBar/>*/}
                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 border border-gray-300 bg-white mx-6 flex flex-col gap-8">
                        {/*<div className={"flex gap-4"}>
                            <div className={"flex flex-col w-1/2"}>
                                <div className={"border-b border-dotted border-gray-300 font-bold"}>最近公告</div>
                                <div className={"text-gray-500 text-sm"}>沒有最近事件</div>
                            </div>
                            <div className={"flex flex-col w-1/2"}>
                                <div className={"border-b border-dotted border-gray-300 font-bold"}>最近事件</div>
                                <div className={"text-gray-500 text-sm"}>沒有最近事件</div>
                            </div>
                        </div>*/}
                        <div className={"flex flex-col gap-4"}>
                            <div className={"border-b border-dotted border-gray-300 text-xl inline-flex items-center"}>
                                <PersonStanding className={"h-6 w-6 inline-block"} />{' '}
                                參與的課程</div>
                            <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
                                <CourseList type="attended" />
                                <Link href={"/course/add"}>
                                    <div className={"flex gap-2 h-20 items-center"}>
                                        <div
                                            className={"w-full bg-gray-400 h-full flex flex-col justify-center items-center py-2"}>
                                            <div className={"text-white"}>新增課程</div>
                                            <PlusIcon className={"h-16 w-16 text-white"} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {user?.roles?.includes('teacher') &&
                            <div className={"flex flex-col gap-4"}>
                                <div className={"border-b border-dotted border-gray-300 text-xl"}>管理的課程</div>
                                <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
                                    <CourseList type="owned" />
                                    <Link href={"/course/add"}>
                                        <div className={"flex gap-2 h-20 items-center"}>
                                            <div
                                                className={"w-full bg-gray-400 h-full flex flex-col justify-center items-center py-2"}>
                                                <div className={"text-white"}>新增課程</div>
                                                <PlusIcon className={"h-16 w-16 text-white"} />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>}
                        <div className={"flex flex-col gap-4"}>
                            <div className={"border-b border-dotted border-gray-300 text-xl inline-flex items-center"}>
                                <Star className={"h-6 w-6 inline-block"} />{' '}
                                推薦的課程
                            </div>
                            <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
                                <CourseList type="recommend" />
                                <Link href={"/course/add"}>
                                    <div className={"flex gap-2 h-20 items-center"}>
                                        <div
                                            className={"w-full bg-gray-400 h-full flex flex-col justify-center items-center py-2"}>
                                            <div className={"text-white"}>新增課程</div>
                                            <PlusIcon className={"h-16 w-16 text-white"} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
