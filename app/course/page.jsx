import {PencilSquareIcon, PlusIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon} from "@heroicons/react/24/outline";
import AttendedCourseList from "@/app/course/CourseList";
import Image from "next/image";
import Link from "next/link";
import CourseList from "@/app/course/CourseList";

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
                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6 bg-indigo-600 border border-gray-300 flex flex-col gap-2 mx-6 rounded-lg">
                        <h2 className={"bg-indigo-400 text-white font-bold text-lg text-center py-1 flex justify-center rounded-xl items-center mb-2"}>我的首頁</h2>

                        <Link href={"/problem"}
                            className={classNames(
                                false
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}>
                            <PencilSquareIcon className={classNames(
                                false ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                'h-6 w-6 shrink-0'
                            )}/> 題目列表
                        </Link>
                        <Link href={"/problem"}
                            className={classNames(
                                false
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}>
                            <ClipboardIcon className={classNames(
                                false ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                'h-6 w-6 shrink-0'
                            )}/> 公開競賽
                        </Link>
                    </div>

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
