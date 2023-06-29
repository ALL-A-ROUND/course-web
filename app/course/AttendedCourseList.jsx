"use client"
import useSWR from "swr";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

function CourseCard({course}) {
    return (
        <Link href={`/course/${course.id}`}>
            <div className={"flex gap-2 h-20 items-center"}>
                <Image className={"w-1/3 bg-gray-200"} src={"/course.jpeg"} width={640} height={75}
                       alt={"course image"}></Image>
                <div className={"flex flex-col"}>
                    <div className={"text-blue-600 mb-2"}>{course.name}</div>
                    <div className={"text-sm text-gray-400"}>老師： 葉大大</div>
                    <div className={"text-sm text-gray-400"}>班級： 二年級</div>
                </div>
            </div>
        </Link>
    )
}

export default function () {
    const router = useRouter()
    const pathname = usePathname()
    const {
        data: courses,
        isLoading
    } = useSWR('/course/attended', async (url) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        })

        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem("token")
                router.replace("/auth/login?next=" + pathname)
            }
        }
        return res.json()
    })
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {courses?.length > 0 && courses?.map((course) => <CourseCard course={course} key={course.id}/>)}
        </>
    )
}