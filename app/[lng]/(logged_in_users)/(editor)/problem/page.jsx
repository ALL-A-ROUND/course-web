"use client"
import ProblemList from "@/app/[lng]/(logged_in_users)/(editor)/problem/ProblemList";
import SideBar from "@/app/[lng]/SideBar";

export default function Problem() {
    return (
        <div className="flex min-h-full flex-col">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex">
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
                            <div className={"border-b border-dotted border-gray-300 text-xl"}>題目列表</div>
                            <div className={"grid grid-cols-2 gap-4"}>

                            </div>
                            <ProblemList/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
