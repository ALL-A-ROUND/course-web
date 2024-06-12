"use client"
import NavigationBar from "@/app/(home)/navigation-bar";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";

export default function NewCourse() {
    const [user, loading, error] = useAuthState(auth)
    const [currentStep, setCurrentStep] = useState(0)

    if (loading) return <div>Loading...</div>
    if (!user) return <div>請先登入</div>
    return (
        <div className={"p-4"}>
            <ProgressBar stepState={[currentStep, setCurrentStep]}/>

            <Base/>
        </div>
    )
}

import {CheckIcon} from '@heroicons/react/24/solid'
import {useRef, useState} from "react";

const steps = [
    {name: '開始', component: Base},
]

function ProgressBar({stepState: [currentStep, setCurrentStep]}) {
    return (
        <nav aria-label="Progress">
            <ol role="list"
                className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className="relative md:flex md:flex-1">
                        {stepIdx < currentStep ? (
                            <a href={step.href} className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                </span>
                            </a>
                        ) : stepIdx === currentStep ? (
                            <a href={step.href} className="flex items-center px-6 py-4 text-sm font-medium"
                               aria-current="step">
                <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{stepIdx + 1}</span>
                </span>
                                <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                            </a>
                        ) : (
                            <a href={step.href} className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">{stepIdx}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                </span>
                            </a>
                        )}

                        {stepIdx !== steps.length - 1 ? (
                            <>
                                {/* Arrow separator for lg screens and up */}
                                <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        viewBox="0 0 22 80"
                                        fill="none"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0 -2L20 40L0 82"
                                            vectorEffect="non-scaling-stroke"
                                            stroke="currentcolor"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

function Intro() {
    return (<div>
        歡迎加入 Hahow 好老師的行列
        跟著 Hahow 一步一步完成募資提案吧！
        接下來我們會一步步的開始編輯課程，主要的內容包含了

        課程標題 - 好的標題是成功的一半
        課程目標 - 哪些學生適合這堂課？
        預計單元 - 課程會涵蓋哪些內容？
        募資條件 - 課程的價格及人數門檻
        詳細內容 - 簡單的圖文介紹
        影片上傳 - 3 分鐘募資影片
        課程網址 - 使用專屬網址宣傳

        想了解更多開課攻略、影片教學、分潤規則等資訊，跟著《好老師手冊》的引導、搭配「審核標準」的說明，開始編輯提案吧！


        編輯中若有任何問題，都可以透過右下角的「客服系統」詢問

    </div>)
}

import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import {Button} from "@/components/ui/button";
import {api} from "@/app/utils";

function Base() {
    const ref = useRef()
    const upload = () => {
        const data = new FormData(ref.current)
        data.set('_method', 'PUT')
        api('POST', '/course', data).then(res => {
            alert(res.name + '開課成功')
            location.href = '/manage/course/own'
        }).catch(e => {
            alert('開課失敗')
            alert(e)
        })
    }


    return (
        <form ref={ref}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900 w-full text-center my-2">
                        開課就上 {process.env.NEXT_PUBLIC_APP_NAME}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        填完以下資料，就可以開始第一堂課囉！
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                課程名稱
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="長照觀念一把罩"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                                課程課號
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span
                                        className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                        {location.host}/
                                    </span>
                                    <input
                                        type="text"
                                        name="code"
                                        id="code"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="11210CS435101"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                價格
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span
                                        className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                        NT$
                                    </span>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="5000"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="introduction" className="block text-sm font-medium leading-6 text-gray-900">
                                課程介紹
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="introduction"
                                    name="introduction"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                寫下課程的簡短介紹，讓學生對課程有初步的了解。
                            </p>
                        </div>


                        <div className="col-span-full">
                            <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                課程圖片
                            </label>
                            <div
                                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="image"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>點擊此處上傳圖片</span>
                                            <input id="image" name="image" type="file" className="sr-only"/>
                                        </label>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">支援 PNG, JPG, 最大 10 MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    onClick={upload}
                    type="button"
                    className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                    立即開課
                </button>
            </div>
        </form>
    )
}
