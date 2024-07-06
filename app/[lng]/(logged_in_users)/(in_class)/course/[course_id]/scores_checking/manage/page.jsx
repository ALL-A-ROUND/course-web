"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {api} from "@/app/[lng]/utils";
import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon, Cog8ToothIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

function ScoreEdit({score, course}) {
    return (
        <fieldset>
            <div className={"text-lg font-bold flex justify-between"}>
                <div>(ID: {score.id}) {score.name}</div>
                <Link href={`/course/${course.id}/scores_checking/${score.id}/manage`} target={'_blank'}
                      className={`${score.type === 'custom' ? '' : 'hidden'}`}><Cog8ToothIcon
                    className={"inline-block w-6 h-6"}/></Link>
            </div>
        </fieldset>
    )
}

export default function ({params}) {
    const router = useRouter();
    const [shouldOnBeforeUnload, setShouldOnBeforeUnload] = useState(false)
    const pathname = usePathname()
    const [course, setCourse] = useState({});
    const [customScoreData, setCustomScoreData] = useState({})
    const [allScores, setAllScores] = useState([])

    const features = [
        {
            id: 'unit',
            name: '影片播放',
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

        Object.keys(body).forEach(key => body[key] === null && delete body[key]);

        api('PATCH', '/course/' + params.course_id, body).then(data => {
            setCourse(data)
            setShouldOnBeforeUnload(false)
        })
    }

    function fetchAllScoreData() {
        api('GET', '/course/' + params.course_id + '/allScores').then(data => {
            setAllScores(data)
        })
    }

    function addCustomScore() {
        api('POST', '/course/' + params.course_id + '/customScores', customScoreData).then(data => {
            fetchAllScoreData()
        });
    }

    useEffect(() => {
        api('GET', '/course/' + params.course_id + "?with=customScores").then(data => {
            setCourse(data)
        })
        fetchAllScoreData()
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
                                <h3 className="text-lg font-medium leading-6 text-gray-900">成績查詢設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    設定成績查詢的相關設定。
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2 flex items-center gap-2">
                                        <input
                                            id="enabled"
                                            name="enabled"
                                            type="checkbox"
                                            onChange={e => {
                                                setCourse({
                                                    ...course,
                                                    config: {
                                                        ...course.config,
                                                        features: {
                                                            ...course.config?.features,
                                                            scores_checking: {
                                                                ...course.config?.features?.scores_checking,
                                                                enabled: e.target.checked
                                                            }
                                                        }
                                                    }
                                                })
                                                setShouldOnBeforeUnload(true)
                                            }}
                                            defaultChecked={course.config?.features?.scores_checking?.enabled}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="enabled"
                                               className="block text-sm font-medium text-gray-700">
                                            啟用功能
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">成績採計設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    設定成績採計的相關設定。
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                {allScores?.map(score => (
                                    <ScoreEdit key={score.id} score={score} course={course}/>
                                ))}

                                <fieldset className="border p-4 rounded-xl flex flex-col items-stretch gap-4">
                                    <div className={"text-lg font-bold flex justify-between"}>
                                        <div>新增自定義成績</div>
                                    </div>
                                    <div>
                                        <label htmlFor="custom_score_name"
                                               className="block text-md font-medium text-gray-900">
                                            成績名稱
                                        </label>
                                        <p className="text-sm text-gray-500">
                                            請輸入成績名稱。
                                        </p>
                                        <div className="mt-2 space-y-4">
                                            <div className="mt-1 rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="custom_score_name"
                                                    id="custom_score_name"
                                                    onChange={e => setCustomScoreData(ps => ({
                                                            ...ps,
                                                            name: e.target.value
                                                        }
                                                    ))}
                                                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="成績名稱"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <legend className="contents text-md font-medium text-gray-900">
                                            是否啟用
                                        </legend>
                                        <p className="text-sm text-gray-500">
                                            啟用之後，此項成績將會列入計算。
                                        </p>
                                        <div className="my-2 space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="custom_score_enabled"
                                                    name="custom_score_enabled"
                                                    type="checkbox"
                                                    defaultChecked={true}
                                                    onChange={e => setCustomScoreData(ps => ({
                                                        ...ps,
                                                        enabled: e.target.checked
                                                    }))}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label htmlFor="custom_score_enabled"
                                                       className="ml-3 block text-sm font-medium text-gray-700">
                                                    啟用
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="custom_score_percentage"
                                               className="block text-md font-medium text-gray-900">
                                            成績佔比
                                        </label>
                                        <p className="text-sm text-gray-500">
                                            此項成績佔總成績的百分比。
                                        </p>
                                        <div className="mt-2 space-y-4">
                                            <div className="mt-1  w-full rounded-md shadow-sm">
                                                <input
                                                    type="number"
                                                    name="custom_score_percentage"
                                                    id="custom_score_percentage"
                                                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    onChange={e => setCustomScoreData(ps => ({
                                                        ...ps,
                                                        weight: e.target.value
                                                    }))}
                                                    placeholder="佔比 ex: 10"
                                                    min={0}
                                                    max={100}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => addCustomScore()}
                                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            新增
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                router.back()
                            }}
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            儲存
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
