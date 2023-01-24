import useSWR from "swr";
import Link from "next/link";
import {DocumentIcon} from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ({pathname, params}) {
    const pool_id = params.pool_id
    const {
        data: problems,
        isLoading
    } = useSWR(`/question_bank/pools/${pool_id}/problems`, url => fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        }
    }).then(res => res.json()))
    return (
        <>
            {isLoading ?? '<span>載入中</span>'}
            {problems && problems.map((problem) => (
                <Link
                    key={problem.name}
                    href={`/question_bank/pools/${pool_id}/problems/${problem.id}`}
                    className={classNames(
                        pathname.startsWith(`/question_bank/pools/${pool_id}/problems/${problem.id}`) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                    )}
                >
                    <DocumentIcon
                        className={classNames(
                            pathname.startsWith(`/question_bank/pools/${pool_id}/problems/${problem.id}`) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                    />
                    {problem.title}
                </Link>
            ))}
            {problems && problems.length === 0 && <span className={"text-sm text-gray-500 px-2 py-2"}>目前沒有題目</span>}
        </>
    )
}