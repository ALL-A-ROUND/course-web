"use client"

import React, {createRef, useEffect, useState} from "react"
import Progress from "@/components/progress";
import {Card, Divider, Spin} from "antd";
import useSWR from "swr";
import {api} from "@/app/[lng]/utils";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import {Carousel} from 'antd';
import {ArrowLeft, ArrowRight} from "lucide-react";
import dynamic from "next/dynamic";
import {CpuChipIcon} from "@heroicons/react/24/solid";

export default function AbstractPage() {
    const [value, setValue] = useState(0)
    const [firebaseUser, loading, error] = useAuthState(auth)
    const [componentLoading, setComponentLoading] = useState(true)
    const Credit = dynamic(() => import('@/app/[lng]/member/credit/page'), {
        ssr: false
    })

    const carouselRef = createRef();
    const {
        data: courses,
        isLoading,
        mutate: revalidateCourses
    } = useSWR('/course/attended', async (url) => await api('GET', url + "?with=teachers,category").then(data => data))

    const {
        data: user,
        isLoading: userLoading,
        mutate: revalidateUser
    } = useSWR('/user', async (url) => await api('GET', url).then(data => data))

    const {
        data: credits,
        mutate : revalidateCredits
    } = useSWR(`/credit`, async (url) => await api("GET", url, null).then(d => d))

    useEffect(() => {
        if (firebaseUser) {
            revalidateCourses()
            revalidateUser()
            revalidateCredits()
        }
    }, [loading]);

    if (loading || userLoading || isLoading) return <div
        className={"bg-black flex min-h-screen justify-center items-center"}>
        <Spin size="large"/>
    </div>

    return (
        <div   style={{
            height: '100%',
            maxHeight: 500
        }}>
            <Carousel arrows={true} infinite={true} ref={carouselRef}>
                <div className={"bg-black py-4 h-full"}>
                    <div className="flex flex-col items-center py-5 h-full">
                        <div className={"flex items-center"}>
                            <ArrowLeft className={"text-xs md:text-xl ml-2 text-white"} onClick={
                                () => carouselRef.current.prev()
                            }/>
                            <div
                                className="my-8 w-[66.6vw] h-[calc(66.6vw/16*9)] md:w-96 md:h-56 m-auto bg-gray-900 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                                <img className="w-24 h-8 absolute right-2 top-2"
                                     src="https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/lcvs-vD4r3nedQemx02FlqBNdykUvVaXa5h.png"/>
                                <img className="w-8 h-fit absolute right-2 bottom-1"
                                     src="https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/logo/logo-transparent-Mna7RMaOu7nAtk0TbfKGuOAbKy5lT2.png"/>

                                {/*<img className="w-8 h-8 absolute left-4 top-0.5"*/}
                                {/*     src="https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/chip-ypw2ZT3Y3uUN4QMoTfv3J2m6LREokP.png"/>*/}

                                <div className="w-full px-8 absolute top-4">
                                    <div className="flex justify-between pt-16">
                                        <div className="">
                                            <p className="font-light">

                                            </p>
                                            <p className="font-medium tracking-widest text-2xl ">
                                                Point card
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-light">
                                        </p>
                                        <p className="font-medium tracking-more-wider">
                                            {user?.name}的學習護照
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/*<PaymentCard*/}
                            {/*    issuerIcon={"https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/lcvs-vD4r3nedQemx02FlqBNdykUvVaXa5h.png"}*/}
                            {/*    backgroundPattern={"triangles"}*/}
                            {/*    background={"bg-gray-900"}*/}
                            {/*    date={moment().add('years', 3).format("MM/YY")}*/}
                            {/*    cvv={""}*/}
                            {/*    name={`${user?.name}的學習護照`}*/}
                            {/*    number={*/}
                            {/*        // md5(firebaseUser?.uid).slice(0, 4) + "-" + md5(firebaseUser?.uid).slice(4, 8) + "-" + md5(firebaseUser?.uid).slice(8, 12) + "-" + String(user?.id).padStart(4, '0')*/}
                            {/*        "Point Card"*/}
                            {/*    }*/}
                            {/*/>*/}
                            <ArrowRight className={"text-xs md:text-xl mr-2 text-white"}
                                        onClick={
                                            () => carouselRef.current.next()
                                        }
                            />

                        </div>
                        <div className="w-full rounded-t-xl bg-white px-4 py-2 flex flex-col space-y-8">
                            <h1 className="text-xl">我的長照學習護照</h1>
                            <div>
                                <p>已修畢總學分</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <span>{`${value}%`}</span>
                                    <Progress value={value}/>
                                </div>
                            </div>
                            <Divider/>
                            <div className={"flex flex-col md:flex-row gap-4 justify-center items-center"}>

                                <Card title="長照積分課程" style={{width: 300}}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <span>{`${value}%`}</span>
                                        <Progress value={value}/>

                                        {courses && courses?.filter(c => c.category && c.category.name === "長照積分課程")?.map((course, index) => (
                                            course.name + " (" + course.learn_credit + ") "
                                        )).join(", ")}
                                    </div>
                                </Card>

                                <Card title="物理積分課程" style={{width: 300}}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <span>{`${value}%`}</span>
                                        <Progress value={value}/>

                                        {courses && courses?.filter(c => c.category && c.category.name === "物理積分課程")?.map((course, index) => (
                                            course.name + " (" + course.learn_credit + ") "
                                        )).join(", ")}
                                    </div>
                                </Card>


                                <Card title="護理積分課程" style={{width: 300}}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <span>{`${value}%`}</span>
                                        <Progress value={value}/>

                                        {courses && courses?.filter(c => c.category && c.category.name === "護理積分課程")?.map((course, index) => (
                                            course.name + " (" + course.learn_credit + ") "
                                        )).join(", ")}
                                    </div>
                                </Card>

                            </div>

                            <div>
                                <p>其他選修</p>
                                {courses && courses?.map((course, index) => (
                                    course.name + " (" + course.learn_credit + ") "
                                )).join(", ")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"bg-black"}>
                    <div className="flex flex-col items-center py-5">
                        <div className={"flex items-center"}>
                            <ArrowLeft className={"text-xs md:text-xl ml-2 text-white"}
                                       onClick={
                                           () => carouselRef.current.prev()
                                       }
                            />
                            <div
                                className="my-8 w-[66.6vw] h-[calc(66.6vw/16*9)] md:w-96 md:h-56 m-auto bg-gray-900 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                                <img className="w-24 h-8 absolute right-2 top-2"
                                     src="https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/lcvs-vD4r3nedQemx02FlqBNdykUvVaXa5h.png"/>
                                <img className="w-8 h-8 absolute right-2 bottom-1"
                                     src="https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/logo/logo-transparent-Mna7RMaOu7nAtk0TbfKGuOAbKy5lT2.png"/>

                                {/*<img className="w-8 h-fit absolute left-4 top-0.5"*/}
                                {/*     src="https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/chip-ypw2ZT3Y3uUN4QMoTfv3J2m6LREokP.png"/>*/}

                                <div className="w-full px-8 absolute top-4">
                                    <div className="flex justify-between pt-16">
                                        <div className="">
                                            <p className="font-light">

                                            </p>
                                            <p className="font-medium tracking-widest text-2xl ">
                                                Point card
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-light">
                                        </p>
                                        <p className="font-medium tracking-more-wider">
                                            {user?.name}長照積分卡
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/*<PaymentCard*/}
                            {/*    issuerIcon={"https://rgauqyeosa62pbqv.public.blob.vercel-storage.com/lcvs-vD4r3nedQemx02FlqBNdykUvVaXa5h.png"}*/}
                            {/*    backgroundPattern={"triangles"}*/}
                            {/*    background={"gray"}*/}
                            {/*    date={moment().add('years', 3).format("MM/YY")}*/}
                            {/*    cvv={""}*/}
                            {/*    name={`${user?.name}的積分卡`}*/}
                            {/*    number={*/}
                            {/*        // md5(firebaseUser?.uid).slice(0, 4) + "-" + md5(firebaseUser?.uid).slice(4, 8) + "-" + md5(firebaseUser?.uid).slice(8, 12) + "-" + String(user?.id).padStart(4, '0')*/}
                            {/*        "Point Card"*/}
                            {/*    }*/}
                            {/*/>*/}
                            <ArrowRight className={"text-xs md:text-xl mr-2 text-white"}
                                        onClick={
                                            () => carouselRef.current.next()
                                        }
                            />
                        </div>
                        <div className="rounded-t-xl bg-white px-4 py-2 flex flex-col space-y-8">
                            <h1 className="text-xl">
                                我的積分卡
                            </h1>
                            <div className={"flex flex-col "}>
                                {
                                    credits &&
                                    <div className={"bg-green-400 rounded-md p-4 pb-8 text-white text-2xl w-2/3"}>
                                        累積 ${credits?.map(c => c.amount).reduce((a, b) => a + b, 0)} 積分
                                    </div>
                                }
                                <Credit/>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}
