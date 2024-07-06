"use client"
import {Fragment, useEffect, useState} from 'react'
import Editor from "@monaco-editor/react";
import {useRouter} from "next/navigation";

const MonacoCollabExt = require("@convergencelabs/monaco-collab-ext");
import {api, EchoAuth, generateEchoInstance} from "@/app/[lng]/utils";

const getLanguages = async (id, router) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/problem/${id}/languages`, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem("token")
            router.replace("/auth/login")
        }
    }

    return res.json()
}

export default function ({params: {problem_id, contest_id = null}}) {
    const [languages, setLanguages] = useState([])
    const [channel_id, setChannelId] = useState(null)
    const [language, setLanguage] = useState(null)

    const router = useRouter();
    const [editor, setEditor] = useState(null)
    const submitCode = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/problem/${problem_id}/submit`, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                language: language.id,
                code: editor.getValue(),
                contest_id
            })
        })

        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem("token")
                router.replace("/auth/login")
            }
        }

        res.json().then(res => {
            console.log(res)
            if (res.id)
                router.push('/submission/' + res.id)
        })
    }

    useEffect(() => {
        getLanguages(problem_id, router).then(res => {
            setLanguages(res)
            const lang = res[0]
            setLanguage(lang)
        })
    }, [router])

    useEffect(() => {
        if (editor === null) return;
        editor.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter], () => submitCode());
    }, [editor])

    useEffect(() => {
        if (editor === null) return;
        if (language === null) return;

        if (language?.pivot?.default_code === undefined) return;
        if (editor.getValue() !== "") return;

        editor.setValue(language?.pivot?.default_code ?? "");

        (async () => {
            let laravelEcho = generateEchoInstance();
            window.echoInstance = laravelEcho;

            const id = await api("POST", `/live-coding/${problem_id}/create`, {}).then(res => res.id)
            window.channel_id = id;
            const channel = laravelEcho.join(`live-coding.${id}`)
            setChannelId(id)
            window.echoChannel = channel;
            const contentManager = new MonacoCollabExt.EditorContentManager({
                editor: editor,
                onInsert(...args) {
                    channel.whisper('insert', args);
                    api("POST", `/live-coding/${problem_id}/active`, {}).then(r => r)
                },
                onReplace(...args) {
                    channel.whisper('insert', args);
                },
                onDelete(...args) {
                    channel.whisper('delete', args);
                }
            });
            channel.listenForWhisper('get_code', (s) => {
                channel.whisper('set_code', editor.getValue());
            });
            channel.listenForWhisper('insert', (e) => contentManager.insert(e[0], e[1]));
            channel.listenForWhisper('replace', (e) => contentManager.replace(e[0], e[1], e[2]));
            channel.listenForWhisper('delete', (e) => contentManager.delete(e[0], e[1]));

            window.addEventListener("beforeunload", () => {
                api("POST", `/live-coding/${id}/delete`, {}).then(r => r)
            })
        })()
    }, [editor, language])

    return (
        <>
            <div>
                <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
                    Coding Language
                </label>
                <select
                    id="language"
                    name="language"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="3"
                    onChange={(event) => {
                        const lang = languages.find(l => String(l.id) === event.target.value)
                        setLanguage(lang)
                        console.log(lang?.pivot?.default_code)
                        editor.setValue(lang?.pivot?.default_code ?? "")
                    }}
                >
                    {languages.length && languages?.map((language) => (
                        <option key={language.id} value={language.id}>{language.name}</option>
                    ))}
                </select>
            </div>

            <Editor
                className={"mt-4"}
                height="60vh"
                defaultLanguage="javascript"
                defaultValue=""
                onMount={(editor, monaco) => {
                    setEditor(editor)
                }}
            />
            <div className={"flex items-center gap-2 justify-end mt-4"}>
                {channel_id && <span>ID: {channel_id}</span>}

                <button
                    type="button"
                    onClick={submitCode}
                    className="rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
            </div>
        </>
    )
}
