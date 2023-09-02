"use client"
import useSWR from "swr";
import {useRouter} from "next/navigation";
import {moment} from "@/app/utils";
import {useEffect, useState} from "react";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import {ArrowPathIcon, ArrowPathRoundedSquareIcon} from "@heroicons/react/24/outline";

export default function ({params: {submission_id}}) {
    const router = useRouter()
    const [interval, setInterval] = useState(800)
    const [editor, setEditor] = useState(null)
    let i = 0
    const {
        data: submission = {},
        isLoading
    } = useSWR(`/submission/${submission_id}`, async (url) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        })

        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem("token")
                router.replace("/auth/login")
            } else {
                router.replace("/submission")
            }
        }
        const data = await res.json()
        if (data.status === "Done" && typeof editor !== "undefined" && editor !== null) {
            setInterval(null)
        }
        if (typeof editor !== "undefined" && editor !== null) {
            if (editor.getValue() === "") {
                editor?.setValue(data.code)
            }
        }
        return data
    }, {
        refreshInterval: interval
    })

    const resultClass = {
        "AC": ["Accepted", "text-green-600"],
        "WA": ["Wrong Answer", "text-red-600"],
        "RE": ["Runtime Error", "text-orange-600"],
        "TLE": ["Time Limit Exceeded", "text-purple-600"],
        "MLE": ["Memory Limit Exceeded", "text-orange-600"],
        "CE": ["Compile Error", "text-orange-600"],
        "SE": ["System Error", "text-red-600"],
        "IE": ["Internal Error", "text-red-600"],
        "Pending": ["Pending", "text-gray-600"],
        "PWA": ["Problem-Specific Wrong Answer", "text-sky-600"],
    }

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {submission && (
                <div>
                    <div className="">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <div className={"flex justify-between"}>
                                    <h1 className="text-2xl font-semibold leading-6 text-gray-900">{submission.status} #{submission_id} {submission?.result ? " - " + submission?.result : ""}</h1>
                                    <Link
                                        href={`/problem/${submission.problem_id}`}
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        打開題目
                                    </Link>
                                </div>
                                <p className="mt-2 text-sm text-gray-700">
                                    子任務狀態列表
                                </p>
                                <div className="mt-2 text-xs text-gray-700 flex flex-col gap-1">
                                    <span>{submission.status === "Judging" && moment(moment().tz("UTC").diff(moment(submission?.created_at))).format('mm:ss')}</span>
                                    <span>{moment(submission?.created_at).fromNow()}</span>
                                    <span>題目：
                                        <Link href={`/problem/${submission?.problem_id}`}
                                              className={"underline text-indigo-500"}>{submission?.problem_id} {submission?.problem?.title}</Link></span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div
                                        className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    #
                                                </th>
                                                <th scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    結果
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    說明
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    分數
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                            {submission?.scores?.map((result, i) => (
                                                <tr key={i}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {i + 1}
                                                    </td>
                                                    <td className={`flex flex-row items-center gap-2 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium ${resultClass[result[0]][1]} sm:pl-6`}>
                                                        {resultClass[result[0]][0]}
                                                        {resultClass[result[0]][0] === "Pending" && (
                                                            <div className={"animate-spin"}>
                                                                <ArrowPathIcon className={"h-5 w-5"}/>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {submission?.problem?.subtasks[i].description}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {result[1]}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {submission?.code !== "" && (
                        <div>
                            <Editor
                                className={"mt-4"}
                                height="60vh"
                                defaultLanguage="cpp"
                                defaultValue=""
                                onMount={(editor, monaco) => {
                                    setEditor(editor)
                                }}
                            />
                        </div>
                    )}
                    <pre className={"mt-4"}>
                    {/*{JSON.stringify(submission, null, 2)}*/}
                    </pre>
                </div>
            )}
        </>
    )
}