"use client"
import {CheckCircleIcon, ChevronRightIcon, EnvelopeIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

export default function ({params: {course_id}}) {
    const router = useRouter()
    const {
        data: units,
        isLoading
    } = useSWR(`/course/${course_id}/units`, async (url) => {
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
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}
                {units?.length && units?.map((unit) => (
                    <li key={unit.id}>
                        <Link href={`/course/${course_id}/unit/${unit.id}`} className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="flex min-w-0 flex-1 items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="truncate text-lg font-medium text-indigo-600">{unit.name}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">{unit.description}</span>
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
