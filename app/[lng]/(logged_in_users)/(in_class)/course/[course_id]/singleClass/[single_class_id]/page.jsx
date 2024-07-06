"use client"
import {InformationCircleIcon} from '@heroicons/react/20/solid'
import useSWR from "swr";
import {api, moment, sha256} from "@/app/[lng]/utils";
import {useRef, useState} from "react";
import $ from "jquery";


export default function ({params: {course_id, single_class_id}}) {
    const {
        data: sc,
        isLoading
    } = useSWR(`/course/${course_id}/singleClass/${single_class_id}`, url => api('GET', url).then(data => data))
    return (
        <div className="bg-white px-6 lg:px-8">
            {isLoading && ("loading...")}
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                {/*<p className="text-base font-semibold leading-7 text-indigo-600">Introducing</p>*/}
                <div className={"flex justify-between items-center"}>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {sc?.slido}
                    </h1>
                </div>
                <h3 className="text-md font-bold tracking-tight text-gray-500">
                    課堂時間： {moment(sc?.start_time).format("YYYY-MM-DD HH:mm:ss")} ~ {moment(sc?.end_time).format("YYYY-MM-DD HH:mm:ss")}
                </h3>
                <h3 className="text-md font-bold tracking-tight text-gray-500">
                    發布時間：{moment(sc?.created_at).fromNow()}
                </h3>

                <iframe src={`https://app.sli.do/event/${sc?.slido_id}`} height="100%" width="100%" frameBorder="0" style={{"min-height": "560px"}} title="Slido"></iframe>
            </div>
        </div>
    )
}
