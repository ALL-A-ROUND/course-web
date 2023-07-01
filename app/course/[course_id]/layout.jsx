"use client"
import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ChatBubbleLeftRightIcon, ClipboardIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {api, makeFeature} from "@/app/utils";
import useSWR from "swr";

export default function CourseLayout({params, children}) {
    const router = useRouter()
    const pathname = usePathname()
    const [course, setCourse] = useState({})
    const {
        data: enabledFeatures,
        isLoading: isFeatureLoading
    } = useSWR(`/course/${params.course_id}/features`, (url) => api('GET', url).then(data => data))

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router.replace('/auth/login')
        }
        api('GET', '/course/' + params.course_id + '?with=teachers').then(data => {
            if(!document.title.startsWith(data.name)){
                document.title = data.name + ' - '
            }
            setCourse(data)
        })
    }, [pathname])

    const features = makeFeature(params)

    return (
        <div className="flex min-h-full flex-col">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex">
                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6 bg-white border border-gray-300 flex flex-col gap-2 mx-6 my-4 xl:my-0">
                        <div className={"bg-indigo-300 text-center py-1"}>{course?.name}</div>
                        <div className={""}>講師：{course?.teachers?.map(user => user?.name).join('、')}</div>

                        <div className={"border border-gray-300 w-full my-4"}/>
                        {isFeatureLoading ? <div className={"animate-pulse w-full bg-gray-100 h-6"}/> : null}
                        {Array.isArray(features) && features.filter(feature => Array.isArray(enabledFeatures) && enabledFeatures?.includes(feature.id)).map(feature => (
                            <Link href={feature.path}
                                  key={feature.id}
                                  className={`px-3 py-1 hover:bg-gray-200 cursor-pointer inline-flex items-center gap-1 ${pathname.match(feature.path) ? 'bg-gray-200' : ''}`}>
                                <feature.icon className={"h-4 w-4"}/>
                                {feature.name}
                            </Link>
                        ))}
                    </div>

                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 border border-gray-300 bg-white mx-6 flex flex-col gap-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}