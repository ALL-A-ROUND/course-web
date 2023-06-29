"use client"
import {ChatBubbleLeftIcon, CheckCircleIcon} from '@heroicons/react/24/outline'
import {api} from "@/app/utils";
import useSWR from 'swr'

const getDiscussions = (endpoint) => api('GET', endpoint)


export default function Example({params: {course_id}}) {
    const {data: threads, error} = useSWR(`/courses/${course_id}/threads`, getDiscussions)

    if (error) return <div>Failed to load</div>
    if (!(typeof threads === "object" && Array.isArray(threads))) return <div>Loading...</div>

    return (
        <div>
            <div className={"w-full justify-end flex"}>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >新增討論區
                </button>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {(typeof threads === "object" && Array.isArray(threads)) && threads.map((thread) => (
                    <li
                        key={thread.id}
                        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
                    >
                        <div>
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href={`/course/${course_id}/discuss/${thread.id}`} className="hover:underline">
                                    {thread.name}
                                </a>
                            </p>
                            {/*<div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">*/}
                            {/*    <p>*/}
                            {/*        <a href={discussion.author.href} className="hover:underline">*/}
                            {/*            {discussion.author.name}*/}
                            {/*        </a>*/}
                            {/*    </p>*/}
                            {/*    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">*/}
                            {/*        <circle cx={1} cy={1} r={1}/>*/}
                            {/*    </svg>*/}
                            {/*    <p>*/}
                            {/*        <time dateTime={discussion.dateTime}>{discussion.date}</time>*/}
                            {/*    </p>*/}
                            {/*</div>*/}
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
                                    {thread.status === 'resolved' ? (
                                        <CheckCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                                    ) : (
                                        <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                                    )}
                                </dt>
                                <dd className="text-sm leading-6 text-gray-900">{thread.posts_count}</dd>
                            </div>
                        </dl>
                    </li>
                ))}
            </ul>
        </div>
    )
}
