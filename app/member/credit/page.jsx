"use client"
import {api, moment} from "@/app/utils";
import useUser from "@/app/useUser";
import useSWR from "swr";
import Instance from "@/app/utils/Instance";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {ArrowPathIcon} from "@heroicons/react/24/solid";

export default function Credit() {
    const {user} = useUser()
    const [credit, setCredit] = useState(1)

    const [config, setConfig] = useState(null)
    useEffect(() => {
        (async function () {
            const cfg = await import(`@/components/config/${process.env.NEXT_PUBLIC_APP_ID}.json`)
            setConfig(cfg)
        })()
    }, []);

    const {
        data: credits
    } = useSWR(`/credit`, async (url) => await api("GET", url, null).then(d => d))

    const {
        data: instances
    } = useSWR(`/instance`, async (url) => await api("GET", url, null).then(d => d))

    const placeOrder = () => {
        api('POST', '/payment/placeOrder', {
            type: 'credit',
            quantity: credit
        }).then(d => {
            document.querySelector("input[name='MerchantID']").value = d.MerchantID
            document.querySelector("input[name='TradeInfo']").value = d.TradeInfo
            document.querySelector("input[name='TradeSha']").value = d.TradeSha
            document.querySelector("input[name='Version']").value = d.Version
            document.querySelector("#hidden_payment").submit()
        })
    }

    const redeem = () => {
        api("POST", "/payment/redeem", {
            code: document.querySelector("#redeem_code").value
        }).then(d => {
            Swal.fire({
                title: '成功兌換',
                text: `兌換碼 ${d.code} 已成功兌換 ${d.quantity} 點數`,
            })
        })
    }

    return (
        <>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{config?.strings?.point}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        充值或加入課程可以獲得 {config?.strings?.point}
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">目前剩餘點數
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900">
                                    {!user ? (
                                        <div className={"animate-spin flex justify-center items-center"}>
                                            <ArrowPathIcon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                                        </div>
                                    ) : `$${user?.credit}`}
                                </div>
                                <button type="button"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    充值
                                </button>
                            </dd>
                        </div>

                        <div>
                            <label htmlFor="credit" className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                                立即充值（點數） 【{credit}點 = {Math.floor(credit)}元】
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="credit"
                                    id="credit"
                                    onChange={(e) => setCredit(e.target.value)}
                                    className="block w-full rounded-t-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="點數"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={placeOrder}
                                className="w-full rounded-b-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                立即充值
                            </button>
                            <form className={'hidden'}
                                  action={'https://ccore.newebpay.com/MPG/mpg_gateway'}
                                  id={'hidden_payment'}
                                  method={'post'}>
                                <input type={'hidden'} name={'MerchantID'}/>
                                <input type={'hidden'} name={'TradeInfo'}/>
                                <input type={'hidden'} name={'TradeSha'}/>
                                <input type={'hidden'} name={'Version'}/>
                            </form>
                        </div>

                        <div>
                            <label htmlFor="redeem_code"
                                   className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                                使用兌換卷
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="redeem_code"
                                    id="redeem_code"
                                    className="block w-full rounded-t-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="兌換卷"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={redeem}
                                className="w-full rounded-b-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                立即兌換
                            </button>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">靶機列表</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        目前正在運行的靶機
                    </p>


                    <div className={"grid grid-cols-2 mt-6 gap-2"}>
                        {!instances && (
                            <div className={"animate-spin col-span-2 flex justify-center items-center"}>
                                <ArrowPathIcon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                            </div>
                        )}
                        {
                            instances && Object.keys(instances).reduce((p, c) => [...p, ...instances[c]], [])?.map((instance, index) => (
                                <Instance instance={instance} key={index}/>
                            ))
                        }
                    </div>

                    <div className="flex border-t border-gray-100 mt-6 pt-2">
                        <button type="button"
                                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true">+</span> 建立靶機
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">點數紀錄</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        點數的使用與獲得紀錄
                    </p>

                    <ul role="list"
                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        {Array.isArray(credits) && credits.map((credit, index) => (
                            <li key={"credit_" + index} className="flex justify-between gap-x-6 py-6">
                                <div className="font-medium text-gray-900">
                                    {moment(credit.created_at).format("yyyy/MM/DD")}-{credit.description}
                                </div>
                                <div className="w-1/6 font-medium text-gray-900">
                                    {credit.amount <= 0 ? `使用 $${-credit.amount}` : `獲得 $${credit.amount}`}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex border-t border-gray-100 pt-6">
                        <button type="button"
                                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true">+</span> Add another bank
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
