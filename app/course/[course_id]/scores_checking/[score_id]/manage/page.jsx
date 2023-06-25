"use client"
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {api} from "@/app/utils";

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
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{customScore?.name}</h2>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                        佔比： {customScore?.weight}%
                    </p>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                        啟用： {customScore?.enable ? '是' : '否'}
                    </p>

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
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={updateButtonClicked}
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    更新
                </button>
            </div>
        </form>
    )
}
