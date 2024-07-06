"use client"
import {ChatBubbleLeftIcon, CheckCircleIcon} from '@heroicons/react/24/outline'
import {api, moment} from "@/app/[lng]/utils";
import useSWR from 'swr'
import Link from "next/link";
import {useSearchParams} from "next/navigation";

const getDiscussions = (endpoint) => api('GET', endpoint)


export default function DiscussPage({params: {course_id, lesson_id = null}}) {
    const sp = useSearchParams()
    const buildQuery = () => sp.has('tags') || lesson_id ? 'tags=' + (
        sp.has('tags') ? sp.get('tags') : ''
    ) + (lesson_id ? sp.has('tags') ? ',': '' + lesson_id : '') : ''

    const {
        data: threads,
        error,
        isLoading: loading
    } = useSWR(`/courses/${course_id}/threads?${buildQuery()}`, getDiscussions)

    if (error) return <div>Failed to load</div>
    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className={"w-full justify-end flex"}>
                <Link
                    href={"/course/" + course_id + "/discuss/add"}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >新增討論區
                </Link>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {sp.has('tags') && <>
                    <div className={"text-gray-400 text-2xl font-bold"}>搜尋結果</div>
                    <div className={"text-gray-400 text-sm"}>搜尋標籤：{sp.get('tags').split(",").join('、')}</div>
                </>}
                {(typeof threads === "object" && Array.isArray(threads)) && (threads.length > 0 ? threads.map((thread) => (
                    <Link href={`/course/${course_id}/discuss/${thread.id}`}
                          key={thread.id}
                          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-2 py-5 sm:flex-nowrap hover:bg-gray-200 rounded cursor-pointer my-2"
                    >
                        <div>
                            <p className="text-sm font-semibold leading-6 text-gray-900">{thread.name}</p>
                            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                <p>
                                    {thread.user.name}
                                </p>
                                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                    <circle cx={1} cy={1} r={1}/>
                                </svg>
                                <p>
                                    <time
                                        dateTime={thread?.posts?.[thread.posts_count - 1]?.created_at}>{moment(thread?.posts[thread.posts_count - 1]?.created_at).fromNow()}</time>
                                </p>
                            </div>
                        </div>
                        <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                            {/*<div className="flex -space-x-0.5">*/}
                            {/*    <dt className="sr-only">Commenters</dt>*/}
                            {/*    {discussion.commenters.map((commenter) => (*/}
                            {/*        <dd key={commenter.id}>*/}
                            {/*            <img*/}
                            {/*                className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"*/}
                            {/*                src={commenter.imageUrl}*/}
                            {/*                alt={commenter.name}*/}
                            {/*            />*/}
                            {/*        </dd>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            <div className="flex w-16 gap-x-2.5">
                                <dt>
                                    <span className="sr-only">Total comments</span>
                                    <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                                </dt>
                                <dd className="text-sm leading-6 text-gray-900">{thread.posts_count}</dd>
                            </div>
                        </dl>
                    </Link>
                )): <>
                    <div className={"pt-2 text-center text-gray-400 text-2xl font-bold"}>沒有討論區</div>
                </>)}
            </ul>
        </div>
    )
}
