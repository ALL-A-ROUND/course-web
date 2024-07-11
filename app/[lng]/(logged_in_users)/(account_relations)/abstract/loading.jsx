import {Spin} from "antd";

export default function Loading() {
    return (<div className={"flex flex-col items-center justify-center h-screen"}>
        <Spin size="large"/>
    </div>)
}
