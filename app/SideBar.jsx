import Link from "next/link";
import {classNames} from "@/app/utils";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon} from "@heroicons/react/24/outline";

export default function SideBar() {
    return (
        <div
            className="py-6 px-4 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6 bg-indigo-600 border border-gray-300 flex flex-col gap-2 mx-6 rounded-lg">
            <h2 className={"bg-indigo-500 text-white font-bold text-lg text-center py-1 flex justify-center rounded-xl items-center mb-2"}>我的首頁</h2>

            <Link href={"/problem"}
                  className={classNames(
                      false
                          ? 'bg-indigo-700 text-white'
                          : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                  )}>
                <PencilSquareIcon className={classNames(
                    false ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                    'h-6 w-6 shrink-0'
                )}/> 題目列表
            </Link>
            <Link href={"/contest"}
                  className={classNames(
                      false
                          ? 'bg-indigo-700 text-white'
                          : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                  )}>
                <ClipboardIcon className={classNames(
                    false ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                    'h-6 w-6 shrink-0'
                )}/> 公開競賽
            </Link>
        </div>
    )
}