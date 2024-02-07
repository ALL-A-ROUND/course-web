"use client"
import useSWR from "swr";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {api} from "@/app/utils";

function CourseCard({course}) {
    return (
        <Link href={`/course/${course.id}`}>
            <div className={"flex gap-2 h-20 items-center"}>
                <Image className={"w-1/3 bg-gray-200"}
                       src={course?.image ? process.env.NEXT_PUBLIC_ASSET_ENDPOINT + course?.image : "/course.jpeg"}
                       width={640} height={75}
                       alt={"course image"}></Image>
                <div className={"flex flex-col"}>
                    <div className={"text-blue-600 mb-2"}>{course.name}</div>
                    <div
                        className={"text-sm text-gray-400"}>老師： {course?.teachers?.map(user => user?.name).join('、')}</div>
                    <div className={"text-sm text-gray-400"}>班級： 二年級</div>
                </div>
            </div>
        </Link>
    )
}

export default function CourseList({type}) {
    "use client"
    const {
        data: courses,
        isLoading
    } = useSWR('/course/' + type, async (url) => await api('GET', url + "?with=teachers").then(data => data))
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {courses?.length > 0 && courses?.map((course) => <CourseCard course={course} key={course.id}/>)}
        </>
    )
}