"use client"
import React, {Fragment, useEffect, useState} from 'react'
import {
    Menu,
    Transition,
} from '@headlessui/react'
import {
    CalendarDaysIcon,
    EllipsisVerticalIcon,
    UserCircleIcon,
} from '@heroicons/react/20/solid'
import {Button, Collapse, Divider, Empty, Flex, Spin, List} from "antd";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import useSWR from "swr";
import {api} from "@/app/utils";
import Link from "next/link";
import {Skeleton} from 'antd';
import {Plus, Search} from "lucide-react";
import UnitForm from "@/app/manage/course/[course_id]/unit/new/page";
import LessonForm from "@/app/manage/course/[course_id]/unit/[unit_id]/lesson/new/page";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({
                                    params: {
                                        course_id
                                    }
                                }) {
    const [unitFormVisible, setUnitFormVisible] = useState(false)
    const showUnitForm = () => {
        setUnitFormVisible(true)
    }
    const [user, loading, error] = useAuthState(auth)
    const [units, setUnits] = useState([])
    const {
        data: course,
        isLoading: courseLoading
    } = useSWR(`/course/${course_id}`, async (url) => await api('GET', url + "?with=teachers").then(data => data))
    const {
        data: unitsData,
        isLoading: unitsLoading
    } = useSWR(`/course/${course_id}/units`, async (url) => await api('GET', url + "?with=teachers").then(data => data))

    useEffect(() => {
        if (unitsData) {
            const parsed = unitsData.map(unit => {
                return {
                    key: unit.id,
                    label: unit.name,
                    children: <div className={"flex flex-col"}>
                        <p>{unit.description}</p>
                        <List
                            size="large"
                            bordered
                            className={"my-3"}
                            dataSource={unit.lessons}
                            renderItem={(item) => <List.Item>
                                <Flex justify={"space-between"} className={"w-full"}>
                                    <span>
                                {item.title} - {item.article}
                                        </span>
                                    <Link href={`/manage/course/${course_id}/unit/${unit.id}/lesson/${item.id}/edit`}>
                                        <Button type="primary">編輯</Button>
                                    </Link>
                                </Flex>
                            </List.Item>}
                        />
                        <Divider/>
                        <LessonForm params={{
                            unit_id: unit?.id
                        }} />
                    </div>,
                }
            })
            setUnits(parsed)
        }
    }, [unitsLoading, unitsData]);

    if (
        loading || courseLoading || unitsLoading
    ) return <div className={"min-h-screen min-w-screen flex justify-center items-center"}>
        <Spin size="large"/>
    </div>
    if (!user) return <div>請先登入</div>

    return (
        <>
            <main>
                <header className="relative isolate pt-16">
                    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                        <div
                            className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                            <div
                                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                                style={{
                                    clipPath:
                                        'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                                }}
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5"/>
                    </div>

                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div
                            className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                            <div className="flex items-center gap-x-6">
                                <img
                                    src={process.env.NEXT_PUBLIC_ASSET_ENDPOINT + course?.image}
                                    alt=""
                                    className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                                />
                                <h1>
                                    <div className="text-sm leading-6 text-gray-500">
                                        課程 <span className="text-gray-700">{course?.code}</span>
                                    </div>
                                    <div className="mt-1 text-base font-semibold leading-6 text-gray-900">{course?.name}
                                    </div>
                                </h1>
                            </div>
                            <div className="flex items-center gap-x-4 sm:gap-x-6">
                                <Link href={`/manage/course/${course_id}/edit`}
                                      className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                                    編輯課程
                                </Link>
                                <Link
                                    href={`/course/${course_id}`}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    檢視課程
                                </Link>

                                <Menu as="div" className="relative sm:hidden">
                                    <Menu.Button className="-m-3 block p-3">
                                        <span className="sr-only">More</span>
                                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
                                    </Menu.Button>

                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                {({focus}) => (
                                                    <button
                                                        type="button"
                                                        className={classNames(
                                                            focus ? 'bg-gray-50' : '',
                                                            'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
                                                        )}
                                                    >
                                                        Copy URL
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({focus}) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            focus ? 'bg-gray-50' : '',
                                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                        )}
                                                    >
                                                        Edit
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Invoice summary */}

                        <div className="lg:col-start-3 lg:row-end-1">
                            <h2 className="sr-only">Summary</h2>
                            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                <dl className="flex flex-wrap">
                                    <div className="flex-auto pl-6 pt-6">
                                        <dt className="text-sm font-semibold leading-6 text-gray-900">價格</dt>
                                        <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">${course?.price}</dd>
                                    </div>
                                    <div className="flex-none self-end px-6 pt-4">
                                        <dt className="sr-only">Status</dt>
                                        <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                                            已開課
                                        </dd>
                                    </div>
                                    <div
                                        className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Client</span>
                                            <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd className="text-sm font-medium leading-6 text-gray-900">
                                            {course?.teachers.map(teacher => teacher.name).join(", ")}
                                        </dd>
                                    </div>
                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Due date</span>
                                            <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd className="text-sm leading-6 text-gray-500">
                                            <time dateTime="2023-01-31">
                                                {new Date(course?.created_at).toLocaleDateString()}
                                            </time>
                                        </dd>
                                    </div>
                                    {/*<div className="mt-4 flex w-full flex-none gap-x-4 px-6">*/}
                                    {/*    <dt className="flex-none">*/}
                                    {/*        <span className="sr-only">Status</span>*/}
                                    {/*        <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>*/}
                                    {/*    </dt>*/}
                                    {/*    <dd className="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>*/}
                                    {/*</div>*/}
                                </dl>
                                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                    {/*<a href="#" className="text-sm font-semibold leading-6 text-gray-900">*/}
                                    {/*    Download receipt <span aria-hidden="true">&rarr;</span>*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        </div>

                        {/* Invoice */}
                        <div
                            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                            <div className={"flex justify-end my-2"}>
                                <Button type="primary" icon={<Plus/>} onClick={showUnitForm}>
                                    新增單元
                                </Button>
                            </div>
                            {(!loading && !unitsLoading && unitsData && unitsData.length === 0) ? (<Empty/>) : (
                                <Collapse items={units} defaultActiveKey={['1']}/>
                            )}
                            <div className={"my-4"}>
                                {unitFormVisible && <UnitForm params={{
                                    course_id
                                }}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
