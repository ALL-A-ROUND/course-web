"use client"
import {FoundingCourse, NormalCourse} from "@/components/course_card"
import React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import useSWR from "swr";
import {api} from "@/app/[lng]/utils";
import {Spin} from "antd";

export default function AllCourse() {
    const {
        data: courses,
        isLoading
    } = useSWR(`/course/all`, async (url) => await api("GET", `/course/all`, undefined).then(d => d))

    if(
        isLoading
    ) return <Spin></Spin>

    return (
        <div className="w-screen md:w-full pb-10 px-5">
            <div className="flex flex-row py-5 gap-3 items-center">
                <h2 className="text-xl font-semibold">所有課程一覽</h2>
            </div>

            <div className={"grid grid-cols-1 md:grid-cols-5 gap-6"}>
                {courses?.map((item, cnt) => (
                    <div className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                        <React.Fragment key={item.id}>
                            {item.isFounding ?
                                <FoundingCourse
                                    id={item.id}
                                    image={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item.image}
                                    title={item.title}
                                    price={item.price}
                                    original_price={item.original_price}
                                    produced_by={item.produced_by}
                                    progress={100}
                                    alt={item.title}
                                    hot={item.hot}
                                />
                                :
                                <NormalCourse
                                    id={item.id}
                                    image={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item.image}
                                    title={item.name}
                                    price={item.price}
                                    produced_by={item.produced_by}
                                    alt={item.title}
                                    hot={item.hot}
                                />
                            }
                        </React.Fragment>
                    </div>
                ))}

            </div>
        </div>
    )
}
