"use client"
import {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import {api} from "@/app/utils";
import useUser from "@/app/useUser";
import Link from "next/link";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import {Button, Form, Input} from "antd";
import {auth} from "@/lib/firebase/firebase";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Member() {
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
    const {user} = useUser()
    const [tgToken, setTgToken] = useState(null)
    const [lineToken, setLINEToken] = useState(null)
    const logout = () => {
        auth.signOut().then(r=>{
            location.reload()
        })
    }

    const generateTgToken = () => {
        api("POST", "/auth/link_telegram", null).then((res) => {
            setTgToken(res.token)
        })
    }

    const generateLINEToken = () => {
        api("POST", "/auth/link_telegram", null).then((res) => {
            setLINEToken(res.token)
        })
    }

    const join = (form) => {
        const code = form[0].value
        api('POST', '/organization/join', {
            invite_code: code
        }).then(res => {
            alert("加入成功")
            location.reload()
        }).catch(e => {
            alert("加入失敗 " + e)
        })
    }
    return (
        <>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <div className={"flex justify-between"}>
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">個人資料</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                有些資料會公開顯示
                            </p>
                        </div>
                        <div>
                            <a
                                href={"/member/general/edit"}
                                className="block rounded-md bg-yellow-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                            >
                                編輯
                            </a>
                        </div>
                    </div>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        {
                            !user && (
                                <div className="pt-6 flex justify-center">
                                    <div className="text-gray-900">
                                        <div className={"animate-spin"}>
                                            <ArrowPathIcon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">全名
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">{user?.name ?? (
                                    <span className={"text-red-400 font-bold"}>未設定</span>
                                )}</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                學生 ID
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div
                                    className="text-gray-900">{user?.id ? String(user?.id)?.padStart(5, "0") : ""}</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                電子郵件
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">{user?.email ?? (
                                    <span className={"text-red-400 font-bold"}>未設定</span>
                                )}</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                手機
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">{user?.phone ?? (
                                    <span className={"text-red-400 font-bold"}>未設定</span>
                                )}</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                Telegram
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">
                                    {user?.telegram_chat_id ?? "未連接"}
                                    {
                                        tgToken && (
                                            <div className={"border p-2 rounded flex flex-col"}>
                                                <Link href={"https://t.me/meowcodebot"} target={"_blank"}
                                                      className={"underline my-1"}>Telegram機器人</Link>
                                                <div className={"flex items-center gap-1"}>
                                                    請傳送 <div
                                                    className={"bg-gray-200 rounded-xl px-2 py-1"}>/start {tgToken}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="button"
                                        onClick={generateTgToken}
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    {user?.telegram_chat_id ? "重新連接" : "連接"}
                                </button>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                LINE Notify
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">
                                    {user?.line_notify_token ?? "未連接"}
                                    {
                                        lineToken && (
                                            <div className={"border p-2 rounded flex flex-col"}>
                                                <Link
                                                    href={`https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=rCwDOAOLbzYg17e8r2FJyK&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_API_ENDPOINT + "/line-notify/link")}&scope=notify&state=${lineToken}&response_mode=form_post`}
                                                    target={"_blank"} className={"underline my-1"}>LINE Notify 連接</Link>
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="button"
                                        onClick={generateLINEToken}
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    {user?.line_notify_token ? "重新連接" : "連接"}
                                </button>
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">登入相關</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">管理登入</p>

                    <ul role="list"
                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        {/*<li className="flex justify-between gap-x-6 py-6">*/}
                        {/*    <div className="font-medium text-gray-900">TD Canada Trust</div>*/}
                        {/*    <button type="button"*/}
                        {/*            className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                        {/*        Update*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                        <li className="flex justify-between gap-x-6 py-6">
                            <div className="flex items-center font-medium text-gray-900">
                                <DevicePhoneMobileIcon className="w-5 h-5 mr-2"/>
                                當前裝置
                            </div>
                            <button onClick={logout} type="button"
                                    className="font-semibold text-red-600 hover:text-red-500">
                                登出
                            </button>
                        </li>
                    </ul>

                    {/*<div className="flex border-t border-gray-100 pt-6">*/}
                    {/*    <button type="button"*/}
                    {/*            className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">*/}
                    {/*        <span aria-hidden="true">+</span> Add another bank*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>


                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">邀請碼</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">你如果有邀請碼就在這裡輸入</p>

                    <Form onSubmitCapture={e => join(e.target)}>
                        <Form.Item label={"邀請碼"}>
                            <Input type="text" className={"w-full"}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type={"primary"} htmlType={'submit'}>新增</Button>
                        </Form.Item>
                    </Form>
                </div>

                {/*<div>*/}
                {/*    <h2 className="text-base font-semibold leading-7 text-gray-900">Integrations</h2>*/}
                {/*    <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your*/}
                {/*        account.</p>*/}

                {/*    <ul role="list"*/}
                {/*        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">*/}
                {/*        <li className="flex justify-between gap-x-6 py-6">*/}
                {/*            <div className="font-medium text-gray-900">QuickBooks</div>*/}
                {/*            <button type="button"*/}
                {/*                    className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                {/*                Update*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*    </ul>*/}

                {/*    <div className="flex border-t border-gray-100 pt-6">*/}
                {/*        <button type="button"*/}
                {/*                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">*/}
                {/*            <span aria-hidden="true">+</span> Add another application*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <h2 className="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>*/}
                {/*    <p className="mt-1 text-sm leading-6 text-gray-500">*/}
                {/*        Choose what language and date format to use throughout your account.*/}
                {/*    </p>*/}

                {/*    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">*/}
                {/*        <div className="pt-6 sm:flex">*/}
                {/*            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>*/}
                {/*            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                {/*                <div className="text-gray-900">English</div>*/}
                {/*                <button type="button"*/}
                {/*                        className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                {/*                    Update*/}
                {/*                </button>*/}
                {/*            </dd>*/}
                {/*        </div>*/}
                {/*        <div className="pt-6 sm:flex">*/}
                {/*            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format*/}
                {/*            </dt>*/}
                {/*            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                {/*                <div className="text-gray-900">DD-MM-YYYY</div>*/}
                {/*                <button type="button"*/}
                {/*                        className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                {/*                    Update*/}
                {/*                </button>*/}
                {/*            </dd>*/}
                {/*        </div>*/}
                {/*        <Switch.Group as="div" className="flex pt-6">*/}
                {/*            <Switch.Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64"*/}
                {/*                          passive>*/}
                {/*                Automatic timezone*/}
                {/*            </Switch.Label>*/}
                {/*            <dd className="flex flex-auto items-center justify-end">*/}
                {/*                <Switch*/}
                {/*                    checked={automaticTimezoneEnabled}*/}
                {/*                    onChange={setAutomaticTimezoneEnabled}*/}
                {/*                    className={classNames(*/}
                {/*                        automaticTimezoneEnabled ? 'bg-indigo-600' : 'bg-gray-200',*/}
                {/*                        'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'*/}
                {/*                    )}*/}
                {/*                >*/}
                {/*                              <span*/}
                {/*                                  aria-hidden="true"*/}
                {/*                                  className={classNames(*/}
                {/*                                      automaticTimezoneEnabled ? 'translate-x-3.5' : 'translate-x-0',*/}
                {/*                                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'*/}
                {/*                                  )}*/}
                {/*                              />*/}
                {/*                </Switch>*/}
                {/*            </dd>*/}
                {/*        </Switch.Group>*/}
                {/*    </dl>*/}
                {/*</div>*/}
            </div>
        </>
    )
}
