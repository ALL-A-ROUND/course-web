"use client"
import CarouselPage from "./(components)/carousel"
import Categories from "./(components)/category-display"
import Cooperation from "./(components)/cooperation"
import useSWR from "swr";
import {api} from "@/app/[lng]/utils";
import React, {useEffect} from "react";
import {FoundingCourse, NormalCourse} from "@/components/course_card";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import {useTranslation} from "@/app/i18n";
import {Spin} from "antd";
import _ from "lodash";
import Image from "next/image";

export default async function HomePage({
                                           params: {lng}
                                       }) {
    const [firebaseUser, loading, error] = useAuthState(auth)
    const {
        data: courses,
        isLoading,
        mutate: revalidateCourses
    } = useSWR(`/course/all`, async (url) => await api("GET", `/course/all`, undefined).then(d => d))

    useEffect(() => {
        if (firebaseUser)
            revalidateCourses()
    }, [loading]);


    const {t} = await useTranslation(lng)
    if (loading) return <div>
        <Spin/>
    </div>

    return (
        <div className="pb-20 bg-black">
            <div className={"relative"}>
                <CarouselPage/>
            </div>


            <div className="px-4 pt-8 bg-black">
                <h2 className="my-8 text-3xl text-white">第一大類課程</h2>
                <div className={"grid grid-cols-1 md:grid-cols-4 gap-12"}>
                    {_.shuffle(courses)?.filter(k=>k.image.startsWith("http")).map((item, cnt) => (
                        <div className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.title}
                                        price={item.price}
                                        original_price={item.original_price}
                                        produced_by={item.produced_by}
                                        progress={100}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                    :
                                    <NormalCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.name}
                                        price={item.price}
                                        produced_by={item.produced_by}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                }
                            </React.Fragment>
                        </div>
                    ))}
                </div>
            </div>

            <div className={"w-full"}>
                <Image
                    src={'https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/hoomepage/S__289128458_0-MQPv90LJ5hH6sabg2zGt7C7svq0NuZ.jpg'}
                    alt={""} width="1000" height={"1000"} className={"w-full my-4"}/>
            </div>

            <div className="px-4 pt-8 bg-black">
                <h2 className="my-8 text-3xl text-white">第二大類課程</h2>
                <div className={"grid grid-cols-1 md:grid-cols-4 gap-12"}>
                    {courses?.reverse()?.filter(k=>k.image.startsWith("http"))?.map((item, cnt) => (
                        <div className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.title}
                                        price={item.price}
                                        original_price={item.original_price}
                                        produced_by={item.produced_by}
                                        progress={100}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                    :
                                    <NormalCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.name}
                                        price={item.price}
                                        produced_by={item.produced_by}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                }
                            </React.Fragment>
                        </div>
                    ))}
                </div>
            </div>
            <div className={"flex flex-col md:flex-row w-full"}>
                <Image
                    src={'https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/hoomepage/S__289128460_0-mjaqvVao2z6yBxEjIEfSoXXfzcGlUa.jpg'}
                    alt={""} width="1000" height={"1000"} className={"w-full"}/>

            </div>
            <div className="px-4 pt-8 bg-black">
                <h2 className="my-8 text-3xl text-white">本週新星</h2>
                <div className={"grid grid-cols-1 md:grid-cols-4 gap-12"}>
                    {_.shuffle(courses)?.filter(k=>k.image.startsWith("http"))?.sort(() => .5 - Math.random())?.slice(0, 4)?.map((item, cnt) => (
                        <div className=" basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.title}
                                        price={item.price}
                                        original_price={item.original_price}
                                        produced_by={item.produced_by}
                                        progress={100}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                    :
                                    <NormalCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.name}
                                        price={item.price}
                                        produced_by={item.produced_by}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                }
                            </React.Fragment>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 mt-8">
                <h2 className="my-8 text-3xl text-white">限時優惠</h2>
                <div className={"grid grid-cols-1 md:grid-cols-4 gap-12"}>
                    {_.shuffle(courses)?.filter(k=>k.image.startsWith("http"))?.slice(0, 4)?.map((item, cnt) => (
                        <div className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.title}
                                        price={item.price}
                                        original_price={item.original_price}
                                        produced_by={item.produced_by}
                                        progress={100}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                    :
                                    <NormalCourse
                                        id={item.id}
                                        image={item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image}
                                        title={item.name}
                                        price={item.price}
                                        produced_by={item.produced_by}
                                        alt={item.title}
                                        hot={item.hot}
                                        learn_credit={item.learn_credit}
                                    />
                                }
                            </React.Fragment>
                        </div>
                    ))}
                </div>
            </div>

            <Categories/>

            <div className={"flex flex-col md:flex-row w-full pt-3"}>
                <Image
                    src={'https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/hoomepage/S__289128461_0-GLyflImvVsVAzDtOyzlmbqiogGIhxq.jpg'}
                    alt={""} width="1000" height={"1000"} className={"w-full"}/>
            </div>

            <Cooperation t={t}/>
        </div>
    )
}
