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

const carouselItems:any = [

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
                        <CarouselItem className="md:basis-1/3 basis-full select-none cursor-pointer" key={item?.id}>
                            {/*<FoundingCourse {...item} />*/}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
