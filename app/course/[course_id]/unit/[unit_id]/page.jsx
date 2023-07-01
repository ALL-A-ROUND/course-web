"use client"
import {CheckCircleIcon, ChevronRightIcon, EnvelopeIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import {moment} from "@/app/utils";

export default function ({params: {course_id, unit_id}}) {
    const router = useRouter()
    const {
        data: contests,
        isLoading
    } = useSWR(`/course/${course_id}/units/${unit_id}/contests`, async (url) => {
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
    return (
        <>
            <div className={"text-xl font-bold"}>作業</div>
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {isLoading && <div>Loading...</div>}
                    {contests?.homework?.length && contests?.homework?.map((contest) => (
                        <li key={contest.id}>
                            <Link href={`/contest/${contest.id}`} className="block hover:bg-gray-50">
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="min-w-0 flex justify-between items-center w-full px-4">
                                        <div>
                                            <p className="truncate text-lg font-medium text-indigo-600">(#{contest.id}) {contest.name}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">{contest.description}</span>
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    開始時間 <time
                                                    dateTime={contest.start_time}>{moment(contest.start_time).format("yyyy-MM-DD hh:mm:ss")}</time>
                                                </p>
                                                <p className="text-sm text-gray-900">
                                                    截止時間 <time
                                                    dateTime={contest.end_time}>{moment(contest.end_time).format("yyyy-MM-DD hh:mm:ss")}</time>
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
        </>
    )
}
