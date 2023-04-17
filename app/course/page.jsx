import {PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon} from "@heroicons/react/24/outline";
import AttendedCourseList from "@/app/course/AttendedCourseList";

export default function Course() {
    return (
        <div className="flex min-h-full flex-col">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex">
                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6 bg-white border border-gray-300 flex flex-col gap-2">
                        <div className={"bg-indigo-300 text-center py-1"}>我的首頁</div>

                        <img
                            className="inline-block h-14 w-14 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />

                        <div className={"border border-gray-300 w-full my-4"}/>

                        <div
                            className={"px-3 py-1 hover:bg-gray-200 cursor-pointer inline-flex items-center gap-1"}>
                            <PencilSquareIcon className={"h-4 w-4"}/> 題目列表
                        </div>
                        <div
                            className={"px-3 py-1 hover:bg-gray-200 cursor-pointer inline-flex items-center gap-1"}>
                            <ClipboardIcon className={"h-4 w-4"}/> 公開競賽
                        </div>
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
                            <div className={"border-b border-dotted border-gray-300 text-xl"}>我的課程</div>
                            <div className={"grid grid-cols-2 gap-4"}>
                                <AttendedCourseList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
