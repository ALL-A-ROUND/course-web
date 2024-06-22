"use client"
import {ChevronRightIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import $ from 'jquery'
import {api, moment} from "@/app/utils";
export default function () {
    const router = useRouter()
    const {
        data: contests,
        isLoading
    } = useSWR(`/contest`, async (url) => api("GET", url, null).then(d => d))
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}
                {Array.isArray(contests) && contests?.length > 0 && contests?.map((ct) => (
                    <li key={ct.id}>
                        <Link href={`/contest/${ct.id}`} className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="flex min-w-0 flex-1 items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="truncate text-lg font-medium text-indigo-600">(#{ct.id}) {ct.name}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">({moment(ct?.start_time).fromNow()}~{moment(ct?.end_time).fromNow()})</span>
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">{$(`<div>${ct.description}</div>`).text().slice(0,100)}</span>
                                            </p>
                                        </div>
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
