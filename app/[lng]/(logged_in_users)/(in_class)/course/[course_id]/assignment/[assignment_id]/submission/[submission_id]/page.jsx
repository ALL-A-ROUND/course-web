"use client"
import useSWR from "swr";
import Link from "next/link";
import {api, humanFileSize, moment} from "@/app/[lng]/utils";
import {HomeIcon, ClipboardIcon} from "@heroicons/react/24/solid";
import {FileIcon} from "@react-pdf-viewer/default-layout";
import {DocumentIcon} from "@heroicons/react/24/outline";

import {Noto_Sans_TC} from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const notoSansTC = Noto_Sans_TC({
    subsets: ['latin'],
})

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

            <ul role="list" className={"divide-y divide-gray-200 " + notoSansTC.className}>
                <div className={"flex flex-col gap-2"}>
                    {isLoading && <div className={"animate-pulse h-10 bg-gray-200 w-full"}></div>}
                    <div className={"text-3xl text-purple-700 font-bold"}>{assignment?.title}</div>
                    <div className={"w-full border-gray-600 border-b"}/>
                    <div className={"flex gap-2 text-sm"}>
                        <span>姓名: <span className={"font-light"}>{assignment?.user?.name}</span></span>
                        {assignment?.updated_at && (
                            <span>最後修改: <span
                                className={"font-light"}>{moment(assignment?.updated_at).format('yyyy-MM-DD HH:mm:ss')}</span></span>
                        )}
                    </div>

                    <div className={"h-full my-8 flex flex-col pl-4"}>
                        <div>
                            {assignment?.content}
                        </div>
                        {Array.isArray(assignment?.attachments) && assignment?.attachments?.length > 0 && (
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
                        )}

                        {assignment?.score !== null && (
                            <div className={`border p-2 mx-16 my-4`}>
                                <div className={"text-center border-b border-dotted mx-4 my-2 pb-2"}>
                                    批改結果
                                </div>
                                <div className={"flex flex-col gap-3"}>
                                    <div className={"flex flex-col"}>
                                        <span className={"font-bold"}>批改者</span>
                                        <span className={"font-light"}>{assignment?.score_by_user?.name}</span>
                                    </div>
                                    <div className={"flex flex-col"}>
                                        <span className={"font-bold"}>分數</span>
                                        <span className={"font-light"}>{assignment?.score}</span>
                                    </div>
                                    <div className={"flex flex-col"}>
                                        <span className={"font-bold"}>評語</span>
                                        <span className={"font-light"}>{assignment?.score_content}</span>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ul>
        </div>
    )
}
