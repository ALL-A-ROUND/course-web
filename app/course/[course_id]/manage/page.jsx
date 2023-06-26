"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {api, makeFeature} from "@/app/utils";
import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon, Cog8ToothIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Swal from "sweetalert2";

function FeatureEditComponent({feature, course, setCourse, setShouldOnBeforeUnload}) {
    function checkBoxChange(e) {
        setShouldOnBeforeUnload(true)
        setCourse(_course => {
            _course.config = _course.config || {}
            _course.config.features = _course.config.features || {}
            _course.config.features[feature.id] = _course.config.features[feature.id] || {}
            _course.config.features[feature.id].enabled = e.target.checked
            return {..._course}
        })
    }

    return (
        <fieldset>
            <div className={"text-lg font-bold flex justify-between"}>
                <div>{feature.name}</div>
                <Link href={feature.path + '/manage'} target={'_blank'}><Cog8ToothIcon
                    className={"inline-block w-6 h-6"}/></Link>
            </div>
            <legend className="contents text-md font-medium text-gray-900">
                是否啟用
            </legend>
            <p className="text-sm text-gray-500">
                啟用之後，學生將可以使用此功能。
            </p>
            <div className="mt-4 space-y-4">
                <div className="flex items-center">
                    <input
                        id={feature.id + "-enabled"}
                        name={feature.id + "-enabled"}
                        type="checkbox"
                        onChange={checkBoxChange}
                        checked={course.config?.features?.[feature.id]?.enabled}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={feature.id + "-enabled"}
                           className="ml-3 block text-sm font-medium text-gray-700">
                        啟用
                    </label>
                </div>
            </div>
        </fieldset>
    )
}

export default function ({params}) {
    const router = useRouter();
    const [shouldOnBeforeUnload, setShouldOnBeforeUnload] = useState(false)
    const pathname = usePathname()
    const [course, setCourse] = useState({});
    const loading = useRef(true)

    const features = makeFeature(params)

    const submit = (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const body = {
            name: data.get('name'),
            code: data.get('code'),
            description: data.get('description'),
            config: JSON.stringify(course.config)
        }

        api('PATCH', '/course/' + params.course_id, body).then(data => {
            setCourse(data)
            setShouldOnBeforeUnload(false)
            Swal.fire({
                icon: 'success',
                title: '儲存成功',
            })
        })
    }

    useEffect(() => {
        api('GET', '/course/' + params.course_id).then(data => {
            setCourse(data)
            loading.current = false
        })
    }, [router])

    useEffect(() => {
        if (shouldOnBeforeUnload) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = null
        }
    }, [shouldOnBeforeUnload])

    return (
        <div className={"bg-gray-100"}>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form className="space-y-6" onSubmit={submit} method="POST">
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
                                                defaultValue={course.name}
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
                                                defaultValue={course.code}
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
                                                                          navigator.clipboard.writeText(course.invite_code)
                                                                          Swal.fire({
                                                                              icon: 'success',
                                                                              html: '複製成功<br/>'+course.invite_code,
                                                                          })
                                                                      }}/>
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="invite_code"
                                                id="invite_code"
                                                readOnly={true}
                                                defaultValue={course.invite_code}
                                                className="block cursor-not-allowed w-full rounded-md bg-gray-200 border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="課程邀請碼"
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
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="課程說明"
                                            defaultValue={course.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">課程設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    課程的功能設定
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                {features.filter(x=>x.id!=='manage').map(feature => (
                                    <FeatureEditComponent key={feature.id} feature={feature} course={course}
                                                          setCourse={setCourse}
                                                          setShouldOnBeforeUnload={setShouldOnBeforeUnload}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                router.replace('/question_bank/pools')
                            }}
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            新增
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
