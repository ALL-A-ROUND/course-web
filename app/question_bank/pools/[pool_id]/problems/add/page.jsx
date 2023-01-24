"use client"
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";

export default function ({params}) {
    const router = useRouter()
    const [type, setType] = useState('0')
    const pathname = usePathname()
    const submit = (e) => {
        e.preventDefault()
        const pool_id = params.pool_id
        const form = e.target
        const data = new FormData(form)
        const body = JSON.stringify({
            title: data.get('title'),
            description: data.get('description'),
            type,
            public: data.get('public') === 'on',
        })
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/question_bank/pools/' + pool_id + '/problems', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body
        }).then(res => res.json()).then(data => {
            router.replace('/question_bank/pools/' + pool_id + '/problems')
        })
    }
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
                                            className="block w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        題目說明
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            defaultValue={''}
                                        />
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
                                            <option value={"2"}>單選題</option>
                                            <option value={"3"}>多選題</option>
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
