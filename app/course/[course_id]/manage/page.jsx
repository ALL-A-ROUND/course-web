"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {api} from "@/app/utils";
import {ClipboardIcon} from "@heroicons/react/24/outline";

import Swal from "sweetalert2";
import FeatureEdit from "@/app/course/[course_id]/manage/FeatureEdit";
import CourseInformationEdit from "@/app/course/[course_id]/manage/CourseInformationEdit";
import RelatedUserEdit from "@/app/course/[course_id]/manage/RelatedUserEdit";
import useSWR from "swr";

export default function CourseManage({params}) {
    const router = useRouter();
    const pathname = usePathname()
    // const [course, setCourse] = useState({
    //     name: '',
    //     code: '',
    //     invite_code: '',
    //     description: '',
    //     config: {
    //         features: []
    //     }
    // });
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     api('GET', '/course/' + params.course_id).then(data => {
    //         setCourse(data)
    //         console.log(data)
    //         setLoading(false)
    //     })
    // }, [router])

    const {
        data: course,
        isLoading: loading,
        mutate
    } = useSWR(`/course/${params.course_id}?with=teachers,students`, (url) => api('GET', url).then(data => data))


    return (
        <div className={"bg-gray-100"}>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {loading && <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>}

                    <CourseInformationEdit params={params} course={course}/>
                    <FeatureEdit params={params} course={course}/>
                    <RelatedUserEdit params={params} course={course} mutate={mutate}/>
                </div>
            </div>
        </div>
    )
}
