"use client"
import {Fragment, useEffect, useState} from 'react'
import Editor from "@monaco-editor/react";
import {useRouter} from "next/navigation";
const MonacoCollabExt = require("@convergencelabs/monaco-collab-ext");
import {api, generateEchoInstance} from "@/app/[lng]/utils";

export default function ({ params: {channel_id} }) {
    const router = useRouter();
    const [editor, setEditor] = useState(null)

    useEffect(() => {
        if (editor === null) return;
        if (editor.getValue() !== "") return;

        (async () => {
            let laravelEcho = generateEchoInstance();
            window.echoInstance = laravelEcho;
            const channel = laravelEcho.join(`live-coding.${channel_id}`)
            window.echoChannel = channel;
            const contentManager = new MonacoCollabExt.EditorContentManager({
                editor: editor,
                onInsert(index, text) {
                    channel.whisper('insert', [index, text]);
                },
                onReplace(index, length, text) {
                    channel.whisper('replace', [index, length, text]);
                },
                onDelete(index, length) {
                    channel.whisper('delete', [index, length]);
                }
            });
            channel.listenForWhisper('set_code', (s)=>editor.setValue(s));
            channel.listenForWhisper('insert', (e)=>contentManager.insert(e[0], e[1]));
            channel.listenForWhisper('replace', (e)=>contentManager.replace(e[0], e[1], e[2]));
            channel.listenForWhisper('delete', (e)=>contentManager.delete(e[0], e[1]));
            setTimeout(()=>{
                channel.whisper('get_code', "");
            }, 1000)
        })()
    }, [editor])

    return (
        <>
            <Editor
                className={"mt-4"}
                height="60vh"
                defaultLanguage="javascript"
                defaultValue=""
                onMount={(editor, monaco) => {
                    setEditor(editor)
                }}
            />
        </>
    )
}
