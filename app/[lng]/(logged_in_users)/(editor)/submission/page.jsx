import {PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon} from "@heroicons/react/24/outline";
import SubmissionList from "@/app/[lng]/(logged_in_users)/(editor)/submission//SubmissionList";
import SideBar from "@/app/[lng]/SideBar";

export default function Course() {
    return (
        <div className="flex min-h-full flex-col">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex">
                    <SideBar/>

                    <div
                        className="bg-gray-50 py-6 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 border border-gray-300  mx-6 flex flex-col gap-8">
                        {/*<div className={"flex gap-4"}>*/}
                        {/*    <div className={"flex flex-col w-1/2"}>*/}
                        {/*        <div className={"border-b border-dotted border-gray-300 font-bold"}>最近公告</div>*/}
                        {/*        <div className={"text-gray-500 text-sm"}>沒有最近事件</div>*/}
                        {/*    </div>*/}
                        {/*    <div className={"flex flex-col w-1/2"}>*/}
                        {/*        <div className={"border-b border-dotted border-gray-300 font-bold"}>最近事件</div>*/}
                        {/*        <div className={"text-gray-500 text-sm"}>沒有最近事件</div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className={"flex flex-col gap-4"}>
                            <div className={"border-b border-dotted border-gray-300 text-xl"}>狀態列表</div>
                            <div className={"grid grid-cols-2 gap-4"}>

                            </div>

                            <SubmissionList/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
