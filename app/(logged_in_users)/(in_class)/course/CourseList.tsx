"use client"
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/app/utils";
import { cn } from "@/lib/utils";

function CourseCard({ course }) {
    return (
        <Link href={`/course/${course.id}`}>
            <div className={"flex flex-col sm:flex-row gap-2 p-2 sm:p-0 shadow sm:shadow-none border sm:border-0 sm:h-20 items-center bg-gray-50 sm:bg-white rounded-xl"}>
                <Image /*className={"w-1/3 bg-gray-200"}*/
                    width="0"
                    height="0"
                    sizes="100vw"
                    className={cn("w-1/2 h-full rounded-md hover:scale-110 object-cover transition ease-in-out")}
                    src={course?.image ? process.env.NEXT_PUBLIC_ASSET_ENDPOINT + course?.image : "/course.jpeg"}
                    /*width={640} height={75}*/
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

export default function CourseList({ type }) {
    "use client"
    const {
        data: courses,
        isLoading
    } = useSWR('/course/' + type, async (url) => await api('GET', url + "?with=teachers").then(data => data))
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {courses?.length > 0 && courses?.map((course) => <CourseCard course={course} key={course.id} />)}
        </>
    )
}
