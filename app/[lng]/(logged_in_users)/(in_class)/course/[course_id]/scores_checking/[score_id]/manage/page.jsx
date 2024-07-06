"use client"
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {api} from "@/app/[lng]/utils";
import Swal from "sweetalert2";
import {Switch} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function Example({params}) {
    const [course, setCourse] = useState({})
    const [customScore, setCustomScore] = useState({})
    const [batchUpdate, setBatchUpdate] = useState({})
    const [shouldRegisterUnloader, setShouldRegisterUnloader] = useState(false)
    const [userScores, setUserScores] = useState({})
    const pathname = usePathname()
    useEffect(() => {
        api('GET', `/course/${params.course_id}` + '?with=students').then(res => {
            setCourse(res)
        })
        api('GET', `/course/customScores/${params.score_id}`).then(res => {
            setCustomScore(res)
        })
        getUserScore()
    }, [pathname])

    function changeScore(user_id, e) {
        setBatchUpdate(ps => ({
            ...ps,
            [user_id]: {
                user_id,
                score: e.target.value
            }
        }))
        setShouldRegisterUnloader(true)
    }

    function getUserScore() {
        api('GET', `/course/${params.course_id}/customScores/${params.score_id}`).then(res => {
            setUserScores(res)
        })
    }

    function updateButtonClicked() {
        Promise.all(Object.keys(batchUpdate).map(item =>
            api('POST', `/course/${params.course_id}/customScores/${params.score_id}`, {
                user_id: batchUpdate[item].user_id,
                score: batchUpdate[item].score
            })
        )).then(res => {
            setBatchUpdate([])
            setShouldRegisterUnloader(false)
        })
    }

    function saveCustomScore() {
        api('PATCH', `/courses/${params.course_id}/custom-scores/${params.score_id}`, customScore).then(res => {
            Swal.fire({
                icon: 'success',
                title: '儲存成功',
            })
        })
    }

    function customScoreChange(evt, attr) {
        setCustomScore(ps => ({
            ...ps,
            [attr]: evt.target.value
        }))
    }

    useEffect(() => {
        if (shouldRegisterUnloader) {
            window.onbeforeunload = () => 'Are you sure you want to leave?'
        } else {
            window.onbeforeunload = null
        }
    }, [shouldRegisterUnloader])

    return (
        <form>
            <div className="space-y-12 sm:space-y-16">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">(#ID:{customScore?.id}) {customScore?.name} 成績設定</h2>

                    <div
                        className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="name"
                                   className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                名稱
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={customScore?.name}
                                    onChange={e => customScoreChange(e, 'name')}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className={"sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"}>
                            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                佔比
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm sm:col-span-2 sm:mt-0  sm:max-w-xs">
                                <input
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    value={customScore?.weight}
                                    onChange={e => customScoreChange(e, 'weight')}
                                    className="block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="10"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    %
                                  </span>
                                </div>
                            </div>
                        </div>

                        <div className={"sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"}>
                            <label htmlFor="enabled" className="block text-sm font-medium leading-6 text-gray-900">
                                啟用
                            </label>
                            <div className="mt-2 rounded-md sm:col-span-2 sm:mt-0  sm:max-w-xs">
                                <Switch
                                    checked={customScore?.enabled}
                                    onChange={checked=>customScoreChange({target:{value: checked}}, 'enabled')}
                                    className={classNames(
                                        customScore?.enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                    )}
                                >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            customScore?.enabled ? 'translate-x-5' : 'translate-x-0',
                                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                        )}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            onClick={saveCustomScore}
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            儲存設定
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">(#ID:{customScore?.id}) {customScore?.name} 成績輸入</h2>

                    <div
                        className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        {course.students?.map((student, index) => (
                            <div key={student.id} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor={`${student.id}-score`}
                                       className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                    #{student.id} {student.name}
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <input
                                        type="number"
                                        onChange={e => changeScore(student.id, e)}
                                        name={`${student.id}-score`}
                                        id={`${student.id}-score`}
                                        value={userScores?.[student.id]}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            onClick={updateButtonClicked}
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            儲存成績
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
