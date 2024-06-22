"use client"

import { useState } from "react"
import Progress from "@/components/progress";

export default function AboutPage() {
    const [value, setValue] = useState(20)
    return (
        <div className="flex flex-col items-center py-5">
            <div className="w-96 h-60 rounded-md bg-sky-200 px-2 py-1 flex flex-col space-y-8">
                <h1 className="text-xl">我的學習護照</h1>
                <div>
                    <p>總修得學分</p>
                    <div className="flex flex-row gap-3 items-center">
                        <span>{`${value}%`}</span>
                        <Progress value={value} />
                    </div>
                </div>
            </div>
        </div>
    )
}