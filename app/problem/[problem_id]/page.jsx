"use client"
import useSWR from "swr";
import Link from "next/link";
import {PROBLEM_TYPE} from "@/app/utils/Problem";
import {usePathname, useRouter} from "next/navigation";
import {fetcher} from "@/app/fetcher";
import Swal from "sweetalert2";
import {useRef, useState} from "react";
import {parse} from 'node-html-parser';

import {api} from "@/app/utils";
import {PencilIcon, ServerStackIcon, TrashIcon} from "@heroicons/react/24/outline";
import {EyeIcon} from "@heroicons/react/20/solid";
import Instance from "@/app/utils/Instance";
import PdfViewer from "@/app/problem/[problem_id]/PDFViewer";

export default function Problem({params: {problem_id, contest_id = null}}) {
    const [status, setStatus] = useState({})
    const [btnBg, setBtnBg] = useState({})
    const pathname = usePathname();
    const router = useRouter()
    const {
        data: problem,
        isLoading
    } = useSWR(`/problem/${problem_id}`, async (url) => await api("GET", url, null).then(d => d))

    const {
        data: instances,
        mutate
    } = useSWR(`/instance`, async (url) => await api("GET", url, null, {
        revalidate: 1000
    }).then(d => d))

    const deploy = (template) => {
        setStatus(s => ({
            ...s,
            [template]: "部署中..."
        }))
        api("POST", `/instance/${template}/deploy`, {}).then(() => {
            mutate().then(d => {
                setStatus(s => ({
                    ...s,
                    [template]: "部署成功"
                }))
                setBtnBg(s => ({
                    ...s,
                    [template]: "bg-green-500 hover:bg-green-400"
                }))
            })
        })
    }

    const iframeRef = useRef(null);

    function resizeIframe() {
        iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.offsetHeight + 'px';
    }

    const ins = parse(`<div>${problem?.description}</div>`.replace(/\n/g, '<br/>'))
    ins.querySelectorAll("img").forEach(function (img) {
        img.classList.add("max-w-full")
    })

    const submit = () => {
        if (problem.type === 0) router.push(`/problem/${problem_id}/${pathname.includes('/contest') ? '/contest/' + contest_id + '/' : ''}submit`)
        else {
            /** @type {NodeListOf<HTMLInputElement>} */
            const answer = document.getElementsByName("answer")
            const answer_list = []
            answer.forEach((_, i) => {
                if (_.type === 'text') answer_list.push(_.value)
                else if (_.checked) answer_list.push(Number(_.dataset.id))
            })
            fetcher(`/problem/${problem_id}/submit`, {
                method: "POST",
                bearer: localStorage.getItem("token"),
                body: {
                    options: answer_list,
                    contest_id
                }
            }, router).then(r => {
                if (typeof r?.id === 'undefined') Swal.fire({
                    title: "提交失敗",
                    icon: "error",
                    html: JSON.stringify(r)
                })
                else
                    Swal.fire({
                        title: "提交成功",
                        icon: "success",
                    }).then(() => {
                        router.push(`/submission/${r.id}`)
                    })
            }).catch(e => {
                Swal.fire({
                    title: "提交失敗",
                    icon: "error",
                    html: e.message
                })
            })
        }
    }
    return (
        <>
            <div className="bg-white px-6 py-16 lg:px-8">
                <div className="mx-auto text-base leading-7 text-gray-700">
                    <p className="text-base font-semibold leading-7 text-indigo-600">{PROBLEM_TYPE[problem?.type]}</p>
                    <div className={"flex justify-between items-center"}>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {problem?.title}
                        </h1>
                        <Link
                            href={`/submission?problem_id=${problem_id}${pathname.includes('/contest') ? '&contest_id=' + contest_id : ''}`}
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            狀態
                        </Link>
                    </div>
                    <p className="mt-6 text-xl leading-8">
                        <iframe sandbox={"allow-same-origin allow-top-navigation-by-user-activation"}
                                srcDoc={ins.innerHTML}
                                className={"h-full w-full"}
                                ref={iframeRef}
                                onLoad={resizeIframe}
                        />
                    </p>
                    {
                        problem?.pdf && (
                            <div className={"w-full"}>
                                <PdfViewer url={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + problem?.pdf}/>
                            </div>
                        )
                    }

                    <div className="mt-10">
                        {problem?.options?.map((option, index) => (
                            <div className="relative flex items-start" key={index}>
                                <div className="flex h-6 items-center">
                                    <input
                                        id={`answer_${option.id}`}
                                        name={"answer"}
                                        type="checkbox"
                                        data-id={option.id}
                                        className="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                    <label htmlFor={`answer_${option.id}`} className="font-medium text-gray-900">
                                        ({index + 1}) {option.content}
                                    </label>
                                </div>
                            </div>
                        ))}
                        {problem?.type === 1 && (
                            <>
                                <label htmlFor="answer"
                                       className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                                    答案
                                </label>
                                <input
                                    id={'answer'}
                                    name={"answer"}
                                    placeholder={problem?.placeholder ?? "請輸入答案"}
                                    type="text"
                                    className="w-full rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                                />
                            </>
                        )}
                    </div>

                    <div className={"flex justify-end mt-1"}>
                        <button
                            onClick={submit}
                            className="w-full rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            提交
                        </button>
                    </div>
                </div>
            </div>
            {problem?.templates && Array.isArray(problem?.templates) && problem?.templates?.length > 0 && (
                <>
                    <div className={"mx-2 mt-4 text-xl text-white p-2 bg-purple-500 flex justify-center rounded-t-lg"}>
                        <div>靶機列表</div>
                    </div>
                    <div className={"mx-2 p-4 bg-purple-300 rounded-b-lg grid sm:grid-cols-2 lg:grid-cols-3 gap-2"}>
                        {
                            problem?.templates?.map((template, index) => (
                                <div className={"p-2 h-fit bg-purple-50 rounded-xl border border-white shadow"}>
                                    <div className={"flex justify-center"}>靶機模板 #{index + 1} {template?.name} </div>
                                    <div>{template?.description}</div>
                                    <div>建議CPU: {template?.recommend_cpu} core</div>
                                    <div>建議RAM: {template?.recommend_ram} GB</div>
                                    <div>建議硬盤: {template?.recommend_disk} GB</div>

                                    {(template?.username || template?.password) && (
                                        <div>{template?.username} : {template?.password}</div>
                                    )}
                                    <div className={"flex sm:flex-col mt-4"}>
                                        <button onClick={() => deploy(template.id)}
                                                className={`w-full inline-flex items-center justify-center gap-1 ${btnBg?.[template.id] ?? 'bg-purple-600 hover:bg-purple-800'} text-white p-2 rounded-l-md sm:rounded-b-none sm:rounded-t-md`}>
                                            <ServerStackIcon
                                                className={"h-5 w-5"}/> {status?.[template?.id] ?? "建議規格部署"}
                                        </button>
                                        {/*<button*/}
                                        {/*    className={"w-full inline-flex items-center justify-center gap-1 bg-sky-600 text-white p-2 rounded-r-md sm:rounded-t-none sm:rounded-b-md hover:bg-sky-800"}>*/}
                                        {/*    <PencilIcon className={"h-5 w-5"}/> 自訂規格部署*/}
                                        {/*</button>*/}
                                    </div>

                                    <div className={"flex flex-col mt-4 gap-2"}>
                                        {
                                            Array.isArray(instances?.[template?.id]) && instances?.[template?.id]?.map((instance, index) => (
                                                <Instance instance={instance} key={index}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </>
    )
}


export async function generateStaticParams() {
    const problems = await api('GET', '/problem', null).then(d => d)
    return problems.map(problem => ({
        problem_id: problem.id,
    }))
}
