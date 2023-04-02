"use client"
import useSWR from "swr";
import Link from "next/link";
import {CheckCircleIcon, InformationCircleIcon} from '@heroicons/react/20/solid'

export default function ({params: {problem_id}}) {
    const {
        data: problem,
        isLoading
    } = useSWR(`/problem/${problem_id}`, async (url) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        })

        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem("token")
                router.replace("/auth/login")
            }
        }
        return res.json()
    })
    return (
        <>
            <div className="bg-white px-6 py-16 lg:px-8">
                <div className="mx-auto text-base leading-7 text-gray-700">
                    <p className="text-base font-semibold leading-7 text-indigo-600">Introducing</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {problem?.title}
                    </h1>
                    <p className="mt-6 text-xl leading-8">
                        {problem?.description}
                    </p>
                    <div className="mt-10 max-w-2xl">
                    </div>

                    <div className={"flex justify-end mt-16"}>
                        <Link
                            href={`/problem/${problem_id}/submit`}
                            type="button"
                            className="rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

