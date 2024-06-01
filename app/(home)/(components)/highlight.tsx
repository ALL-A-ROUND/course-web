"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import demoImage from "@/public/temp/course-view.avif"

const top_picks = [
    {
        alt: "image",
        title: "職場必學的Excel技能",
        id: 1,
        image: demoImage,
        content: "Excel是職場上必備的技能，這堂課程將教你如何使用Excel，讓你的工作更有效率。",
    },
    {
        alt: "image",
        title: "職場必學的Excel技能",
        id: 1,
        image: demoImage,
        content: "Excel是職場上必備的技能，這堂課程將教你如何使用Excel，讓你的工作更有效率。",
    },
    {
        alt: "image",
        title: "職場必學的Excel技能",
        id: 1,
        image: demoImage,
        content: "Excel是職場上必備的技能，這堂課程將教你如何使用Excel，讓你的工作更有效率。",
    },
    {
        alt: "image",
        title: "職場必學的Excel技能",
        id: 1,
        image: demoImage,
        content: "Excel是職場上必備的技能，這堂課程將教你如何使用Excel，讓你的工作更有效率。",
    },
]

export default function Highlight() {
    return (
        <div className="w-full">
            <div className="flex flex-row space-x-3 items-center py-3">
                <h2 className="text-3xl">精選好課程</h2>
                <h2>| 館長真心推薦</h2>
            </div>
            <Carousel
                opts={{
                    align: "center"
                }}
                className="relative"
            >
                <CarouselContent className="h-[28rem]">
                    {top_picks.map((item, cnt) => (
                        <CarouselItem className="md:basis-1/3 select-none cursor-pointer relative" key={cnt}>
                            <div className="w-full group">
                                <div className="relative overflow-hidden rounded-md aspect-video bg-red-100">
                                    <Image src={demoImage}
                                        alt={item.alt}
                                        sizes="100vw"
                                        className="transition ease-in-out w-full h-full object-cover group-hover:scale-110"
                                    />
                                </div>
                                <div className="transition ease-in-out h-40 border rounded-md shadow-xl absolute w-[22rem] bg-white left-8 top-52 group-hover:left-4 group-hover:top-56">
                                    <div className="h-1/3 text-xl px-3 py-2">{item.title}</div>
                                    <hr className="bg-black h-0.5" />
                                    <div className="h-1/2 px-3 py-2 flex flex-row">
                                        <div className="w-32">

                                        </div>
                                        <div className="">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}