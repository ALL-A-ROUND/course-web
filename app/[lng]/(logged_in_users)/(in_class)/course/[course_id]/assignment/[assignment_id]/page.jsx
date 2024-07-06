"use client"
import useSWR from "swr";
import Link from "next/link";
import {api, humanFileSize, moment} from "@/app/[lng]/utils";
import {HomeIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import {useRef, useState} from "react";
import Swal from "sweetalert2";
import useUser from "@/app/[lng]/useUser";
import {TrashIcon} from "@heroicons/react/24/outline";

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
                        {assignment?.start_at && (
                            <div className={"flex gap-4"}>
                                <span className={"font-bold"}>開放繳交</span>
                                <span>{moment(assignment?.start_at).format('yyyy-MM-DD HH:mm')}</span>
                            </div>
                        )}
                        {assignment?.end_at && (
                            <div className={"flex gap-4"}>
                                <span className={"font-bold"}>截止日期</span>
                                <span>{moment(assignment?.end_at).format('yyyy-MM-DD HH:mm')} ({moment(assignment?.end_at).fromNow()})</span>
                            </div>
                        )}
                        <div className={"flex gap-4"}>
                            <span className={"font-bold"}>說明</span>
                            <span>{assignment?.content}</span>
                        </div>
                    </div>
                    <div className={"w-full flex justify-center"}>
                        {isLoading2 && <div>Loading...</div>}
                        {Array.isArray(own_submissions) && own_submissions?.length === 0 &&
                            <SubmitAssignment course_id={course_id} assignment_id={assignment_id}
                                              assignment={assignment}/>
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
                              assignment_id,
                              assignment
                          }) {
    const form = useRef(null)
    const {user} = useUser()
    const [files, setFiles] = useState([])

    const addFile = () => {
        setFiles([...files, {
            id: Math.random(),
            name: "",
            size: 0
        }])
    }

    const onFileChange = (e, idx) => {
        const newFiles = [...files]
        newFiles.find((i) => i.id === idx).name = e.target.files[0].name
        newFiles.find((i) => i.id === idx).size = e.target.files[0].size
        setFiles(newFiles)
    }

    const defaultTitle = user && assignment && user?.name + " " + assignment?.title
    const submit = async (e) => {
        e.preventDefault()

        const formData = new FormData(form.current)
        // debug formData
        for(let pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }

        const res = await api("POST", `/assignment/${assignment_id}/submit`, formData).then(d => d)
        if (res)
            Swal.fire({
                icon: 'success',
                title: '繳交成功',
            }).then(() => {
                location.reload()
            })
    }

    return (
        <form className={"flex flex-col w-full gap-1"} ref={form} onSubmit={submit}>
            <input name={"title"} className={"w-full p-2 rounded-xl shadow"} placeholder={"標題"}
                   defaultValue={defaultTitle}/>
            <textarea name={"content"} className={"w-full h-48 p-2 rounded-xl shadow"} placeholder={"內容"}/>

            <div className={"flex flex-col my-4"}>
                <div className={"flex items-center my-2"}>附件 ({files.length})： <PlusCircleIcon
                    className={"cursor-pointer text-green-400 w-5 h-5"} onClick={addFile}/></div>

                <div className={"flex flex-col gap-2"}>
                    {files.map((i) => (
                        <div className={"w-full flex "} key={i.id}>
                            <label htmlFor={`attach_${i.id}`}
                                   className={`${i.name ? "bg-blue-400" : "bg-yellow-500"} text-white p-2 rounded-l-xl shadow cursor-pointer block w-full`}>
                                <input type={"file"} id={`attach_${i.id}`} name={`files[]`} className={"hidden"}
                                       onChange={(e) => {
                                           onFileChange(e, i.id)
                                       }}/>
                                {i.name ? (i.name + ` (${humanFileSize(i.size)})`) : "選擇檔案"}
                            </label>
                            <div className={"w-12 h-full bg-red-500 rounded-r-xl flex items-center justify-center"}>
                                <TrashIcon className={"w-5 h-5 text-white cursor-pointer"} onClick={e => {
                                    e.preventDefault()
                                    setFiles(files.filter(f => f.id !== i.id))
                                }}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className={'bg-blue-400 text-white p-2 rounded-xl shadow'} type={"submit"}>
                繳交作業
            </button>
        </form>
    )
}
