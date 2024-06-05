"use client"
import { FoundingCourse, NormalCourse } from "@/components/course_card"
import demoImage from "@/public/temp/course-view.avif"
import { StaticImageData } from "next/image"
import React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import useSWR from "swr";
import {api} from "@/app/utils";

type Data = {
    image: string | StaticImageData,
    title: string,
    price: number,
    produced_by: string,
    isFounding: false,
    id: string
    hot: boolean
} | {
    image: string | StaticImageData,
    title: string,
    price: number,
    original_price: number,
    produced_by: string,
    isFounding: true,
    progress: number,
    id: string,
    hot: boolean,
}

const data: Data[] = [
    {
        image: demoImage,
        title: "陳的故事行銷課 得下去的本事",
        price: 1000,
        produced_by: "陳大文",
        isFounding: false,
        id: "jwife",
        hot: true,
    }, {
        image: demoImage,
        title: "陳的故事行銷課 學得下去就能活得下去的本事",
        price: 1000,
        original_price: 2000,
        produced_by: "陳大文",
        isFounding: true,
        progress: 20,
        id: "sejkfi",
        hot: false
    }
]

export default function GuessYouWantPage() {
    const {
        data: courses,
        isLoading
    } = useSWR(`/course/recommend`, async (url) => await api("GET", `/course/recommend`, undefined).then(d => d))

    return (
        <div className="w-screen md:w-full pb-10 px-5">
            {/* <div className="flex flex-row gap-3 items-center">
                <h2 className="text-xl">猜你想學</h2>
                <h2 className="text-sm text-gray-500">| 與你心電感應</h2>
            </div> */}
            <div className="flex flex-row py-5 gap-3 items-center">
                <h2 className="text-xl font-semibold">最新募資課程</h2>
                <h2 className="text-gray-600">| 募資加入最優惠</h2>
            </div>
            <Carousel
                opts={{
                    align: "start"
                }}
                className="relative"
                // orientation="vertical"
            >
                <CarouselContent className="">
                    {courses?.map((item, cnt) => (
                        <CarouselItem className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
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
                                        image={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item.image}
                                        title={item.name}
                                        price={item.price}
                                        produced_by={item.produced_by}
                                        alt={item.title}
                                        hot={item.hot}
                                    />
                                }
                            </React.Fragment>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
            {/* <div className="grid grid-cols-4 py-5 gap-3 w-full bg-red-100">
                {data.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {item.isFounding ?
                            <FoundingCourse
                                image={item.image}
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
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                produced_by={item.produced_by}
                                alt={item.title}
                                hot={item.hot}
                            />
                        }
                    </React.Fragment>
                ))}
            </div> */}
        </div>
    )
}
