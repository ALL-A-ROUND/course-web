"use client"
import useSWR from "swr";
import Link from "next/link";
import {api, moment} from "@/app/utils";
import {HomeIcon, PlusIcon, ClipboardIcon} from "@heroicons/react/24/solid";
import {useRef, useState} from "react";
import Swal from "sweetalert2";

export default function AssignmentPage({params: {course_id, assignment_id}}) {
    const {
        data: assignment,
        isLoading
    } = useSWR(`/assignment/${assignment_id}`, async (url) => await api("GET", url, null).then(d => d))
    const {
        data: own_submissions,
        isLoading2
    } = useSWR(`/assignment/${assignment_id}/own_submissions`, async (url) => await api("GET", url, null).then(d => d))
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
                {isLoading && <div>Loading...</div>}

                <div className={"flex flex-col gap-2"}>

                    <div className={"text-3xl text-purple-700 font-extrabold"}>{assignment?.title}</div>
                    <div className={"w-full border-gray-600 border-b"}/>

                    <div className={"h-full my-8 flex flex-col pl-4"}>
                        <div className={"flex gap-4"}>
                            <span className={"font-bold"}>開放繳交</span>
                            <span>{moment(assignment?.start_at).format('yyyy-MM-DD HH:mm')}</span>
                        </div>
                        <div className={"flex gap-4"}>
                            <span className={"font-bold"}>截止日期</span>
                            <span>{moment(assignment?.end_at).format('yyyy-MM-DD HH:mm')} ({moment(assignment?.end_at).fromNow()})</span>
                        </div>
                        <div className={"flex gap-4"}>
                            <span className={"font-bold"}>說明</span>
                            <span>{assignment?.content}</span>
                        </div>
                    </div>
                    <div className={"w-full flex justify-center"}>
                        {isLoading2 && <div>Loading...</div>}
                        {Array.isArray(own_submissions) && own_submissions?.length === 0 &&
                            <SubmitAssignment course_id={course_id} assignment_id={assignment_id}/>
                        }

                        {Array.isArray(own_submissions) && own_submissions?.map((submission, idx) => (
                            <Link href={`/course/${course_id}/assignment/${assignment_id}/submission/${submission.id}`}
                                  key={idx}>
                                <div className={'bg-blue-400 text-white p-2 rounded-xl shadow'}>
                                    查看作業
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </ul>
        </div>
    )
}

function SubmitAssignment({
                              course_id,
                              assignment_id
                          }) {
    const form = useRef(null)

    const submit = async (e) => {
        e.preventDefault()

        const formData = new FormData(form.current)
        await api("POST", `/assignment/${assignment_id}/submit`, formData)
        Swal.fire({
            title: '繳交成功',
        })
    }

    return (
        <form className={"flex flex-col w-full gap-1"} ref={form} onSubmit={submit}>
            <input name={"title"} className={"w-full p-2 rounded-xl shadow"} placeholder={"標題"}/>
            <textarea name={"content"} className={"w-full h-48 p-2 rounded-xl shadow"} placeholder={"內容"}/>

            <div className={"my-4"}>
                <input type={"file"} name={"files[]"}/>
            </div>

            <button className={'bg-blue-400 text-white p-2 rounded-xl shadow'} type={"submit"}>
                繳交作業
            </button>
        </form>
    )
}