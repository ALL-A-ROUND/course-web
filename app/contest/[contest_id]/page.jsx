import Link from "next/link";
import {fetcher} from "@/app/fetcher";
import {moment} from "@/app/utils";
import Problem from "@/app/contest/[contest_id]/Problem";

export default async function Example({params}) {
    const contest = await fetcher(`/contest/${params.contest_id}`);
    return (
        <>
            <div className={"flex gap-2"}>
                <Link className={"text-blue-700"} href={"/course"}>競賽</Link>
                / {contest.name} ({moment(contest.start_time).fromNow()}~{moment(contest.end_time).fromNow()})
            </div>
            <div className={"flex gap-4"}>
                <div className={"flex flex-col w-1/2"}>
                    <div className={"border-b border-dotted border-gray-300 font-bold"}>公告</div>
                    <div className={"text-gray-500 text-sm"}>沒有最近事件</div>
                </div>
                <div className={"flex flex-col w-1/2"}>
                    <div className={"border-b border-dotted border-gray-300 font-bold"}>問題</div>
                    <div className={"text-gray-500 text-sm"}>沒有最近事件</div>
                </div>
            </div>
            <div className={"flex flex-col gap-4"}>
                <div className={"border-b border-dotted border-gray-300 text-xl"}>題目列表</div>
                <div className={"grid grid-cols-2 gap-4"}>
                    {
                        contest.problems.map((problem) => (
                            <Problem contest_id={contest.id} problem={problem} key={problem.id}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
