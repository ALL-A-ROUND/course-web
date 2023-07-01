import {useOnBeforeUnload} from "@/app/hooks";
import {useEffect, useRef, useState} from "react";
import {api, moment} from "@/app/utils";
import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisVerticalIcon, EnvelopeIcon} from '@heroicons/react/20/solid'
import {classNames} from "@/app/utils";
import Swal from "sweetalert2";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";

function List({people, type, course_id}) {
    const [email, setEmail] = useState('')
    const diff = (person) => Math.abs(moment(person.last_seen_at).diff(new Date(), 'minutes'))
    const diffVal = (person) => moment(person.last_seen_at).fromNow()
    const invite = () => {
        api('POST', `/course/${course_id}/invite`, {email, type}).then(data => {
            Swal.fire({
                icon: 'success',
                title: '邀請成功',
            })
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: '邀請失敗',
                text: JSON.parse(e.message)?.message ?? '未知錯誤'
            })
        })
    }
    return (
        <div>
            <ul role="list" className="divide-y divide-gray-100">
                {people?.map((person) => (
                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                        <div className="flex gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt=""/>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <a href={person.href} className="hover:underline">
                                        {person.name}
                                    </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <a href={`https://gmail.com?to=${person.email}`}
                                       className="truncate hover:underline">
                                        {person.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-6">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                {diff(person) < 3 ? (
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500">上線中</p>
                                    </div>) : (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        <time dateTime={String(diff(person))}>{diffVal(person)}上線</time>
                                    </p>
                                )}
                            </div>
                            <Menu as="div" className="relative flex-none">
                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-50' : '',
                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    )}
                                                >
                                                    View profile<span className="sr-only">, {person.name}</span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-50' : '',
                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    )}
                                                >
                                                    刪除成員<span className="sr-only">, {person.name}</span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <label className="block text-xs font-medium leading-6 text-gray-900">
                    新增成員
                </label>
                <div className="relative mt-2 rounded-md shadow-sm flex">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                        className="block w-full rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="you@example.com"
                    />
                    <button
                        type="button"
                        onClick={invite}
                        className="inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <PaperAirplaneIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        </div>
    )
}


function StudentList({course}) {
    return (
        <List people={course.students} type="student" course_id={course?.id}/>
    )
}

function TeacherList({course}) {
    return (
        <List people={course.teachers} type="teacher" course_id={course?.id}/>
    )
}

async function getUsersList({course_id}) {
    return api('GET', '/course/' + course_id + '?with=students,teachers')
}

export default function RelatedUserEdit({params}) {
    const [courseInfo, setCourseInfo] = useState({
        students: [], teachers: []
    })

    useEffect(() => {
        getUsersList(params).then(course => setCourseInfo(course))
    }, [])

    return (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">用戶資訊</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        設定教師、助教、學生
                    </p>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                學生
                            </label>
                            <StudentList course={courseInfo}/>
                        </div>
                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                老師
                            </label>
                            <TeacherList course={courseInfo}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end border-t pt-2 mt-4">
                <button
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    儲存
                </button>
            </div>
        </div>
    )
}