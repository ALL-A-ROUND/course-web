"use client"
import {ChevronRightIcon} from '@heroicons/react/20/solid'
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import {ArrowLongLeftIcon, ArrowLongRightIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import {api} from "@/app/utils";

export default function () {
    const color = {
        "AC": "text-green-600",
        "WA": "text-red-600",
        "PAC": "text-blue-600",
    }
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const {
        data: submissions,
        isLoading
    } = useSWR(`/submission?${searchParams.toString() === "" ? 'page=1' : searchParams.toString()}`, async (url) => {
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
    const {
        data: submission_count,
    } = useSWR(`/submission/count?${searchParams.toString()}`, url => api('GET', url).then(res => res))

    const prevPage = () => {
        const sp = new URLSearchParams(searchParams)
        sp.set("page", Math.max(1, (parseInt(searchParams.get("page"))||1) - 1))
        return pathname + "?" + sp.toString()
    }
    const nextPage = () => {
        const sp = new URLSearchParams(searchParams)
        sp.set("page", Math.min(Math.ceil(submission_count?.count / 10), (parseInt(searchParams.get("page"))||1) + 1))
        return pathname + "?" + sp.toString()
    }

    const page_link = (page) => {
        const sp = new URLSearchParams(searchParams)
        sp.set("page", page)
        return pathname + "?" + sp.toString()
    }

    const pages = () => {
        const current = parseInt(searchParams.get("page"))
        if (isNaN(current)) return [1]
        if (submission_count === undefined) return [current]
        const last = Math.ceil(submission_count?.count / 10)
        const page = []
        for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
            page.push(i)
        }
        return page
    }

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div className={"p-4"}>Loading...</div>}
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
            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-2 py-2">
                <div className="-mt-px flex w-0 flex-1">
                    <Link
                        href={prevPage()}
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        上一頁
                    </Link>
                </div>
                <div className="hidden md:-mt-px md:flex">
                    {pages().map(
                        (_, i) => (
                            _ === parseInt(searchParams.get("page")) ? (
                                <Link
                                    href={page_link(_)}
                                    key={_}
                                    className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                                    aria-current="page"
                                >
                                    {_}
                                </Link>
                            ) : (
                                <Link href={page_link(_)}
                                      key={_}
                                      className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                > {_}   </Link>
                            )
                        )
                    )}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                    <Link
                        href={nextPage()}
                        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        下一頁
                        <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </Link>
                </div>
            </nav>

        </div>
    )
}
