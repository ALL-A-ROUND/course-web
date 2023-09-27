"use client"
import {CheckCircleIcon, ChevronRightIcon, EnvelopeIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import {api} from "@/app/utils";
import {CircleStackIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import {
    BookOpenIcon,
    ComputerDesktopIcon,
    FlagIcon,
    NewspaperIcon,
    PlusIcon,
    VideoCameraIcon
} from "@heroicons/react/24/solid";

export default function ({params: {course_id}}) {
    const {
        data: units,
        isLoading
    } = useSWR(`/course/${course_id}/units`, async (url) => await api("GET", url, null).then(d => d))
    return (
        <div className="overflow-hidden bg-white sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}
                {Array.isArray(units) && units?.map((unit, idx) => (
                    <li key={unit.id}>
                        <div href={`/course/${course_id}/unit/${unit.id}`}
                             className="flex flex-col gap-2 my-3">
                            <div className={"bg-purple-700 px-2 py-0.5 w-fit rounded-2xl text-white border-b"}>
                                第 {idx + 1} 章節
                            </div>
                            <div className={"pl-2 text-indigo-600 text-xl"}>
                                {unit?.name}
                            </div>
                        </div>

                        {Array.isArray(unit?.lessons) && unit?.lessons?.map((lesson, idx) => (
                            <Link href={`/course/${course_id}/unit/${unit?.id}/lesson/${lesson?.id}`}
                                  key={lesson?.id + idx}
                                  className={"inline-flex items-center justify-between border-t gap-3 w-full p-2 hover:bg-purple-300"}
                                  style={{
                                      "transition": ".5s"
                                  }}>
                                <span className={"inline-flex items-center"}><PlusCircleIcon
                                    className={"h-6 w-6 text-gray-600"}/> {lesson?.title}</span>
                                <span
                                    className={"p-1 inline-flex items-center gap-1 rounded-xl bg-purple-600 text-white text-sm"}>
                                    {lesson?.video ?
                                        <VideoCameraIcon className={"h-5 w-5 text-purple-100"}/> : null
                                    }
                                    {lesson?.article ?
                                        <NewspaperIcon className={"h-5 w-5 text-purple-100"}/> : null
                                    }
                                </span>
                            </Link>
                        ))}

                        {Array.isArray(unit?.homework) && unit?.homework?.map((contest, idx) => (
                            <Link href={`/contest/${contest.id}`}
                                  key={contest?.id + idx}
                                  className={"inline-flex items-center justify-between border-t gap-3 w-full p-2 hover:bg-purple-300"}
                                  style={{
                                      "transition": ".5s"
                                  }}>
                                <span className={"inline-flex items-center"}>
                                    <ComputerDesktopIcon className={"h-6 w-6 text-gray-600"}/>作業 {contest?.name}
                                </span>
                            </Link>
                        ))}

                        {Array.isArray(unit?.practice) && unit?.practice?.map((contest, idx) => (
                            <Link href={`/contest/${contest.id}`}
                                  key={contest?.id + idx}
                                  className={"inline-flex items-center justify-between border-t gap-3 w-full p-2 hover:bg-purple-300"}
                                  style={{
                                      "transition": ".5s"
                                  }}>
                                <span className={"inline-flex items-center"}>
                                    <FlagIcon className={"h-6 w-6 text-gray-600"}/>練習 {contest?.name}
                                </span>
                            </Link>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}
