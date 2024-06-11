import Image from "next/image"
import Company from "@/public/temp/company.avif"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import LCVS from "@/public/logo/lcvs.png"

const companies = [
    {
        id: "jseif",
        name: "Company 1",
        image: LCVS,
    },
]

export default function Cooperation() {
    return (
        <>

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="flex flex-row gap-5 items-center px-4">
                        <h2 className="text-3xl">合作單位</h2>
                        <h2 className="text-gray-600">| 優良合作夥伴</h2>
                    </div>

                    <div className={"flex flex-row justify-between"}>

                        <div
                            className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <Image
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                src={LCVS}
                                alt="Transistor"
                                width={158}
                                height={48}
                            />
                        </div>
                        <div className="bg-slate-100 w-72 h-52 flex flex-col items-center px-3 gap-3">
                            <div className="h-16">
                            </div>
                            <div className="text-xl">
                                加入 {process.env.NEXT_PUBLIC_APP_NAME}創作者的行列
                            </div>
                            <div>
                                立即開課，讓你的知識變現
                            </div>
                            <div
                                className="bg-year-200 hover:bg-year-300 cursor-pointer text-white w-full text-center py-2 rounded-lg my-4">
                                我要開課
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/*<div className="md:h-80 h-[30rem] md:w-full w-screen">*/}

            {/*    <div className="flex md:flex-row flex-col gap-5 items-center">*/}
            {/*        <div className="flex flex-row py-8 gap-5 w-full">*/}
            {/*            <Carousel*/}
            {/*                opts={{*/}
            {/*                    align: "start"*/}
            {/*                }}*/}
            {/*                className="relative w-full px-3"*/}
            {/*            >*/}
            {/*                <CarouselContent className="w-full">*/}
            {/*                    {companies.map((company, cnt) => (*/}
            {/*                        <CarouselItem className="md:basis-1/5 basis-40 select-none cursor-pointer"*/}
            {/*                                      key={company.id}>*/}
            {/*                            <div className="relative w-32 h-28">*/}
            {/*                                <Image src={company.image.src}*/}
            {/*                                       alt={company.name}*/}
            {/*                                       width="0"*/}
            {/*                                       height="0"*/}
            {/*                                       sizes="100vw"*/}
            {/*                                       className="object-cover w-full h-full rounded-lg"*/}
            {/*                                />*/}
            {/*                            </div>*/}
            {/*                        </CarouselItem>*/}
            {/*                    ))}*/}
            {/*                </CarouselContent>*/}
            {/*            </Carousel>*/}
            {/*             {companies.map(company => (*/}
            {/*            <div key={company.id} className="w-60 h-32 border relative rounded-lg border-gray-500 flex items-center justify-center">*/}
            {/*                <div className="relative w-32 h-28">*/}
            {/*                    <Image src={company.image.src}*/}
            {/*                        alt={company.name}*/}
            {/*                        width="0"*/}
            {/*                        height="0"*/}
            {/*                        sizes="100vw"*/}
            {/*                        className="object-cover w-full h-full rounded-lg"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}
