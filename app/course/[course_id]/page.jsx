import Link from "next/link";
import {fetcher} from "@/app/fetcher";

export default async function Example({params}) {
    const course = await fetcher(`/course/${params.course_id}`);

    return (
        <>
            <div className={"flex gap-2"}>
                <Link className={"text-blue-700"} href={"/course"}>我的首頁</Link>
                / {course.name}
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
