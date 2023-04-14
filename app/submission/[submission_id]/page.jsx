"use client"
import useSWR from "swr";
import {useRouter} from "next/navigation";
import moment from "moment-timezone/moment-timezone";

export default function ({params: {submission_id}}) {
    const router = useRouter()
    const {
        data: submission,
        isLoading
    } = useSWR(`/submission/${submission_id}`, async (url) => {
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
    }, {
        refreshInterval: 1000
    })

    const resultClass = {
        "Accepted": "text-green-600",
        "Wrong Answer": "text-red-600",
        "Time Limit Exceeded": "text-yellow-600",
        "Runtime Error": "text-red-600",
        "Compile Error": "text-red-600",
        "Memory Limit Exceeded": "text-yellow-600",
        "Output Limit Exceeded": "text-yellow-600",
        "Judging": "text-gray-600",
        "Pending": "text-gray-600",
        "System Error": "text-red-600",
        "Partially Accepted": "text-yellow-600",
        "Internal Error": "text-red-600",
        "Restricted Function": "text-red-600",
        "Presentation Error": "text-red-600",
    }

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {submission && (
                <div>
                    <div className="">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-2xl font-semibold leading-6 text-gray-900">{submission.status} #{submission_id}</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    測資列表
                                </p>
                                <p className="mt-2 text-sm text-gray-700">
                                    {submission.status === "Judging" && moment(moment().tz("UTC").diff(moment(submission?.created_at))).format('mm:ss')}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div
                                        className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    #
                                                </th>
                                                <th scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    結果
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    分數
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                            {submission?.testcase_judge_results?.map((result, i) => (
                                                <tr key={result.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {i + 1}
                                                    </td>
                                                    <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium ${resultClass[result.result]} sm:pl-6`}>
                                                        {result.result}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {result.score}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <pre className={"mt-4"}>
                    {JSON.stringify(submission, null, 2)}
                </pre>
                </div>
            )}
        </>
    )
}