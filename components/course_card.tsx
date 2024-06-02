import React from "react"
import Image, { StaticImageData } from "next/image"
import { cn } from "@/lib/utils"

export const FoundingCourse = (item: {
    image: string | StaticImageData,
    title: string,
    price: number,
    original_price: number,
    produced_by: string,
    progress: number,
    alt: string,
    hot: boolean,
}) => {
    return (
        <div className="relative flex flex-col justify-between pb-3">
            <div>
                <div className="relative w-full rounded-md overflow-hidden">
                    <Image src={item.image}
                        alt={item.alt}
                        width="0"
                        height="0"
                        sizes="100vw"
                        className={cn("w-full h-full rounded-md hover:scale-110 object-cover transition ease-in-out")}
                    />
                </div>
                <div className="py-2">
                    <div className="flex flex-row gap-3">
                        <h2 className="bg-year-100 text-year-400 text-center py-0.5 rounded-md w-12 h-fit text-sm">課程</h2>
                        <p className="text-lg">{item.title}</p>
                    </div>
                    <h2 className="py-1 text-gray-700">{`By ${item.produced_by}`}</h2>
                </div>
                <div className="pb-3">
                    <div className="py-2">
                        <div className="flex flex-row justify-between">
                            <p className="text-year-500">募資倒數</p>
                            <p className="text-gray-400">{`${item.progress}%`}</p>
                        </div>
                        <div className="h-2 bg-year-300 rounded-full" style={{
                            width: `${Math.min(item.progress, 100)}%`
                        }} />
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <h2 className="text-xl ">{`NT$${item.price}`}</h2>
                        <h2 className="line-through text-gray-500">{`NT$${item.original_price}`}</h2>
                    </div>
                </div>
            </div>
            {item.hot && <div className="bg-red-200 w-fit px-3 py-0.5 rounded-md text-red-600">熱門課程</div>}
        </div>
    )
}

export const NormalCourse = (item: {
    image: string | StaticImageData,
    title: string,
    price: number,
    produced_by: string,
    alt: string,
    hot: boolean,
}) => {
    return (
        <div className="relative flex flex-col justify-between pb-3">
            <div>
                <div className="relative overflow-hidden w-full rounded-md">
                    <Image src={item.image}
                        alt={item.title}
                        className="w-full h-full rounded-md hover:scale-110 object-cover transition ease-in-out"
                    />
                </div>
                <div className="py-3">
                    <div className="flex flex-row gap-3">
                        <h2 className="bg-year-100 text-year-400 text-center py-0.5 rounded-md w-12 h-fit text-sm">課程</h2>
                        <h3 className="text-lg">{item.title}</h3>
                    </div>
                    <h4 className="py-1 text-gray-700">{`By ${item.produced_by}`}</h4>
                </div>
            </div>
            <div className="flex flex-row gap-3 items-center">
                <h2 className="text-xl ">{`NT$${item.price}`}</h2>
            </div>
            {item.hot && <div className="bg-red-200 w-fit px-3 py-0.5 rounded-md text-red-600 absolute -bottom-8">熱門課程</div>}
        </div>
    )
}