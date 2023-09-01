"use client";

import {ServerStackIcon, TrashIcon} from "@heroicons/react/24/outline";
import {EyeIcon} from "@heroicons/react/20/solid";
import {api, moment} from "@/app/utils";
import Swal from "sweetalert2";

export default function Instance({instance}) {
    const remove = (instance_id) => {
        api("POST", `/instance/${instance_id}/delete`, {}).then(d => {
            Swal.fire({
                title: "已送出刪除請求",
                icon: "info"
            })
        })
    }

    return (
        <div className={`w-full flex items-stretch text-white`}>
            <div
                className={"bg-purple-600 w-4/5 rounded-l-md p-2 py-4 flex items-center gap-2"}>
                <ServerStackIcon className={"h-6 w-6"}/>
                <div>
                    <div>{instance?.deployed_id?.substring(0, 6)}</div>
                    <div>{instance?.ip}</div>
                    <div>{instance?.account}</div>
                    <div>{instance?.password}</div>
                    <div>{instance?.port}</div>
                    <div className={"text-sm"}>{moment(instance?.created_at).fromNow()}開機 | {moment(instance?.created_at).fromNow()}付款</div>
                </div>
            </div>
            <div className={"w-1/5 flex flex-col items-stretch"}>
                <button
                    onClick={() => remove(instance.id)}
                    className={"bg-purple-500 h-full w-full border-b rounded-tr-md hover:bg-purple-400 flex justify-center items-center"}>
                    <TrashIcon className={"h-5 w-5"}/>
                </button>
                <div
                    className={"bg-purple-500 w-full h-full rounded-br-md hover:bg-purple-400 flex justify-center items-center"}>
                    <EyeIcon className={"h-5 w-5"}/>
                </div>
            </div>
        </div>
    )
}