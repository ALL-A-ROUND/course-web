"use client"
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {api, makeFeature} from "@/app/[lng]/utils";
import {classNames} from "@/app/[lng]/utils";
import useSWR from "swr";
import {BuildingLibraryIcon} from "@heroicons/react/20/solid";

export default function CourseLayout({params, children}) {
    const router = useRouter()
    const pathname = usePathname()
    const [course, setCourse] = useState({})
    const {
        data: enabledFeatures,
        isLoading: isFeatureLoading
    } = useSWR(`/course/${params.course_id}/features`, (url) => api('GET', url).then(data => data))

    useEffect(() => {
        api('GET', '/course/' + params.course_id + '?with=teachers').then(data => {
            if (!document.title.startsWith(data.name)) {
                document.title = data.name + ' - '
            }
            setCourse(data)
        })
    }, [pathname])

    const features = makeFeature(params)

    return (
        <div className="flex min-h-full flex-col">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2 py-4">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex">
                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6 bg-indigo-600 border border-gray-300 flex flex-col gap-2 mx-6 my-4 xl:my-0 rounded-lg">
                        {isFeatureLoading ? <div className={"animate-pulse bg-indigo-400 w-full rounded-xl h-6"}/> :
                            <>
                                <h2 className={"bg-indigo-400 text-white font-bold text-lg text-center py-1 flex justify-center rounded-xl items-center mb-2"}>{course?.name}</h2>
                                <div
                                    className={"bg-indigo-400 text-white text-left py-1 flex flex-col justify-start rounded-md items-start mb-2 p-2"}>
                                    <div>講師：{course?.teachers?.map(user => user?.name).join('、')}</div>
                                    <div>
                                        {course?.description}
                                    </div>
                                </div>
                            </>
                        }
                        {isFeatureLoading ? <div className={"animate-pulse w-full bg-gray-100 h-6"}/> : null}
                        {Array.isArray(features) && features.filter(feature => (Array.isArray(enabledFeatures) && enabledFeatures?.includes(feature.id))).map(feature => (

                            <Link href={feature.path}
                                  key={feature.id}
                                  className={classNames(
                                      false
                                          ? 'bg-indigo-700 text-white'
                                          : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                  style={{
                                      "transition": ".4s"
                                  }}>
                                <feature.icon className={classNames(
                                    false ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                    'h-6 w-6 shrink-0'
                                )}/>
                                {feature.name}
                            </Link>
                        ))}
                        <Link href={'/course/' + params.course_id + '/singleClass'}
                              className={classNames(
                                  /\/course\/(.*)\/singleClass/.test(pathname)
                                      ? 'bg-indigo-700 text-white'
                                      : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                              )}
                              style={{
                                  "transition": ".4s"
                              }}>
                            <BuildingLibraryIcon className={classNames(
                                false ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                'h-6 w-6 shrink-0'
                            )}/>
                            課堂
                        </Link>
                    </div>

                    <div
                        className="py-6 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 border border-gray-300 bg-white mx-6 flex flex-col gap-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
