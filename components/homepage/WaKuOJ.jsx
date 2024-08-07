import Link from "next/link";
import {ComputerDesktopIcon} from "@heroicons/react/24/solid";
import '@/app/[lng]/globals.css'

const metrics = [
    {id: 1, stat: '650+', emphasis: '評測提交', rest: '均正常運行、正確評測'},
]

export default function Page() {
    return (
        <>
            {/* Hero section */}
            <div className="relative">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"/>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                        <div className="absolute inset-0">
                            <img
                                className="h-full w-full object-cover"
                                src="/learning.png"
                                alt="People working on laptops"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"/>
                        </div>
                        <div className="relative py-16 px-6 sm:py-24 lg:py-32 lg:px-8">
                            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                <span className="block text-white">打造未來的</span>
                                <span className="block text-indigo-200">程式教育環境</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                                首創程式教育平台，結合線上即時評測系統，提供學生優質的學習環境，讓家長輕鬆知悉學生的即時學習進度。
                            </p>
                            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                                <div
                                    className="space-y-4 sm:mx-auto">
                                    <Link
                                        href="/course"
                                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"
                                    >
                                        立即體驗
                                    </Link>
                                    {/*<a*/}
                                    {/*    href="/course"*/}
                                    {/*    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"*/}
                                    {/*>*/}
                                    {/*    Live demo*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alternating Feature Sections */}
            <div className="relative overflow-hidden pt-16 pb-32">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"/>
                <div className="relative">
                    <div
                        className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                        <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                            <div>
                                <div>
                                    <span
                                        className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600">
                                      <ComputerDesktopIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                        業界首創．全國第一
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-500">
                                        獨家技術測評學生能力
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href="/problem"
                                            className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                                        >
                                            立即體驗
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <blockquote>
                                    <div>
                                        <p className="text-base text-gray-500">
                                            &ldquo;自從用了喵課學院的 Online Judge 我整個都好了&rdquo;
                                        </p>
                                    </div>
                                    <footer className="mt-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-6 w-6 rounded-full"
                                                    src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="text-base font-medium text-gray-700">
                                                王小美，華清大學學生
                                            </div>
                                        </div>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                        <div className="mt-12 sm:mt-16 lg:mt-0">
                            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                                <img
                                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                    src="/showcase.png"
                                    alt="Inbox user interface"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="mt-24">*/}
                {/*    <div*/}
                {/*        className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">*/}
                {/*        <div*/}
                {/*            className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">*/}
                {/*            <div>*/}
                {/*                <div>*/}
                {/*    <span*/}
                {/*        className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600">*/}
                {/*      <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true"/>*/}
                {/*    </span>*/}
                {/*                </div>*/}
                {/*                <div className="mt-6">*/}
                {/*                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">*/}
                {/*                        Better understand your customers*/}
                {/*                    </h2>*/}
                {/*                    <p className="mt-4 text-lg text-gray-500">*/}
                {/*                        Semper curabitur ullamcorper posuere nunc sed. Ornare iaculis bibendum*/}
                {/*                        malesuada faucibus lacinia*/}
                {/*                        porttitor. Pulvinar laoreet sagittis viverra duis. In venenatis sem arcu*/}
                {/*                        pretium pharetra at.*/}
                {/*                        Lectus viverra dui tellus ornare pharetra.*/}
                {/*                    </p>*/}
                {/*                    <div className="mt-6">*/}
                {/*                        <a*/}
                {/*                            href="pages#"*/}
                {/*                            className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"*/}
                {/*                        >*/}
                {/*                            Get started*/}
                {/*                        </a>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">*/}
                {/*            <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">*/}
                {/*                <img*/}
                {/*                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"*/}
                {/*                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"*/}
                {/*                    alt="Customer profile user interface"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            {/* Gradient Feature Section */}
            {/*<div className="bg-gradient-to-r from-purple-800 to-indigo-700">*/}
            {/*    <div className="mx-auto max-w-4xl py-16 px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">*/}
            {/*        <h2 className="text-3xl font-bold tracking-tight text-white">Inbox support built for*/}
            {/*            efficiency</h2>*/}
            {/*        <p className="mt-4 max-w-3xl text-lg text-purple-200">*/}
            {/*            Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.*/}
            {/*            Blandit*/}
            {/*            aliquam sit nisl euismod mattis in.*/}
            {/*        </p>*/}
            {/*        <div*/}
            {/*            className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">*/}
            {/*            {features.map((feature) => (*/}
            {/*                <div key={feature.name}>*/}
            {/*                    <div>*/}
            {/*        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">*/}
            {/*          <feature.icon className="h-6 w-6 text-white" aria-hidden="true"/>*/}
            {/*        </span>*/}
            {/*                    </div>*/}
            {/*                    <div className="mt-6">*/}
            {/*                        <h3 className="text-lg font-medium text-white">{feature.name}</h3>*/}
            {/*                        <p className="mt-2 text-base text-purple-200">{feature.description}</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Stats section */}
            <div className="relative bg-gray-900">
                <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
                    <div className="h-full w-full xl:grid xl:grid-cols-2">
                        <div className="h-full xl:relative xl:col-start-2">
                            <img
                                className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                                alt="People working on laptops"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="mx-auto max-w-4xl px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
                    <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                        <h2 className="text-base font-semibold">
                <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  超越業界，評測專案
                </span>
                        </h2>
                        <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                            專案開發教學更簡單
                        </p>
                        <p className="mt-5 text-lg text-gray-300">
                            WaKuOJ 獨創評測專案技術，協助教師快速建立評測專案，並且提供多種評測方式，讓教師可以輕鬆建立評測專案。
                        </p>
                        <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                            {metrics.map((item) => (
                                <p key={item.id}>
                                    <span className="block text-2xl font-bold text-white">{item.stat}</span>
                                    <span className="mt-1 block text-base text-gray-300">
                      <span className="font-medium text-white">{item.emphasis}</span> {item.rest}
                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/*<Pricing/>*/}
            {/*<About/>*/}
            {/* CTA Section */}
            {/*<div className="bg-white">*/}
            {/*    <div*/}
            {/*        className="mx-auto max-w-4xl py-16 px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">*/}
            {/*        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">*/}
            {/*            <span className="block">Ready to get started?</span>*/}
            {/*            <span*/}
            {/*                className="-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent">*/}
            {/*    Get in touch or create an account.*/}
            {/*  </span>*/}
            {/*        </h2>*/}
            {/*        <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">*/}
            {/*            <a*/}
            {/*                href="pages#"*/}
            {/*                className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"*/}
            {/*            >*/}
            {/*                Learn more*/}
            {/*            </a>*/}
            {/*            <a*/}
            {/*                href="pages#"*/}
            {/*                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-3 text-base font-medium text-indigo-800 shadow-sm hover:bg-indigo-100"*/}
            {/*            >*/}
            {/*                Get started*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}
