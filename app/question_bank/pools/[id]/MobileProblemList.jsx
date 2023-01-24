import useSWR from "swr";
import Link from "next/link";
import {FolderIcon} from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ({pathname}) {
    const pool_id = pathname.split('/')[3]
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
                        `/question_bank/pools/${pool.id}` === pathname
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group rounded-md py-2 px-2 flex items-center text-base font-medium'
                    )}
                >
                    <FolderIcon
                        className={classNames(
                            `/question_bank/pools/${pool_id}/problems/${problem.id}` === pathname ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                    />
                    {problem.name}
                </Link>
            ))}
        </>
    )
}