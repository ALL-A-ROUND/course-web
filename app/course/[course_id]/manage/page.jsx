"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {api} from "@/app/utils";
import {ClipboardIcon} from "@heroicons/react/24/outline";

import Swal from "sweetalert2";
import FeatureEdit from "@/app/course/[course_id]/manage/FeatureEdit";
import CourseInformationEdit from "@/app/course/[course_id]/manage/CourseInformationEdit";

export default function ({params}) {
    const router = useRouter();
    const pathname = usePathname()
    const [course, setCourse] = useState({});
    const loading = useRef(true)



    useEffect(() => {
        api('GET', '/course/' + params.course_id).then(data => {
            setCourse(data)
            loading.current = false
        })
    }, [router])

    return (
        <div className={"bg-gray-100"}>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <CourseInformationEdit params={params} course={course}/>
                    <FeatureEdit params={params} course={course}/>
                </div>
            </div>
        </div>
    )
}
