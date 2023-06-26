"use client"
import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {api} from "@/app/utils";

export default function CourseLayout({params, children}) {
    const router = useRouter()
    const pathname = usePathname()
    const [enabledFeatures, setEnabledFeatures] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router.replace('/auth/login')
        }
        api('GET', '/course/' + params.course_id + '/features').then(data => {
            setEnabledFeatures(data)
        })
    }, [pathname])

    const features = [
        {
            id: 'unit',
            name: '單元',
            path: `/course/${params.course_id}/unit`,
            icon: BookOpenIcon,
        },
        {
            id: 'contest',
            name: '競賽',
            path: `/course/${params.course_id}/contest`,
            icon: ClipboardIcon,
        },
        {
            id: 'problem',
            name: '題庫',
            path: `/course/${params.course_id}/problem`,
            icon: PencilSquareIcon,
        },
        {
            id: 'scores_checking',
            name: '成績查詢',
            path: `/course/${params.course_id}/scores_checking`,
            icon: TableCellsIcon,
        },
        {
            id: 'manage',
            name: '管理',
            path: `/course/${params.course_id}/manage`,
            icon: Cog6ToothIcon,
        }
    ]

    return (
        <div className="flex min-h-full flex-col">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex">
                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6 bg-white border border-gray-300 flex flex-col gap-2 mx-6 my-4 sm:my-0">
                        <div className={"bg-indigo-300 text-center py-1"}>{params.course_id}</div>
                        <div className={""}>老師： 葉大大</div>

                        <div className={"border border-gray-300 w-full my-4"}/>

                        {features.filter(feature => enabledFeatures?.includes(feature.id)).map(feature => (
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