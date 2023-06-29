"use client"
import {api} from "@/app/utils";
import {useRef} from "react";
import {moment} from "@/app/utils";
import $ from "jquery";

function Children({post, level, idx}) {
    const iframeRef = useRef(null);

    function resizeIframe() {
        iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.offsetHeight + 'px';
    }

    const ins = $(`<div>${post.content}</div>`)
    ins.find("img").each(function () {
        $(this).css("max-width", "100%")
    })

    return (
        <div key={post.id} className={"bg-white border my-4 shadow overflow-hidden sm:rounded-lg mx-2 sm:mx-4"}>
            <div className="px-4 py-5 sm:px-6">
                <div className={"flex justify-between"}>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {post?.user?.name} {post.reply_to ? "回覆" : "寫到"}
                    </h3>
                    <div className={'flex flex-col items-end'}>
                        {post?.reply_to === null &&
                            <span className={"text-md text-gray-500 font-bold"}># {idx + 1} 樓</span>}
                        <span
                            className={"text-sm text-gray-500"}>{moment(post.created_at).fromNow()}</span>
                    </div>
                </div>
                <iframe sandbox={"allow-same-origin"} srcDoc={ins.html()}
                        className={"h-full w-full"}
                        ref={iframeRef}
                        onLoad={resizeIframe}
                />
            </div>
            {(typeof post.children === "object" && Array.isArray(post.children)) && post.children?.map((post, i) =>
                <Children post={post}
                          level={level + 1} key={post.id} idx={i}/>)}
        </div>
    )
}

export default async function ThreadPost(param) {
    const thread_id = param?.params?.thread_id
    const posts = await api('GET', `/threads/${thread_id}/posts`)
    return (
        <div className={"my-8"}>
            {(typeof posts === "object" && Array.isArray(posts)) && posts?.map((post, i) => (
                <Children post={post}
                          level={0}
                          key={post.id}
                          idx={i}/>
            ))}
        </div>
    )
}
