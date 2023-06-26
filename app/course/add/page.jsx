"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {api} from "@/app/utils";
import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon, Cog8ToothIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ({params}) {
    const router = useRouter();
    const [code, setCode] = useState("")
    const submit = (e) => {
        api('POST', '/course/' + params.course_id + '/join', {
            code
        }).then(data => {
            if ('message' in data) {
                Swal.fire({
                    icon: 'error',
                    title: data['message']
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '儲存成功',
                }).then(() => {
                    router.replace('/course')
                })
            }
        })
    }

    return (
        <div className={"bg-gray-100"}>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form className="space-y-6" onSubmit={submit} method="POST">
                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">加入課程</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    輸入課程邀請碼來加入課程
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="code"
                                               className="block text-sm font-medium text-gray-700">
                                            邀請碼
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="code"
                                                id="code"
                                                onChange={e => setCode(e.target.value)}
                                                value={code}
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="開課代碼"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={submit}
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
