"use client"
import {CheckCircleIcon, ChevronRightIcon, EnvelopeIcon, InformationCircleIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import {api, moment} from "@/app/[lng]/utils";
import {MegaphoneIcon} from "@heroicons/react/24/outline";

export default function Info({params: {course_id}}) {
    const router = useRouter()
    const {
        data: info,
        isLoading
    } = useSWR(`/course/${course_id}/info`, (url) => api('GET', url).then(data => data))
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            {Array.isArray(info) && info.length === 0 && (
                <div
                    className="relative block w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <InformationCircleIcon className="mx-auto h-12 w-12 text-gray-400"/>
                    <span className="mt-2 block text-sm font-semibold text-gray-900">這裡沒有任何資料可以查詢</span>
                </div>
            )}

            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}
                {Array.isArray(info) && info.length > 0 && info?.map((_info) => (
                    <li key={_info.id}>
                        <Link href={`/course/${course_id}/info/${_info.id}`} className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="flex min-w-0 flex-1 items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="truncate text-lg font-medium text-indigo-600">{_info.title}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">{_info.description}</span>
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">【{moment(_info?.created_at).fromNow()}建立】</span>
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
