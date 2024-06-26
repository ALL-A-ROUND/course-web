"use client"
import {ChevronRightIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import $ from 'jquery'
export default function () {
    const router = useRouter()
    const {
        data: problems,
        isLoading
    } = useSWR(`/problem`, async (url) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage?.getItem("token"),
                "Content-Type": "application/json",
            }
        })
        return res.json()
    })
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}
                {problems?.length > 0 && problems?.map((prob) => (
                    <li key={prob.id}>
                        <Link href={`/problem/${prob.id}`} className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="flex min-w-0 flex-1 items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="truncate text-lg font-medium text-indigo-600">(#{prob.id}) {prob.title}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">{$(`<div>${prob.description}</div>`).text().slice(0,100)}</span>
                                            </p>
                                        </div>
                                        {/* <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    Applied on <time
                                                    dateTime={application.date}>{application.dateFull}</time>
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    <CheckCircleIcon
                                                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                                        aria-hidden="true"/>
                                                    {application.stage}
                                                </p>
                                            </div>
                                        </div>*/}
                                    </div>
                                </div>
                                <div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
