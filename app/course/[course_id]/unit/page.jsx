"use client"
import {CheckCircleIcon, ChevronRightIcon, EnvelopeIcon} from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import {api} from "@/app/utils";
import {CircleStackIcon, DocumentIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import {
    BookOpenIcon,
    ComputerDesktopIcon,
    FlagIcon, LinkIcon,
    NewspaperIcon,
    PlusIcon,
    VideoCameraIcon
} from "@heroicons/react/24/solid";
import {auth} from "@/lib/firebase/firebase";

export default async function ({params: {course_id}}) {
    const {
        data: units,
        isLoading
    } = useSWR(`/course/${course_id}/units`, async (url) => await api("GET", url, null).then(d => d))
    const token = await auth.currentUser?.getIdToken()

    const download = async (id, fn) => {
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/attachment/" + id, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
            // 其他設定或是需要傳遞的資料
        })
            .then((response) => response.blob())
            .then((blob) => {
                var url = window.URL.createObjectURL(blob); // create url from blob
                var fileLink = document.createElement('a'); // create link for file
                fileLink.href = url;
                fileLink.download = fn; // set file name
                document.body.appendChild(fileLink); // append file link to download
                fileLink.click();
                fileLink.remove(); // remove file link after click
            })
            .catch((error) => {
                // Handle error here.
            });
    }
    return (
        <div className="overflow-hidden bg-white sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>瘋狂載入中...</div>}
                {Array.isArray(units) && units?.map((unit, idx) => (
                    <li key={unit.id}>
                        <div className="flex flex-col gap-2 my-3">
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
                                  className={"inline-flex items-center justify-between border-t gap-3 w-full p-2 hover:bg-purple-300 mr-1"}
                                  style={{
                                      "transition": ".5s"
                                  }}>
                                <span className={"inline-flex items-center"}><PlusCircleIcon
                                    className={"h-6 w-6 text-gray-600"}/> {lesson?.title}</span>
                                <span
                                    className={`p-1 inline-flex items-center gap-1 rounded-xl ${lesson?.completed ? "bg-green-600" : "bg-purple-600"} text-white text-sm`}>
                                    {lesson?.video ?
                                        <VideoCameraIcon
                                            className={`h-5 w-5 ${lesson?.completed ? "bg-green-600" : "text-purple-100"}`}/> : null
                                    }
                                    {lesson?.article ?
                                        <NewspaperIcon
                                            className={`h-5 w-5 ${lesson?.completed ? "bg-green-600" : "text-purple-100"}`}/> : null
                                    }
                                    {lesson?.completed && <CheckCircleIcon className={"h-5 w-5"}/>}
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

                        {Array.isArray(unit?.attachments) && unit?.attachments?.map((attachment, idx) => (<>
                            <button
                                onClick={e => download(attachment?.id, attachment?.name)}
                                key={`attachment-${attachment?.id}-${idx}`}
                                className={"inline-flex items-center justify-between border-t gap-3 w-full p-2 hover:bg-purple-300"}
                                style={{
                                    "transition": ".5s"
                                }}>
                                <span className={"inline-flex items-center"}>
                                    <DocumentIcon
                                        className={"h-6 w-6 text-gray-600"}/>附件 {attachment?.name}
                                </span>
                            </button>
                        </>))}

                        {Array.isArray(unit?.links) && unit?.links?.map((link, idx) => (<>
                            {
                                link?.type === "link" ? (<>
                                    <Link href={link?.url}
                                          key={`link-${link?.id}-${idx}`}
                                          target={"_blank"}

                                          className={"inline-flex items-center justify-between border-t gap-3 w-full p-2 hover:bg-purple-300"}
                                          style={{
                                              "transition": ".5s"
                                          }}>
                                            <span className={"inline-flex items-center"}>
                                                <LinkIcon className={"h-6 w-6 text-gray-600"}/>連結 {link?.name}
                                            </span>
                                    </Link>
                                </>) : <></>
                            }
                        </>))}
                    </li>
                ))}
            </ul>
        </div>
    )
}
