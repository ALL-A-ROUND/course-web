"use client"
import useSWR from "swr";
import Link from "next/link";
import {api, moment} from "@/app/utils";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {
    ComputerDesktopIcon,
    FlagIcon, HomeIcon,
    NewspaperIcon,
    VideoCameraIcon
} from "@heroicons/react/24/solid";

export default function LiveCodingList({params: {course_id, user_id}}) {
    const {
        data: channels,
        isLoading
    } = useSWR(`/live-coding/channels/${user_id}`, async (url) => await api("GET", url, null).then(d => d))
    return (
        <div className="overflow-hidden bg-white sm:rounded-md">
            <div className={`flex gap-2 mb-4`}>
                <Link className={"text-blue-700 inline-flex items-center"} href={"/course"}><HomeIcon
                    className={"h-5 w-5"}/> 我的首頁</Link>
                / <Link className={"text-blue-700 inline-flex items-center"} href={`/course/${course_id}`}>
                課程首頁</Link>
                / <Link className={"text-blue-700 inline-flex items-center"} href={`/course/${course_id}/manage`}>
                課程管理</Link>
                / 學生程式狀況
            </div>
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                ID
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                題目
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                上次更新
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                建立時間
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {Array.isArray(channels) && channels?.map((channel, idx) => (
                            <tr key={channel.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {idx + 1}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                    <Link href={'/course/' + course_id + '/manage/live-coding/' + channel.id}
                                          className={"underline"}>
                                        {channel.id}
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                    <Link href={'/problem/' + channel?.problem_id}
                                          className={"underline"}>
                                        {channel?.problem} ({channel?.problem_id})
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {channel.last_active_at ? (<>
                                        {moment(channel.last_active_at).format('MM/DD HH:mm')} ({
                                        moment(channel.last_active_at).fromNow()
                                    })
                                    </>) : (<>
                                        尚未更新
                                    </>)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{moment(channel.created_at).format('MM/DD HH:mm')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}