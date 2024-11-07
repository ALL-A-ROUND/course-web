"use client"
import CarouselPage from "../(components)/carousel"
import Categories from "../(components)/category-display"
import Cooperation from "../(components)/cooperation"
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
            {/*<div className={"relative"}>*/}
            {/*    <CarouselPage/>*/}
            {/*</div>*/}


            <div className="px-4 pt-8 bg-black">
                <h2 className="my-8 text-3xl text-white">第一大類課程</h2>
                <div className={"grid grid-cols-1 md:grid-cols-4 gap-12"}>
                    {_.shuffle(courses)?.map((item, cnt) => (
                        <div className="md:basis-1/3 basis-full select-none cursor-pointer" key={item.id}>
                            <React.Fragment key={item.id}>
                                {item.isFounding ?
                                    <FoundingCourse
                                        id={item.id}
                                        image={item?.image ? (item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image) : "/public_assets/course.jpeg"}
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
                                        image={item?.image ? (item?.image?.startsWith('http') ? item?.image : process.env.NEXT_PUBLIC_ASSET_ENDPOINT + item?.image) : "/public_assets/course.jpeg"}
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


            <Cooperation t={t}/>
        </div>
    )
}
