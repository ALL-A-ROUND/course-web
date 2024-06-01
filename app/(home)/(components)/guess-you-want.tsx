
import { FoundingCourse, NormalCourse } from "@/components/course_card"
import demoImage from "@/public/temp/course-view.avif"
import { StaticImageData } from "next/image"
import React from "react"

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
    return (
        <div className="w-full pb-10">
            <div className="flex flex-row gap-3 items-center">
                <h2 className="text-xl">猜你想學</h2>
                <h2 className="text-sm text-gray-500">| 與你心電感應</h2>
            </div>

            <div className="grid grid-cols-4 py-5 gap-3">
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
            </div>
        </div>
    )
}