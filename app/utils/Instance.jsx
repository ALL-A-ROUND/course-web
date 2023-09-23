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

    const show = (instance) => {
        Swal.fire({
            title: "詳細資訊",
            html: `
ssh -J jump@dorm.infra.hsuan.app:100 ${
                instance.root_password ?
                    "root" :
                    instance?.template?.username ?? "user"
            }@host.docker.internal -p {instance.port}<br/>
jump@dorm.infra.hsuan.app's password: jump<br/>
${
                instance.root_password ?
                    "root" :
                    instance?.template?.username ?? "user"
            }@host.docker.internal's password: ${
                instance.root_password ? instance.root_password :
                    instance?.template?.password ?? "password"
            }<br/>`,
        })
    }

    return (
        <div className={`w-full flex items-stretch text-white`}>
            <div
                className={"bg-purple-600 w-4/5 rounded-l-md p-2 py-4 flex items-center gap-2"}>
                <ServerStackIcon className={"h-6 w-6"}/>
                <div>
                    <div>{instance?.deployed_id?.substring(0, 6)}</div>
                    <div>IP: {instance?.ip}</div>
                    {
                        instance?.root_password &&
                        <div>root: {instance?.root_password}</div>
                    }
                    <div>port: {instance?.port}</div>
                    <div className={"text-sm"}>{moment(instance?.created_at).fromNow()}開機{' '}|{' '}
                        {instance?.last_paid_at ? moment(instance?.last_paid_at).fromNow() + "付款" : "尚未付款"}</div>
                </div>
            </div>
            <div className={"w-1/5 flex flex-col items-stretch"}>
                <button
                    onClick={() => remove(instance.id)}
                    className={"bg-purple-500 h-full w-full border-b rounded-tr-md hover:bg-purple-400 flex justify-center items-center"}>
                    <TrashIcon className={"h-5 w-5"}/>
                </button>
                <button
                    onClick={() => show(instance)}
                    className={"bg-purple-500 w-full h-full rounded-br-md hover:bg-purple-400 flex justify-center items-center"}>
                    <EyeIcon className={"h-5 w-5"}/>
                </button>
            </div>
        </div>
    )
}