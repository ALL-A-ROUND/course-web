"use client"
import {ArrowPathIcon, ClipboardIcon} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import {useOnBeforeUnload} from "@/app/hooks";
import {useEffect, useState} from "react";
import {api} from "@/app/utils";

export default function CourseInformationEdit({params, course}) {
    const [onBeforeUnload, setOnBeforeUnload] = useOnBeforeUnload()
    const [courseInfo, setCourseInfo] = useState({
        name: '', code: '', invite_code: '', teacher_code: '', description: ''
    })

    const regenerate = (type) => {
        let url = '/course/' + params.course_id + '/regenerate/' + type
        api('POST', url).then(data => {
            setCourseInfo(data)
        })
    }

    const saveInfo = () => {
        api('PATCH', '/course/' + params.course_id, {
            name: courseInfo.name,
            code: courseInfo.code,
            description: courseInfo.description,
        }).then(data => {
            setOnBeforeUnload(false)
            Swal.fire({
                icon: 'success',
                title: '儲存成功',
            })
        })
    }

    useEffect(() => {
        setCourseInfo(course)
    }, [course])

    return (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">課程資訊</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        這些資訊將公開在課程平台上
                    </p>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="name"
                                   className="block text-sm font-medium text-gray-700">
                                名稱
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={courseInfo.name}
                                    onChange={e => {
                                        setCourseInfo({...courseInfo, name: e.target.value})
                                        setOnBeforeUnload(true)
                                    }}
                                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="課程名稱"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="code"
                                   className="block text-sm font-medium text-gray-700">
                                開課代碼
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    readOnly={true}
                                    value={courseInfo.code}
                                    onChange={e => {
                                        setCourseInfo({...courseInfo, code: e.target.value})
                                        setOnBeforeUnload(true)
                                    }}
                                    className="block cursor-not-allowed w-full rounded-md bg-gray-200 border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                    placeholder="開課代碼"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="invite_code"
                                   className="flex text-sm font-medium text-gray-700 items-center">
                                課程邀請碼 <ClipboardIcon className={"inline h-4 w-4 ml-1 cursor-pointer"}
                                                          onClick={e => {
                                                              navigator.clipboard.writeText(courseInfo.invite_code)
                                                              Swal.fire({
                                                                  icon: 'success',
                                                                  html: '複製成功<br/>' + courseInfo.invite_code,
                                                              })
                                                          }}/>
                                <ArrowPathIcon className={"inline h-4 w-4 ml-1 cursor-pointer"}
                                               onClick={() => regenerate('student')}/>
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="invite_code"
                                    id="invite_code"
                                    readOnly={true}
                                    value={courseInfo.invite_code}
                                    className="block cursor-not-allowed w-full rounded-md bg-gray-200 border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                    placeholder="課程邀請碼"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="teacher_code"
                                   className="flex text-sm font-medium text-gray-700 items-center">
                                教師邀請碼
                                <ClipboardIcon className={"inline h-4 w-4 ml-1 cursor-pointer"}
                                               onClick={e => {
                                                   navigator.clipboard.writeText(courseInfo.teacher_code)
                                                   Swal.fire({
                                                       icon: 'success',
                                                       html: '複製成功<br/>' + courseInfo.teacher_code,
                                                   })
                                               }}/>
                                <ArrowPathIcon
                                    className={"inline h-4 w-4 ml-1 cursor-pointer"}
                                    onClick={() => regenerate('teacher')}/>
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="invite_code"
                                    id="invite_code"
                                    readOnly={true}
                                    value={courseInfo.teacher_code}
                                    className="block cursor-not-allowed w-full rounded-md bg-gray-200 border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                    placeholder="教師邀請碼"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            詳細說明
                        </label>
                        <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            value={courseInfo.description}
                                            onChange={e => {
                                                setCourseInfo({...courseInfo, description: e.target.value})
                                                setOnBeforeUnload(true)
                                            }}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="課程說明"
                                        />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end border-t pt-2 mt-4">
                <button
                    onClick={saveInfo}
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    儲存
                </button>
            </div>
        </div>
    )
}