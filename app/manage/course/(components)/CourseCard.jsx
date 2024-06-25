import Link from "next/link";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";

export function CourseCard({item}) {
    return (
        <Link href={`/course/${item.id}`}>
            <div className="relative flex flex-col justify-between pb-3">
                <div>
                    <div className="relative overflow-hidden w-full rounded-md">
                        {/* @ts-ignore */}
                        <Image src={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + '/' + item.image}
                               alt={item.name}
                               width="256"
                               height="0"
                               className="w-full h-full rounded-md hover:scale-110 object-cover transition ease-in-out"
                        />
                    </div>
                    <div className="py-3">
                        <div className="flex flex-row gap-3">
                            <h2 className="bg-year-100 text-year-400 text-center py-0.5 rounded-md w-12 h-fit text-sm">課程</h2>
                            <h3 className="text-lg">{item.name}</h3>
                        </div>
                        <h4 className="py-1 text-gray-700">{`By ${item.teachers ? item.teachers?.map(u=>u.name).join(' ') : '暫無'}`}</h4>
                    </div>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <h2 className="text-xl ">{`NT$${item.price}`}</h2>
                </div>
                <div className={'text-md'}>
                    <Markdown>{item.introduction}</Markdown>
                </div>

                {item.hot &&
                    <div
                        className="bg-red-200 w-fit px-3 py-0.5 rounded-md text-red-600 absolute -bottom-8">熱門課程</div>}
            </div>
        </Link>
    )
}
