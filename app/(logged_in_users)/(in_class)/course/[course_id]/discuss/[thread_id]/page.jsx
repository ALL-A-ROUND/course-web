
import {ChevronRightIcon} from '@heroicons/react/20/solid'
import {api} from "@/app/utils";
import ClientWrapper from "@/app/(logged_in_users)/(in_class)/course//[course_id]/discuss/[thread_id]/ClientWrapper";

async function getThreadData(course_id, thread_id) {
    return await api('GET', `/courses/${course_id}/threads/${thread_id}/public`)
}

export default async function Example({params}) {
    const {course_id, thread_id} = params
    const thread = await getThreadData(course_id, thread_id)
    return (
        <div>
            <div>
                <nav className="hidden sm:flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <div className="flex">
                                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                    討論區
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                                <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    類別
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {thread.name}
                    </h2>
                </div>
                <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
                    {/*<button
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
                    </button>*/}
                </div>
            </div>

            <ClientWrapper params={params}/>
        </div>
    )
}
