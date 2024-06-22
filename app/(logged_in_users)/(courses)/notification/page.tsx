"use client"

import { useState } from "react"
const dummy_messages = [
    {
        id: "asjfi",
        date: "2021-09-10",
        title: "新課程通知",
        message: "有個新課程已被加入您的帳號",
    },
    {
        id: "asjfe4ti",
        date: "2023-09-01",
        title: "新課程通知",
        message: "有個新課程已被加入您的帳號",
    },
    {
        id: "asjsdgrfi",
        date: "2024-05-01",
        title: "新課程通知",
        message: "有個新課程已被加入您的帳號",
    },
    {
        id: "asjfdsrgi",
        date: "2024-06-20",
        title: "新課程通知",
        message: "有個新課程已被加入您的帳號",
    }
]

export default function Notification() {
    const [message, setMessages] = useState(dummy_messages)

    return (
        <div className="px-3 py-5 flex flex-col w-full gap-5">
            {message.map(m => (
                <div key={m.id} className="flex flex-col bg-slate-100 rounded-md px-1 py-2">
                    <p>{m.date}</p>
                    <h1 className="font-semibold text-lg">{m.title}</h1>
                    <p>{m.message}</p>
                </div>
            ))}
        </div>
    )
}
