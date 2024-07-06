"use client";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import {CreditCardIcon} from "@heroicons/react/24/outline";
import {api} from "@/app/[lng]/utils";

export default function BuyCourseWidget({course}) {
    const buy = () => {
        api('POST', '/payment/placeOrder', {
            type: 'course',
            course_id: course.id
        }).then(d => {
            document.querySelector("input[name='MerchantID']").value = d.MerchantID
            document.querySelector("input[name='TradeInfo']").value = d.TradeInfo
            document.querySelector("input[name='TradeSha']").value = d.TradeSha
            document.querySelector("input[name='Version']").value = d.Version
            document.querySelector("#hidden_payment").submit()
        })
    }

    const join = () => {
        api("POST", `/course/${course.id}/free_join`, null).then(() => {
            location.reload()
        })
    }

    return (
        <div className="rounded-md bg-orange-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    {course?.price === 0 ? (
                        <>
                            <p className="text-sm text-yellow-700">
                                心動了嗎？立即加入課程，開始學習吧！
                            </p>
                            <p className="mt-3 text-sm md:ml-6 md:mt-0">
                                <button onClick={join}
                                        className="bg-orange-200 p-2 rounded-md whitespace-nowrap font-medium text-yellow-700 hover:text-yellow-600">
                                    <CreditCardIcon className="h-5 w-5 inline-block" aria-hidden="true"/>
                                    免費加入課程
                                </button>
                            </p>
                        </>
                    ) : (<>
                            <p className="text-sm text-yellow-700">
                                心動了嗎？立即購買課程，開始學習吧！
                            </p>
                            <p className="mt-3 text-sm md:ml-6 md:mt-0">
                                {course?.price > 0 && (
                                    <button
                                        onClick={buy}
                                        className="bg-orange-200 p-2 rounded-md whitespace-nowrap font-medium text-yellow-700 hover:text-yellow-600">
                                        <CreditCardIcon className="h-5 w-5 inline-block" aria-hidden="true"/>
                                        NT${course?.price} &nbsp;
                                        立即購買
                                    </button>
                                )}
                            </p></>
                    )}
                </div>
            </div>

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
    )
}
