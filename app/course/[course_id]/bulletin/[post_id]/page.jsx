"use client"
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import useSWR from "swr";
import {api, moment} from "@/app/utils";
import {InformationCircleIcon} from '@heroicons/react/20/solid'
import {useEffect, useRef} from "react";
import $ from "jquery";
import Link from "next/link";


export default function ({params: {course_id, post_id}}) {
    const {
        data: post,
        isLoading
    } = useSWR(`/courses/${course_id}/bulletins/${post_id}`, url => api('GET', url).then(data => data))

    const iframeRef = useRef(null);

    function resizeIframe() {
        iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.offsetHeight + 'px';
    }

    const ins = $(`<div>${post?.content}</div>`)
    ins.find("img").each(function () {
        $(this).css("max-width", "100%")
    })

    return (
        <div className="bg-white px-6 lg:px-8">
            {isLoading && ("loading...")}
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                {/*<p className="text-base font-semibold leading-7 text-indigo-600">Introducing</p>*/}
                <div className={"flex justify-between items-center"}>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {post?.title}
                    </h1>
                    <Link href={`/course/${course_id}/bulletin/${post_id}/edit`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        編輯
                    </Link>
                </div>
                <h3 className="text-md font-bold tracking-tight text-gray-500">
                    (ID: {post?.id}) By：{post?.user?.name}
                </h3>
                <h3 className="text-md font-bold tracking-tight text-gray-500">
                    發布時間：{moment(post?.created_at).fromNow()} 更新時間：{moment(post?.updated_at).fromNow()}
                </h3>
                <p className="mt-6 text-xl leading-8 border rounded-lg shadow">
                    <iframe sandbox={"allow-same-origin"} srcDoc={ins.html()}
                            className={"h-full w-full"}
                            ref={iframeRef}
                            onLoad={resizeIframe}
                    />
                </p>
            </div>
        </div>
    )
}
