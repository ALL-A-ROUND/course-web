"use client"
import useSWR from "swr";
import Link from "next/link";
import {PROBLEM_TYPE} from "@/app/utils/Problem";
import {usePathname, useRouter} from "next/navigation";
import {fetcher} from "@/app/fetcher";
import Swal from "sweetalert2";
import {useRef} from "react";
import $ from "jquery";

export default function ({params: {problem_id, contest_id = null}}) {
    const pathname = usePathname();
    const router = useRouter()
    const {
        data: problem,
        isLoading
    } = useSWR(`/problem/${problem_id}`, async (url) => {
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
            }
        }
        return res.json()
    })


    const iframeRef = useRef(null);

    function resizeIframe() {
        iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.offsetHeight + 'px';
    }

    const ins = $(`<div>${problem?.description}</div>`.replace(/\n/g, '<br/>'))
    ins.find("img").each(function () {
        $(this).css("max-width", "100%")
    })

    const submit = () => {
        if (problem.type === 0) router.push(`/problem/${problem_id}/${pathname.includes('/contest') ? '/contest/' + contest_id + '/' : ''}submit`)
        else {
            /** @type {NodeListOf<HTMLInputElement>} */
            const answer = document.getElementsByName("answer")
            const answer_list = []
            answer.forEach((_, i) => {
                if (_.checked) answer_list.push(Number(_.dataset.id))
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
                        <iframe sandbox={"allow-same-origin"} srcDoc={ins.html()}
                                className={"h-full w-full"}
                                ref={iframeRef}
                                onLoad={resizeIframe}
                        />
                    </p>
                    <div className="mt-10 max-w-2xl">
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
                    </div>

                    <div className={"flex justify-end mt-16"}>
                        <button
                            onClick={submit}
                            className="rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            提交
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

