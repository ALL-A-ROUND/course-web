"use client"
import {ChevronRightIcon} from '@heroicons/react/20/solid'
import {useRouter, useSearchParams} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import {UserCircleIcon} from "@heroicons/react/24/solid";

export default function () {
    const color = {
        "AC": "text-green-600",
        "WA": "text-red-600",
        "PAC": "text-blue-600",
    }
    const searchParams = useSearchParams()
    const router = useRouter()
    const {
        data: submissions,
        isLoading
    } = useSWR(`/submission?${searchParams.toString()}`, async (url) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        })
        return res.json()
    }, {
        refreshInterval: 5000
    })
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}
                {submissions?.length > 0 && submissions?.map((submission) => (
                    <li key={submission.id}>
                        <Link href={`/submission/${submission?.id}`} className="block hover:bg-gray-50">
                            <div className="flex items-center justify-between px-4 py-4 sm:px-6 gap-4">
                                <div className={"w-full"}>
                                    <div className={"flex justify-between"}>
                                        <span className="text-lg font-bold text-indigo-600">#{submission?.id}</span>
                                        <span
                                            className={`text-md font-medium ${color[submission?.result]}`}>{submission?.result}</span>
                                    </div>

                                    <p className="mt-2 flex items-center text-sm text-gray-500">(#{submission?.problem?.id}) {submission?.problem?.title}</p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <span className="truncate">{submission.status}</span>
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <span
                                            className="truncate">{submission?.testcase_judge_results?.map(r => r.result).join(" ")}</span>
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <UserCircleIcon className={"h-5 w-5"}/> <span
                                        className="truncate">{submission?.user?.name}</span>
                                    </p>
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
