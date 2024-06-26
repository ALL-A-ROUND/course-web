"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import demoImage from "@/public/temp/course-view.avif"
import { FoundingCourse } from "@/components/course_card"

const carouselItems = [
    {
        id: 1,
        image: demoImage,
        title: "陳的故事行銷課 學得下去就能活得下去的本事",
        alt: "image",
        progress: 1003,
        price: 1000,
        original_price: 2000,
        produced_by: "陳大文",
        hot: true,
    }, {
        title: "陳的故事行銷課 學得下去就能活得下去的本事",
        id: 2,
        image: demoImage,
        alt: "image",
        progress: 720,
        price: 1000,
        original_price: 2000,
        produced_by: "陳大文",
        hot: true
    }, {
        title: "陳的故事行銷課 學得下去就能活得下去的本事",
        id: 3,
        image: demoImage,
        alt: "image",
        progress: 20,
        price: 1000,
        original_price: 2000,
        produced_by: "陳大文",
        hot: false
    }, {
        title: "陳的故事行銷課 學得下去就能活得下去的本事",
        id: 4,
        image: demoImage,
        alt: "image",
        progress: 325,
        price: 1000,
        original_price: 2000,
        produced_by: "陳大文",
        hot: false
    }, {
        title: "陳的故事行銷課 學得下去就能活得下去的本事",
        id: 5,
        image: demoImage,
        alt: "image",
        progress: 68,
        price: 1000,
        original_price: 2000,
        produced_by: "陳大文",
        hot: false
    }, {
        title: "陳的故事行銷課 學得下去就能活得下去的本事",
        id: 6,
        image: demoImage,
        alt: "image",
        progress: 37,
        price: 1000,
        original_price: 2000,
        produced_by: "陳大文",
        hot: false
    },
]

export default function FoundingSection() {
    return (
        <div className="w-screen md:w-full px-5">
            <div className="pt-10 " />
            <div className="flex flex-row py-5 gap-3 items-center">
                <h2 className="text-xl font-semibold">最新課程</h2>
                <h2 className="text-gray-600">| 加入最優惠</h2>
            </div>
            <Carousel
                opts={{
                    align: "start"
                }}
                className="relative"
            >
                <CarouselContent className="">
                    {carouselItems.map((item, cnt) => (
                        <CarouselItem className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <FoundingCourse {...item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
