"use client"
import {InformationCircleIcon} from '@heroicons/react/20/solid'
import useSWR from "swr";
import {api, moment, sha256} from "@/app/utils";
import {useRef, useState} from "react";
import $ from "jquery";


export default function ({params: {course_id, info_id}}) {
    const [password, setPassword] = useState("")
    const {
        data: info,
        isLoading
    } = useSWR(`/course/${course_id}/info/${info_id}?${password ? "password=" + password : ""}`, url => api('GET', url).then(data => data))

    const passwordRef = useRef(null);
    const iframeRef = useRef(null);

    function resizeIframe() {
        iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.offsetHeight + 'px';
    }

    const ins = $(`<div>${info?.description}</div>`)
    ins.find("img").each(function () {
        $(this).css("max-width", "100%")
    })

    const sendPassword = async () => {
        const pwd = await sha256(passwordRef.current.value)
        setPassword(pwd)
    }

    return (
        <div className="bg-white px-6 lg:px-8">
            {isLoading && ("loading...")}
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                {/*<p className="text-base font-semibold leading-7 text-indigo-600">Introducing</p>*/}
                <div className={"flex justify-between items-center"}>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {info?.title}
                    </h1>
                </div>
                <h3 className="text-md font-bold tracking-tight text-gray-500">
                    (ID: {info?.id})
                </h3>
                <h3 className="text-md font-bold tracking-tight text-gray-500">
                    發布時間：{moment(info?.created_at).fromNow()}
                </h3>
                {
                    info?.description && (
                        <p className="mt-6 text-xl leading-8 border rounded-lg shadow">
                            <iframe sandbox={"allow-same-origin"} srcDoc={ins.html()}
                                    className={"h-full w-full"}
                                    ref={iframeRef}
                                    onLoad={resizeIframe}
                            />
                        </p>
                    )
                }
                <div className="mt-6 text-xl leading-8 border rounded-lg shadow">
                    {(info?.hasPassword && typeof info?.content === "undefined") && (
                        <div
                            className="relative block w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <InformationCircleIcon className="mx-auto h-12 w-12 text-gray-400"/>
                            <span
                                className="mt-2 block text-sm font-semibold text-gray-900">你必須輸入密碼才可以取得資料</span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                ref={passwordRef}
                                className="mt-4 block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-t-indigo-500 focus:border-x-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <button type={"button"} onClick={sendPassword}
                                    className="w-full flex items-center justify-center rounded-b-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600">送出
                            </button>
                        </div>
                    )}
                    <div className={"flex flex-col"}>
                        {Object.keys(info?.content ?? {}).map(_info => (
                            <div className={"flex w-full"} key={_info?.id}>
                                <div className={"border-x w-1/3 p-2 font-bold"}>{_info}</div>
                                <div className={"border-x w-full p-2"}>{info?.content?.[_info]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
