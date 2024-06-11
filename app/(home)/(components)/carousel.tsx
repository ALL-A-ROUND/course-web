"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import Image from "next/image"

import demoImage from "@/public/slide.png"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const carouselItems = [
    {
        id: 1,
        image: demoImage,
        alt: "image",
    }, {
        id: 2,
        image: demoImage,
        alt: "image",
    }, {
        id: 3,
        image: demoImage,
        alt: "image",
    },{
        id: 4,
        image: demoImage,
        alt: "image",
    },{
        id: 5,
        image: demoImage,
        alt: "image",
    },{
        id: 6,
        image: demoImage,
        alt: "image",
    },
]

export default function CarouselPage() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0)
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="w-full flex flex-col items-center px-5 pt-4">
            <Carousel
                opts={{
                    align: "center",
                    loop: true
                }}
                className="w-full relative"
                setApi={setApi}
            >
                <CarouselContent>
                    {carouselItems.map((item, cnt) => (
                        <CarouselItem className="md:basis-1/3 h-fit" key={item.id}>
                            <Image src={item.image}
                                alt={item.alt}
                                sizes="100vw"
                                className={cn("rounded-md", (cnt + 1) === current || "opacity-25")}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-5 h-12 w-12 bg-white" />
                <CarouselNext className="right-5 h-12 w-12 bg-white" />
            </Carousel>
        </div>
    )
}
