"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {api} from "@/app/[lng]/utils";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Swal from "sweetalert2";
import Editor from "ckeditor5-custom-build";

export default function ({params}) {
    const router = useRouter();
    const [shouldOnBeforeUnload, setShouldOnBeforeUnload] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (shouldOnBeforeUnload) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = null
        }
    }, [shouldOnBeforeUnload])

    function submit() {
        api("POST", "/courses/" + params.course_id + "/threads", {
            name: title,
            content: content
        }).then(data => {
            Swal.fire({
                icon: 'success',
                title: '新增成功',
            }).then(() => {
                router.push(`/course/${params.course_id}/discuss/${data.id}`)
            })
        })
    }

    return (
        <div className={"bg-gray-100"}>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form className="space-y-6" method="POST">
                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">新增討論串</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    同學、老師及助教都可以在這裡回覆。
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                <div>
                                    <label htmlFor="name"
                                           className="block text-md font-medium text-gray-900">
                                        標題
                                    </label>
                                    <p className="text-sm text-gray-500">
                                        請輸入討論串的標題。
                                    </p>
                                    <div className="mt-2 space-y-4">
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={title}
                                                onChange={e => {
                                                    setTitle(e.target.value)
                                                    setShouldOnBeforeUnload(true)
                                                }}
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="標題"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={" rounded-md border-gray-300"}>
                                    <CKEditor
                                        editor={Editor}
                                        config={{
                                            removePlugins: ['Markdown'],
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setContent(data)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type={"button"}
                            onClick={submit}
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
