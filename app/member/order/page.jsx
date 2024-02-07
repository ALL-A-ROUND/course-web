"use client"
import {api, moment} from "@/app/utils";
import useUser from "@/app/useUser";
import useSWR from "swr";
import Instance from "@/app/utils/Instance";
import {useRef, useState} from "react";
import Swal from "sweetalert2";


export default function Credit() {
    const {user} = useUser()

    const {
        data: orders
    } = useSWR(`/order`, async (url) => await api("GET", url, null, {
        revalidate: 1000
    }).then(d => d))

    const pay = (order_id) => {
        api('GET', `/order/${order_id}/payload`, null).then(d => {
            document.querySelector("input[name='MerchantID']").value = d.MerchantID
            document.querySelector("input[name='TradeInfo']").value = d.TradeInfo
            document.querySelector("input[name='TradeSha']").value = d.TradeSha
            document.querySelector("input[name='Version']").value = d.Version
            document.querySelector("#hidden_payment").submit()
        })
    }

    const makeStatus = (status) => {
        switch (status) {
            case "pending":
                return "待付款"
            case "paid":
                return "已付款"
            case "cancelled":
                return "已取消"
        }
    }

    const makeType = (type) => {
        switch (type) {
            case "credit":
                return "靶機點數"
        }
    }

    return (
        <>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">訂單</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        訂單列表
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        {Array.isArray(orders) && orders.map((order, order_idx) => (
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 flex flex-col">
                                    <div>
                                        【{makeType(order?.type)}】 {makeStatus(order?.status)}
                                    </div>
                                    <div>
                                        {order?.id}
                                    </div>
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div className="text-gray-900 flex flex-col">
                                        <span>${order?.amount}</span>
                                        <div>
                                            訂單時間 {moment(order?.created_at).format("YYYY-MM-DD HH:mm")}
                                        </div>
                                    </div>
                                    {order?.status === "pending" && (
                                        <button type="button"
                                                onClick={() => pay(order.id)}
                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            支付
                                        </button>
                                    )}
                                </dd>
                            </div>
                        ))}
                        <form className={'hidden'}
                              action={'https://ccore.newebpay.com/MPG/mpg_gateway'}
                              id={'hidden_payment'}
                              method={'post'}>
                            <input type={'hidden'} name={'MerchantID'}/>
                            <input type={'hidden'} name={'TradeInfo'}/>
                            <input type={'hidden'} name={'TradeSha'}/>
                            <input type={'hidden'} name={'Version'}/>
                        </form>
                    </dl>
                </div>
            </div>
        </>
    )
}
