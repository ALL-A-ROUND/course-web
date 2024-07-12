"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {type CarouselApi} from "@/components/ui/carousel"
import Image from "next/image"

import demoImage from "@/public/cover.jpeg"
import {useEffect, useState} from "react"
import {cn} from "@/lib/utils"

const carouselItems = [
    /*{
        id: 1,
        image: demoImage,
        alt: "image",
    }, {
        id: 2,
        image: demoImage,
        alt: "image",
    }, {
        id: 5,
        image: demoImage,
        alt: "image",
    },*/ {
        id: 6,
        image: 'https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/20220711%E9%95%B7%E7%85%A7%E6%95%B8%E4%BD%8D-Final4K%E5%A4%A7%E6%AA%94-B8kh7Bolsa4ndJaZ5L2C0fI8Z2PZGa.mov',
        type: 'video',
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
        <div className="w-full flex flex-col items-center">
            <Carousel
                opts={{
                    align: "center",
                    loop: true
                }}
                className="w-full relative md:flex md:justify-center"
                setApi={setApi}
            >
                <CarouselContent>
                    {carouselItems.map((item, cnt) => (
                        <CarouselItem className="" key={item.id}>
                            {item.type === 'video' && (
                                <video
                                    className={cn("object-crop w-full", (cnt + 1) === current || "opacity-25")}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src={item.image}
                                />
                            )}
                            {item.type !== 'video' && (
                                <Image src={item.image}
                                       alt={item.alt}
                                       sizes="100vw"
                                       className={cn("w-full", (cnt + 1) === current || "opacity-25")}
                                />
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/*<CarouselPrevious className="left-5 h-12 w-12 bg-white"/>*/}
                {/*<CarouselNext className="right-5 h-12 w-12 bg-white"/>*/}
            </Carousel>
        </div>
    )
}
