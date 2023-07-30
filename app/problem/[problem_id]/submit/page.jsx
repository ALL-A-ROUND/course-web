"use client"
import {Fragment, useEffect, useRef, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import Editor, {DiffEditor, useMonaco, loader} from "@monaco-editor/react";
import Link from "next/link";
import useSWR from "swr";
import {useRouter} from "next/navigation";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

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

        editor.setValue(language?.pivot?.default_code ?? "")
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
            <div className={"flex items-center gap-2 justify-end mt-2"}>
                {/*<div className={"flex items-center gap-1"}>
                    <div className={"border border-gray-300 rounded-md bg-gray-200 px-2"}>&#8984;</div>
                    <span>+</span>
                    <div className={"border border-gray-300 rounded-md bg-gray-200 px-2"}>&#9166;</div>
                </div>*/}
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