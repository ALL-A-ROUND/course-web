"use client"
import Link from "next/link";
import useSWR from "swr";
import $ from "jquery";

export default function Problem({problem, contest_id}) {
    const {
        data: status,
        isLoading
    } = useSWR(`/contest/${contest_id}/status`, async (url) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        })
        return res.json()
    })
    const description = (typeof window === "undefined" ? "" : $(`<div>${problem.description}</div>`).text().slice(0, 100))
    return (
        <>
            <Link href={`/problem/${problem.id}/contest/${contest_id}`} key={problem.id}>
                <div
                    className={`border border-gray-300 rounded-md p-4 shadow-md hover:bg-gray-200 cursor-pointer ${status?.[problem.id] === "AC" ? 'text-green-400' : 'text-red-500'}`}
                    style={{
                        "transition": ".4s"
                    }}
                >
                    <div className={"text-xl font-bold"}>(#{problem.id}) {problem.title}</div>
                    <div className={"text-gray-500 text-sm truncate"}>{description}</div>
                </div>
            </Link>
        </>
    )
}