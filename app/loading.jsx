import {ArrowPathIcon} from "@heroicons/react/24/solid";

export default function Loading() {
    return (
        <div className={"flex flex-col items-center justify-center min-h-screen"}>
            <ArrowPathIcon className={"w-12 h-12 animate-spin text-gray-400"}/>
            <div className={"text-2xl font-bold"}>請稍候，載入中....</div>
        </div>
    )
}