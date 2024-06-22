"use client"
import {fetcher} from "@/app/fetcher";
import useSWR from "swr";
import {Roboto_Mono} from "next/font/google";
import {useEffect, useState} from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import Editor from "ckeditor5-custom-build";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {api} from "@/app/utils";

const Mono = Roboto_Mono({subsets: ['latin']})

export default function ProblemEditableForm({
                                                type,
                                                setType,
                                                submit,
                                                pathname,
                                                problem,
                                                languages = null,
                                                setLanguages = null,
                                                testcases = null,
                                                setTestcases = null,
                                            }) {
    const [content, setContent] = useState('')
    const [editorInstance, setEditorInstance] = useState(null)
    const {
        data: lang,
        isLoading
    } = useSWR('/question_bank/supportLanguages', url => api('GET', url).then(d => d))

    if (languages === null) {
        [languages, setLanguages] = useState([{language: '16', time_limit: '1', memory_limit: '4096'}])
    }

    if (testcases === null) {
        [testcases, setTestcases] = useState([{input: null, output: null}])
    }

    const addLanguage = (e) => {
        e.preventDefault()
        setLanguages([...languages, {language: '16', time_limit: '1', memory_limit: '4096'}])
    }
    const delLanguage = (idx) => {
        const newLanguages = [...languages]
        newLanguages.splice(idx, 1)
        setLanguages(newLanguages)
    }

    const addSubtask = (e) => {
        e.preventDefault()
        setSubtasks([...subtasks, {}])
    }
    const delSubtask = (idx) => {
        const newLanguages = [...languages]
        newLanguages.splice(idx, 1)
        setSubtasks(newLanguages)
    }

    const changeSelect = (value, index) => {
        const newLanguages = [...languages]
        newLanguages[index].language = value
        setLanguages(newLanguages)
    }

    const changeTimeLimit = (value, index) => {
        const newLanguages = [...languages]
        newLanguages[index].time_limit = value
        setLanguages(newLanguages)
    }

    const changeMemoryLimit = (value, index) => {
        const newLanguages = [...languages]
        newLanguages[index].memory_limit = value
        setLanguages(newLanguages)
    }


    useEffect(() => {
        if (editorInstance && problem)
            editorInstance.setData(problem.description)
    }, [editorInstance, problem])

    return (
        <div className={"bg-gray-100"}>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form className="space-y-8 divide-y divide-gray-200" onSubmit={submit}>
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">題目</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    這些資訊將會顯示在題目頁面上。
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        題目標題
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            defaultValue={problem?.title ?? ''}
                                            className="block w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        題目說明
                                    </label>
                                    <div className="mt-1">
                                        <CKEditor
                                            editor={Editor}
                                            config={{
                                                removePlugins: ['Markdown'],
                                            }}
                                            onReady={editor => {
                                                setEditorInstance(editor)
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setContent(data)
                                            }}
                                        />
                                        <input type={'hidden'} name='description' value={content}/>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        題目類型
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="type"
                                            name="type"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            onChange={(e) => setType(e.target.value)}
                                            value={type}
                                            defaultValue="0"
                                        >
                                            <option value={"0"}>程式題</option>
                                            <option value={"1"}>填充題</option>
                                            <option value={"2"}>選擇題</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">題目設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    這些設定會影響題目的顯示方式。
                                </p>
                            </div>
                            <div className="mt-6">
                                <fieldset>
                                    <legend className="sr-only">是否公開</legend>
                                    <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                        是否公開
                                    </div>
                                    <p className="text-sm text-gray-500">公開的題目可以被一般學生練習</p>
                                    <div className="mt-4 space-y-4">
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="public"
                                                    name="public"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    defaultChecked={problem?.['public']}
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="public" className="font-medium text-gray-700">
                                                    公開
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Judge設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    跟評測有關的設定
                                </p>
                            </div>
                            <div className="mt-6 flex flex-col gap-2">
                                <fieldset>
                                    <legend className="sr-only">支援的語言</legend>
                                    <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                        支援的語言
                                    </div>
                                    <p className="text-sm text-gray-500">支援用什麼語言提交</p>
                                    {isLoading ? <div className="text-center">Loading...</div> : null}
                                    <div className="mt-4 space-y-4 flex flex-col">
                                        {languages?.map((l, i) => (
                                            <div className={"bg-gray-300 py-3 px-2 gap-2 rounded flex flex-col"}>
                                                <div className={"flex justify-between"}>
                                                    <span>#{i + 1}</span>
                                                    <div onClick={e => delLanguage(i)} className={"cursor-pointer"}>
                                                        <TrashIcon className={"h-6 w-6 text-red-500"}/>
                                                    </div>
                                                </div>
                                                <div className={"flex flex-col"}>
                                                    <label className={"text-sm"}>時間限制 (秒)：</label>
                                                    <input
                                                        type="text"
                                                        name="languages"
                                                        id={"languages_time_" + i}
                                                        value={l?.time_limit ?? '1'}
                                                        onChange={e => changeTimeLimit(e.target.value, i)}
                                                        placeholder={"Time Limit (秒)"}
                                                        max={15}
                                                        className="block w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className={"flex flex-col"}>
                                                    <label className={"text-sm"}>記憶體限制 (KB)：</label>
                                                    <input
                                                        type="text"
                                                        name="languages"
                                                        id={"languages_mem_" + i}
                                                        value={l?.memory_limit ?? '4096'}
                                                        onChange={e => changeMemoryLimit(e.target.value, i)}
                                                        placeholder={"Memory Limit (KB)"}
                                                        min={2048}
                                                        className="block w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <select className={`rounded-xl shadow-xl w-full ${Mono.className}`}
                                                        value={l.id} onChange={e => changeSelect(e.target.value, i)}>
                                                    {lang?.map((l) => (
                                                        <option key={l.id}
                                                                value={l.id}>
                                                            [{l.judge0_language_id === null ? "Docker" : "Judge0"}]
                                                            (ID:{String(l.id).length !== 2 ? ' ' + l.id : l.id}) {l.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                        <button
                                            onClick={addLanguage}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            新增語言
                                        </button>
                                    </div>
                                </fieldset>
                                <fieldset className={"border-t border-gray-500 pb-4"}>
                                    <legend className="sr-only">測試資料</legend>
                                    <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                        測試資料
                                    </div>
                                    <p className="text-sm text-gray-500">測試資料</p>
                                    {isLoading ? <div className="text-center">Loading...</div> : null}
                                    <div className="mt-4 space-y-4 flex flex-col">
                                        {testcases?.map((T, i) => (
                                            <div className={"bg-gray-300 py-3 px-2 gap-2 rounded flex flex-col"}>
                                                <div className={"flex justify-between"}>
                                                    <span>#{i + 1}</span>
                                                    <div onClick={e => delLanguage(i)} className={"cursor-pointer"}>
                                                        <TrashIcon className={"h-6 w-6 text-red-500"}/>
                                                    </div>
                                                </div>
                                                <div className={"flex flex-col"}>
                                                    <label className={"text-sm"}>輸入資料：</label>
                                                    <input
                                                        type="file"
                                                        name="testcases"
                                                        id={"testcases_in_" + i}
                                                        value={T?.input ?? null}
                                                        onChange={e => changeTimeLimit(e.target.value, i)}
                                                        className="block w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className={"flex flex-col"}>
                                                    <label className={"text-sm"}>輸出資料：</label>
                                                    <input
                                                        type="file"
                                                        name="testcases"
                                                        id={"testcases_output_" + i}
                                                        value={T?.output ?? null}
                                                        onChange={e => changeTimeLimit(e.target.value, i)}
                                                        className="block w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={addLanguage}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            新增測資
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
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
                    </div>
                </form>
            </div>
        </div>
    )
}