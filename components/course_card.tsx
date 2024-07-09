import React from "react"
import Image, {StaticImageData} from "next/image"
import {cn} from "@/lib/utils"
import Link from "next/link";

export const FoundingCourse = (item: {
    id: string | number,
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
        <Link href={`/course_detail/${item.id}`}>
            <div className="relative flex flex-col justify-between pb-3">
                <div>
                    <div className="relative w-full rounded-md overflow-hidden flex justify-center">
                        <Image src={item.image}
                               alt={item.alt}
                               width="0"
                               height="0"
                               sizes="100vw"
                               className={cn("w-48 h-48 rounded-md hover:scale-110 object-cover transition ease-in-out")}
                        />
                    </div>
                    <div className="py-2">
                        <div className="flex flex-row gap-3">
                            <h2 className="bg-year-100 text-year-400 text-center py-0.5 rounded-md w-12 h-fit text-sm">課程</h2>
                            <p className="text-lg p-2 bg-yellow-500 rounded-md">{item.title}</p>
                        </div>
                        <h2 className="py-1 text-gray-700">{`By ${item.produced_by}`}</h2>
                    </div>
                    <div className="pb-3">
                        <div className="py-2">
                            <div className="flex flex-row justify-between">
                                <p className="text-year-500">倒數</p>
                                <p className="text-gray-400">{`${item.progress}%`}</p>
                            </div>
                            <div className="h-2 bg-year-300 rounded-full" style={{
                                width: `${Math.min(item.progress, 100)}%`
                            }}/>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <h2 className="text-xl ">{`NT$${item.price}`}</h2>
                            <h2 className="line-through text-gray-500">{`NT$${item.original_price}`}</h2>
                        </div>
                    </div>
                </div>
                {item.hot && <div className="bg-red-200 w-fit px-3 py-0.5 rounded-md text-red-600">熱門課程</div>}
            </div>
        </Link>
    )
}

export const NormalCourse = (item: {
    id: string | number,
    image: string | StaticImageData,
    title: string,
    price: number,
    produced_by: string,
    alt: string,
    hot: boolean,
}) => {
    return (
        <Link href={`/course_detail/${item.id}`}>
            <div className="relative flex flex-col justify-between pb-3">
                <div>
                    <div className="relative overflow-hidden w-full rounded-md flex justify-center">
                        {/* @ts-ignore */}
                        <Image src={item.image}
                               alt={item.title}
                               width="256"
                               height="0"
                               className="w- md:w-full md:h-48 h-full rounded-md hover:scale-110 object-cover transition ease-in-out"
                        />
                    </div>
                    <div className="py-3">
                        <div className="flex flex-col gap-3">
                            <h2 className="bg-year-100 text-year-400 text-center py-0.5 rounded-md w-12 h-fit text-sm">課程</h2>
                            <h3 className="text-lg md:h-12 h-16">{item.title}</h3>
                        </div>
                        {/*<h4 className="py-1 text-gray-700">{`By ${item.teachers}`}</h4>*/}
                    </div>
                </div>
                <div className="flex flex-row gap-3 items-center ">
                    <h2 className="text-xl bg-yellow-500 p-2 rounded-md">{`NT$${item.price}`}</h2>
                </div>
                {item.hot &&
                    <div
                        className="bg-red-200 w-fit px-3 py-0.5 rounded-md text-red-600 absolute -bottom-8">熱門課程</div>}
            </div>
        </Link>
    )
}
