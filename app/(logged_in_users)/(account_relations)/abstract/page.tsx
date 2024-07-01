"use client"

import {useState} from "react"
import Progress from "@/components/progress";
import {Card, Divider} from "antd";
import useSWR from "swr";
import {api} from "@/app/utils";

export default function AboutPage() {
    const [value, setValue] = useState(0)
    const {
        data: courses,
        isLoading
    } = useSWR('/course/attended', async (url) => await api('GET', url + "?with=teachers,category").then(data => data))

    return (
        <div className="flex flex-col items-center py-5">
            <div className="rounded-md bg-sky-200 px-4 py-2 flex flex-col space-y-8">
                <h1 className="text-xl">我的長照學習護照</h1>
                <div>
                    <p>已修畢總學分</p>
                    <div className="flex flex-row gap-3 items-center">
                        <span>{`${value}%`}</span>
                        <Progress value={value}/>
                    </div>
                </div>
                <Divider/>
                <div className={"flex flex-col md:flex-row gap-4 justify-center items-center"}>

                    <Card title="長照積分課程" style={{width: 300}}>
                        <div className="flex flex-row gap-3 items-center">
                            <span>{`${value}%`}</span>
                            <Progress value={value}/>

                            {courses && courses?.filter(c => c.category && c.category.name === "長照積分課程")?.map((course, index) => (
                                course.name + " (" + course.learn_credit + ") "
                            )).join(", ")}
                        </div>
                    </Card>

                    <Card title="物理積分課程" style={{width: 300}}>
                        <div className="flex flex-row gap-3 items-center">
                            <span>{`${value}%`}</span>
                            <Progress value={value}/>

                            {courses && courses?.filter(c => c.category && c.category.name === "物理積分課程")?.map((course, index) => (
                                course.name + " (" + course.learn_credit + ") "
                            )).join(", ")}
                        </div>
                    </Card>


                    <Card title="護理積分課程" style={{width: 300}}>
                        <div className="flex flex-row gap-3 items-center">
                            <span>{`${value}%`}</span>
                            <Progress value={value}/>

                            {courses && courses?.filter(c => c.category && c.category.name === "護理積分課程")?.map((course, index) => (
                                course.name + " (" + course.learn_credit + ") "
                            )).join(", ")}
                        </div>
                    </Card>

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
