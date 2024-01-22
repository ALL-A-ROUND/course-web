import Link from "next/link";
import {api} from "@/app/utils";
import {HomeIcon} from "@heroicons/react/24/solid";

export default async function CourseMain({params}) {
    const course = await api("GET", `/course/${params.course_id}`, null).then(d => d);

    return (
        <>
            <div className={`flex gap-2`}>
                <Link className={"text-blue-700 inline-flex items-center"} href={"/course"}><HomeIcon
                    className={"h-5 w-5"}/> 我的首頁</Link>
                / {course?.name}
            </div>

            <div className={"flex flex-col border rounded-xl p-2 gap-4"}>
                <span className={"text-yellow-700 text-2xl"}>{course?.name}</span>
                <div className={"text-md tracking-wider"} dangerouslySetInnerHTML={{
                    __html: course?.introduction?.replace(/\n/g, "<br/>") ?? ''
                }}></div>
            </div>

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
                <div className={"border-b border-dotted border-gray-300 text-xl"}>課程活動</div>
            </div>
        </>
    )
}
