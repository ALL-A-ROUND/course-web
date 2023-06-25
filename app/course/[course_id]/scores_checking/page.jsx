"use client"
import {useEffect, useState} from "react";
import {api} from "@/app/utils";
import {useRouter} from "next/navigation";

export default function Example({params}) {
    const [scores, setScores] = useState([])
    const router = useRouter()

    function fetchScore() {
        api('GET', `/course/${params.course_id}/customScoresWithMark`).then(res => {
            setScores(res)
        })
    }

    useEffect(() => {
        fetchScore()
    }, [router])

    const TYPE_NAME = {
        "custom": "自訂",
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">成績查詢</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        這裡可以查詢你的成績。
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        名稱
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        佔比
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        分數
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {scores.map((score) => (
                                    <tr key={score.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {score.name}
                                            <span className="ml-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                {TYPE_NAME[score.type]}
                                              </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{score.weight}%</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{score.score}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
