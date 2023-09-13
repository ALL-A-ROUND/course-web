import {PencilSquareIcon, PlusIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon} from "@heroicons/react/24/outline";
import AttendedCourseList from "@/app/course/CourseList";
import Image from "next/image";
import Link from "next/link";
import CourseList from "@/app/course/CourseList";
import SideBar from "@/app/SideBar";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Course() {
    return (
        <div className="flex min-h-full flex-col">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4 ">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex ">
                    <SideBar/>
                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 border border-gray-300 bg-white mx-6 flex flex-col gap-8">
                        <div className={"flex gap-4"}>
                            <div className={"flex flex-col w-1/2"}>
                                <div className={"border-b border-dotted border-gray-300 font-bold"}>最近公告</div>
                                <div className={"text-gray-500 text-sm"}>沒有最近事件</div>
                            </div>
                            <div className={"flex flex-col w-1/2"}>
                                <div className={"border-b border-dotted border-gray-300 font-bold"}>最近事件</div>
                                <div className={"text-gray-500 text-sm"}>沒有最近事件</div>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"border-b border-dotted border-gray-300 text-xl"}>參與的課程</div>
                            <div className={"grid grid-cols-2 gap-4"}>
                                <CourseList type="attended"/>
                                <Link href={"/course/add"}>
                                    <div className={"flex gap-2 h-20 items-center"}>
                                        <div className={"w-full bg-gray-400 h-full flex flex-col justify-center items-center py-2"}>
                                            <div className={"text-white"}>新增課程</div>
                                            <PlusIcon className={"h-16 w-16 text-white"}/>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"border-b border-dotted border-gray-300 text-xl"}>管理的課程</div>
                            <div className={"grid grid-cols-2 gap-4"}>
                                <CourseList type="owned"/>
                                <Link href={"/course/add"}>
                                    <div className={"flex gap-2 h-20 items-center"}>
                                        <div className={"w-full bg-gray-400 h-full flex flex-col justify-center items-center py-2"}>
                                            <div className={"text-white"}>新增課程</div>
                                            <PlusIcon className={"h-16 w-16 text-white"}/>
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
