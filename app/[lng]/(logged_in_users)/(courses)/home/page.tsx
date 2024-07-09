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
    if (loading) return <div>Loading...</div>

    return (
        <div className=" pb-20">
            <div className={"relative"}>
                <CarouselPage/>
            </div>

            <div className="px-4">
                <h2 className="py-2 text-xl">積分課程 第一大類</h2>
                <div className={"grid grid-cols-1 md:grid-cols-5 gap-6"}>
                    {courses?.map((item, cnt) => (
                        <div className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
                                        id={item.id}
                                        image={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item.image}
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
                                        id={item.id}
                                        image={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item.image}
                                        title={item.name}
                                        price={item.price}
                                        produced_by={item.produced_by}
                                        alt={item.title}
                                        hot={item.hot}
                                    />
                                }
                            </React.Fragment>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 mt-8">
                <h2 className="py-2 text-xl">積分課程 第二大類</h2>
                <div className={"grid grid-cols-1 md:grid-cols-5 gap-6"}>
                    {courses?.map((item, cnt) => (
                        <div className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
                                        id={item.id}
                                        image={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item.image}
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
                                        id={item.id}
                                        image={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item.image}
                                        title={item.name}
                                        price={item.price}
                                        produced_by={item.produced_by}
                                        alt={item.title}
                                        hot={item.hot}
                                    />
                                }
                            </React.Fragment>
                        </div>
                    ))}
                </div>
            </div>

            <Categories/>
            <Cooperation t={t}/>
        </div>
    )
}
