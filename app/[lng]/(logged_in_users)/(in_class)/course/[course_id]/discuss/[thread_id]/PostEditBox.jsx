"use client"
import {useState} from 'react'

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react'

import {api} from "@/app/[lng]/utils";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";

export default function PostEditBox({params, reply, ref}) {
    const [content, setContent] = useState('')
    const [editor, setEditor] = useState(null)
    const router = useRouter()

    function post() {
        api("POST", `/threads/${params.thread_id}/posts`, {
            content, reply_to: reply
        }).then(r => {
            Swal.fire({
                icon: 'success',
                title: '新增成功',
            }).then(() => {
                router.refresh()
                editor.setData('')
            })
        })
    }

    return (
        <div className="flex items-start space-x-4" ref={ref}>
            <div className="flex-shrink-0">
                <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
            </div>
            <div className="min-w-0 flex-1">
                <div>
                    <div className="border-b border-gray-200 focus-within:border-indigo-600">
                        <label htmlFor="comment" className="sr-only">
                            Add your comment
                        </label>
                        {reply !== null && <p>
                            正在回覆 ID:{reply}
                        </p>}
                        <div
                            className={"rounded-md border-gray-300  block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"}>
                            <CKEditor
                                editor={Editor}
                                config={{
                                    removePlugins: ['Markdown'],
                                }}
                                onReady={editor => {
                                    setEditor(editor)
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data)
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <div className="">
                            <button
                                onClick={post}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                貼文
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
