"use client";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import useSWR from "swr";
import {api} from "@/app/utils";

function Heading() {
    return (
        <div>
            <div>
                <nav className="sm:hidden" aria-label="Back">
                    <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                        <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                        Back
                    </a>
                </nav>
                <nav className="hidden sm:flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-4">

                        <li>
                            <div className="flex items-center">
                                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                    管理
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                                <a href="#" aria-current="page"
                                   className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    我的開課
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        我的開課
                    </h2>
                </div>
                <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const {
        data: courses,
        isLoading
    } = useSWR('/course/owned', async (url) => await api('GET', url + "?with=teachers").then(data => data))


    return (<>
        <div className={"m-4 p-4"}>
            <Heading/>

            <div className={"grid grid-cols-2 gap-2"}>
                {
                    isLoading && '載入中請稍候...'
                }

                {
                    courses && courses.map(course => (
                        <div className={"border rounded-lg p-2"}>
                            <h3 className={"text-lg font-bold"}>
                                {course.name} ({course.id} - NT${course.price})
                            </h3>

                            <div>
                                {course.introduction}
                            </div>


                            <Link
                                href={`/course/${course.id}`}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                打開課程
                            </Link>

                        </div>
                    ))
                }


            </div>

        </div>
    </>)


}
