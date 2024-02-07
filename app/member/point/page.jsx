"use client"
import {api, moment} from "@/app/utils";
import useUser from "@/app/useUser";
import useSWR from "swr";
import Instance from "@/app/utils/Instance";
import {useRef, useState} from "react";
import Swal from "sweetalert2";
import {CheckBadgeIcon} from "@heroicons/react/24/solid";


export default function Credit() {
    const {user} = useUser()
    const {
        data: points,
        mutate,
    } = useSWR(`/point`, async (url) => await api("GET", url, null, {
        revalidate: 1000
    }).then(d => d))

    const checkIn = () => {
        api("POST", "/point/checkin", null).then(async d => {
            mutate().then(d => {
                Swal.fire("簽到成功", "", "success")
            })
        })
    }

    return (
        <>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">積分園地</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        每日登入可獲得積分，完成任務也可以累積積分。
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">目前積分
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">${user?.point}</div>
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">積分紀錄</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        積分紀錄
                    </p>

                    <ul role="list"
                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        {Array.isArray(points) && points.map((point, index) => (
                            <li key={"point_" + index} className="flex justify-between gap-x-6 py-6">
                                <div className="font-medium text-gray-900">
                                    {moment(point.created_at).format("yyyy/MM/DD")}-{point.description}
                                </div>
                                <div className="w-1/6 font-medium text-gray-900">
                                    {point.amount <= 0 ? `使用 $${-point.amount}` : `獲得 $${point.amount}`}
                                </div>
                            </li>
                        ))}
                        {Array.isArray(points) && points.length === 0 && (
                            <li className="flex justify-between gap-x-6 py-6">
                                <div className="font-medium text-gray-900">
                                    暫無紀錄
                                </div>
                            </li>
                        )}
                    </ul>

                    <div className="flex border-t border-gray-100 pt-6">
                        <button type="button"
                                onClick={checkIn}
                                className="cursor-pointer inline-flex items-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true"><CheckBadgeIcon className={"h-5 w-5"}/> </span> 每日簽到
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
