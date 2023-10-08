"use client"
import useSWR from "swr";
import Link from "next/link";
import {api, humanFileSize, moment} from "@/app/utils";
import {HomeIcon, ClipboardIcon} from "@heroicons/react/24/solid";
import {FileIcon} from "@react-pdf-viewer/default-layout";
import {DocumentIcon} from "@heroicons/react/24/outline";

export default function AssignmentViewPage({params: {course_id, assignment_id, submission_id}}) {
    const {
        data: assignment,
        isLoading
    } = useSWR(`/assignment/${assignment_id}/submission/${submission_id}`, async (url) => await api("GET", url, null).then(d => d))
    return (
        <div className="overflow-hidden bg-white sm:rounded-md">
            <div className={`flex gap-2 mb-4`}>
                <Link className={"text-blue-700 inline-flex items-center"} href={"/course"}><HomeIcon
                    className={"h-5 w-5"}/> 我的首頁</Link>
                / <Link className={"text-blue-700 inline-flex items-center"} href={`/course/${course_id}`}>
                課程首頁</Link>
                / <Link className={"text-blue-700 inline-flex items-center"} href={`/course/${course_id}/assignment`}>
                作業</Link>
                / {assignment?.title}
            </div>

            <ul role="list" className="divide-y divide-gray-200">
                <div className={"flex flex-col gap-2"}>
                    {isLoading && <div className={"animate-pulse h-10 bg-gray-200 w-full"}></div>}
                    <div className={"text-3xl text-purple-700 font-extrabold"}>{assignment?.title}</div>
                    <div className={"w-full border-gray-600 border-b"}/>
                    <div className={"flex gap-2 text-sm"}>
                        <span>姓名:<span className={"font-light"}>{assignment?.user?.name}</span></span>
                        {assignment?.updated_at && (
                            <span>最後修改:<span
                                className={"font-light"}>{moment(assignment?.updated_at).format('yyyy-MM-DD HH:mm:ss')}</span></span>
                        )}
                    </div>

                    <div className={"h-full my-8 flex flex-col pl-4"}>
                        <div>
                            {assignment?.content}
                        </div>
                        <div className={"flex flex-col gap-2 border-t mt-12"}>
                            <span className={"font-bold"}>附件</span>
                            {Array.isArray(assignment?.attachments) && assignment?.attachments?.map((attachment, i) => (
                                <Link key={i} href={
                                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/../attachment/${attachment?.id}?token=${localStorage.getItem('token')}`
                                } target={'_blank'} className={"flex items-center gap-1"}>
                                    <DocumentIcon className={"h-5 w-5"}/>
                                    <span>{attachment?.name} ({humanFileSize(attachment?.size)})</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}