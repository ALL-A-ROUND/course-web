"use client"
import Swal from "sweetalert2";
import {useOnBeforeUnload} from "@/app/[lng]/hooks";
import {useEffect, useState} from "react";
import {api} from "@/app/[lng]/utils";
import Editor from "ckeditor5-custom-build";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {useRouter} from "next/navigation";

export default function BulletinBoard({course_id, post_id}) {
    const [onBeforeUnload, setOnBeforeUnload] = useOnBeforeUnload()

    let [post, setPost] = useState({
        title: '', content: '',
    })
    const [content, setContent] = useState('')
    const router = useRouter()

    const save = () => {
        if (post_id === 'new') {
            api('POST', '/courses/' + course_id + '/bulletins', {
                title: post.title,
                content: content,
            }).then(data => {
                setOnBeforeUnload(false)
                Swal.fire({
                    icon: 'success',
                    title: '儲存成功',
                }).then(() => {
                    router.push(`/course/${course_id}/bulletin/${data.id}`)
                })
            })
        } else {
            api('PATCH', '/courses/' + course_id + '/bulletins/' + post_id, {
                title: post.title,
                content: content,
            }).then(data => {
                setOnBeforeUnload(false)
                Swal.fire({
                    icon: 'success',
                    title: '更新成功',
                }).then(() => {
                    router.push(`/course/${course_id}/bulletin/${data.id}`)
                })
            })
        }
    }

    function editorOnLoad(editor) {
        if (post_id !== "new") {
            api('GET', '/courses/' + course_id + '/bulletins/' + post_id).then(data => {
                setPost(data)
                editor.setData(data.content)
            })
        }
    }


    return (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">公告資訊</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        公告資訊將顯示給學生
                    </p>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="title"
                                   className="block text-sm font-medium text-gray-700">
                                標題
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={post?.title}
                                    onChange={e => {
                                        setPost({...post, title: e.target.value})
                                        setOnBeforeUnload(true)
                                    }}
                                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="標題"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            內容
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <CKEditor
                                editor={Editor}
                                config={{
                                    removePlugins: ['Markdown'],
                                }}
                                onReady={editor => {
                                    editorOnLoad(editor)
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

            <div className="flex justify-end border-t pt-2 mt-4">
                <button
                    onClick={save}
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {post_id === "new" ? "新增公告" : "儲存變更"}
                </button>
            </div>
        </div>
    )
}
