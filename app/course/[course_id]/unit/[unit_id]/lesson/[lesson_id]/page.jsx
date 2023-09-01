"use client"
import {CheckCircleIcon, ChevronRightIcon, EnvelopeIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import {api} from "@/app/utils";
import {CircleStackIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import {PlusIcon} from "@heroicons/react/24/solid";

export default function LessonPage({params: {course_id, unit_id, lesson_id}}) {
    const {
        data: lesson,
        isLoading
    } = useSWR(`/lesson/${lesson_id}`, async (url) => await api("GET", url, null).then(d => d))
    return (
        <div className="overflow-hidden bg-white sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}

                <div className={"flex flex-col gap-4"}>

                    <div className={"text-3xl text-purple-700 font-extrabold"}>{lesson?.title}</div>

                    {lesson?.video ? (
                        <div className={"relative pb-[56%] pt-4"}>
                            <iframe width="655" height="399" src={`https://www.youtube.com/embed/${lesson?.video}`}
                                    title={lesson?.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className={"absolute top-0 left-0 w-full h-full"}
                            ></iframe>
                        </div>
                    ) : "本堂課程未提供影片"}

                    <div className={"h-full my-8"}>
                        {lesson?.article ?? "本堂課程未提供文字講義"}
                    </div>
                </div>
            </ul>
        </div>
    )
}
