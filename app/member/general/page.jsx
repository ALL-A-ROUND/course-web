"use client"
import {useState} from 'react'
import {Switch} from '@headlessui/react'
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import {api} from "@/app/utils";
import useUser from "@/app/useUser";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Member() {
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
    const user = useUser()
    const logout = () => {
        localStorage.removeItem('token')
        api("GET", "/user", null, {
            disableError: true,
            cache: "reload",
        }).then(() => {
            window.location.replace('/')
        });
    }
    return (
        <>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">個人資料</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        有些資料會公開顯示
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">全名
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">{user?.name ?? ""}</div>
                                <button type="button"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    更新
                                </button>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                電子郵件
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">{user?.email ?? ""}</div>
                                <button type="button"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    更新
                                </button>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                手機
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">{user?.phone ?? ""}</div>
                                <button type="button"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    更新
                                </button>
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Bank accounts</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">Connect bank accounts to your
                        account.</p>

                    <ul role="list"
                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <li className="flex justify-between gap-x-6 py-6">
                            <div className="font-medium text-gray-900">TD Canada Trust</div>
                            <button type="button"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Update
                            </button>
                        </li>
                        <li className="flex justify-between gap-x-6 py-6">
                            <div className="font-medium text-gray-900">Royal Bank of Canada</div>
                            <button type="button"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Update
                            </button>
                        </li>
                    </ul>

                    <div className="flex border-t border-gray-100 pt-6">
                        <button type="button"
                                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true">+</span> Add another bank
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">登入相關</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">管理登入</p>

                    <ul role="list"
                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <li className="flex justify-between gap-x-6 py-6">
                            <div className="font-medium text-gray-900">TD Canada Trust</div>
                            <button type="button"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Update
                            </button>
                        </li>
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

                    <div className="flex border-t border-gray-100 pt-6">
                        <button type="button"
                                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true">+</span> Add another bank
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your
                        account.</p>

                    <ul role="list"
                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <li className="flex justify-between gap-x-6 py-6">
                            <div className="font-medium text-gray-900">QuickBooks</div>
                            <button type="button"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Update
                            </button>
                        </li>
                    </ul>

                    <div className="flex border-t border-gray-100 pt-6">
                        <button type="button"
                                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true">+</span> Add another application
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        Choose what language and date format to use throughout your account.
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">English</div>
                                <button type="button"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Update
                                </button>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">DD-MM-YYYY</div>
                                <button type="button"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Update
                                </button>
                            </dd>
                        </div>
                        <Switch.Group as="div" className="flex pt-6">
                            <Switch.Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64"
                                          passive>
                                Automatic timezone
                            </Switch.Label>
                            <dd className="flex flex-auto items-center justify-end">
                                <Switch
                                    checked={automaticTimezoneEnabled}
                                    onChange={setAutomaticTimezoneEnabled}
                                    className={classNames(
                                        automaticTimezoneEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                                        'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    )}
                                >
                                              <span
                                                  aria-hidden="true"
                                                  className={classNames(
                                                      automaticTimezoneEnabled ? 'translate-x-3.5' : 'translate-x-0',
                                                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                                  )}
                                              />
                                </Switch>
                            </dd>
                        </Switch.Group>
                    </dl>
                </div>
            </div>
        </>
    )
}
