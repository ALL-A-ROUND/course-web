"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {api} from "@/app/utils";
import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon, TableCellsIcon} from "@heroicons/react/24/outline";

function FeatureEditComponent({feature, course, setCourse}) {
    function checkBoxChange(e) {
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
            <div className={"text-lg font-bold"}>{feature.name}</div>
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
                        defaultChecked={course.config?.features?.[feature.id]?.enabled}
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
    const pathname = usePathname()
    const [course, setCourse] = useState({});

    const features = [
        {
            id: 'unit',
            name: '單元',
            path: `/course/${params.course_id}/unit`,
            icon: BookOpenIcon,
        },
        {
            id: 'contest',
            name: '競賽',
            path: `/course/${params.course_id}/contest`,
            icon: ClipboardIcon,
        },
        {
            id: 'problem',
            name: '題庫',
            path: `/course/${params.course_id}/problem`,
            icon: PencilSquareIcon,
        },
        {
            id: 'scores_checking',
            name: '成績查詢',
            path: `/course/${params.course_id}/scores_checking`,
            icon: TableCellsIcon,
        },
    ]

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
        })
    }

    useEffect(() => {
        api('GET', '/course/' + params.course_id).then(data => {
            setCourse(data)
        })
    }, [pathname])

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
                                                className="block cursor-not-allowed w-full rounded-md border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="開課代碼"
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
                                <h3 className="text-lg font-medium leading-6 text-gray-900">題庫設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    這些設定會影響到題庫的使用
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                {features.map(feature => (
                                    <FeatureEditComponent key={feature.id} feature={feature} course={course}
                                                          setCourse={setCourse}/>
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
