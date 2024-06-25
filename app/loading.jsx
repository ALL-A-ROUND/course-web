import {Spin} from "antd";
import React from "react";

export default function Loading() {
    return (
        <div className={"min-h-screen min-w-screen flex flex-col gap-4 justify-center items-center"}>
            <Spin size="large"/>
            <div className={"text-2xl font-bold"}>
                請稍候，正在努力載入中...
            </div>
        </div>
    )
}
