import useSWR from "swr";
import Link from "next/link";
import {DocumentIcon, FolderIcon} from "@heroicons/react/24/outline";
import {api} from "@/app/[lng]/utils";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ({pathname}) {
    const {
        data: pools,
        isLoading
    } = useSWR('/question_bank/pools', url => api('GET', url))
    return (
        <>
            {isLoading &&
                <div
                    className={'animate-pulse text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium'}
                >
                    <FolderIcon
                        className={'text-gray-400 mr-3 flex-shrink-0 h-6 w-6'}
                    />
                    <div className={"h-6 rounded-md w-full bg-gray-200 animate-pulse"}></div>
                </div>
            }
            {pools && pools?.map((pool) => (
                <Link
                    key={pool.name}
                    href={`/question_bank/pools/${pool.id}/problems`}
                    className={classNames(
                        pathname.startsWith(`/question_bank/pools/${pool.id}`) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                    )}
                >
                    <FolderIcon
                        className={classNames(
                            pathname.startsWith(`/question_bank/pools/${pool.id}`) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                    />
                    {pool.name}
                </Link>
            ))}
        </>
    )
}
