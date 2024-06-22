"use client"

import { useState } from "react"
const dummy_messages = [
    {
        id: "asjfi",
        date: "2021-09-10",
        title: "New Course",
        message: "New course has been added to your account",
    },
    {
        id: "asjfe4ti",
        date: "2023-09-01",
        title: "New Course",
        message: "New course has been added to your account",
    },
    {
        id: "asjsdgrfi",
        date: "2024-05-01",
        title: "New Course",
        message: "New course has been added to your account",
    },
    {
        id: "asjfdsrgi",
        date: "2024-06-20",
        title: "New Course",
        message: "New course has been added to your account",
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