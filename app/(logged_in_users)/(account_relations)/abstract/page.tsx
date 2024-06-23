"use client"

import { useState } from "react"
import Progress from "@/components/progress";
import {Divider} from "antd";
import useSWR from "swr";
import {api} from "@/app/utils";

export default function AboutPage() {
    const [value, setValue] = useState(20)
    const {
        data: courses,
        isLoading
    } = useSWR('/course/attended', async (url) => await api('GET', url + "?with=teachers").then(data => data))

    return (
        <div className="flex flex-col items-center py-5">
            <div className="w-96 rounded-md bg-sky-200 px-2 py-1 flex flex-col space-y-8">
                <h1 className="text-xl">我的長照學習護照</h1>
                <div>
                    <p>總修得學分</p>
                    <div className="flex flex-row gap-3 items-center">
                        <span>{`${value}%`}</span>
                        <Progress value={value} />
                    </div>
                </div>
                <Divider/>
                <div>
                    <p>長照積分課程</p>
                    <div className="flex flex-row gap-3 items-center">
                        <span>{`${value}%`}</span>
                        <Progress value={value} />
                    </div>
                </div>
                <div>
                    <p>物理積分課程</p>
                    <div className="flex flex-row gap-3 items-center">
                        <span>{`${value}%`}</span>
                        <Progress value={value} />
                    </div>
                </div>
                <div>
                    <p>護理積分課程</p>
                    <div className="flex flex-row gap-3 items-center">
                        <span>{`${value}%`}</span>
                        <Progress value={value} />
                    </div>
                </div>

                <div>
                    <p>其他選修</p>

                    {courses && courses?.map((course, index) => (
                         course.name + " (" + course.learn_credit + ") "
                    )).join(", ")}
                </div>
            </div>
        </div>
    )
}
