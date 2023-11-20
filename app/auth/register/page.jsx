"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";

export default function () {
    const [schoolName, setSchoolName] = useState('國立清華大學')
    const [departmentName, setDepartmentName] = useState('資訊工程學系')
    const form = useRef()
    const pathname = usePathname()
    const router = useRouter()
    const submit = (e) => {
        e.preventDefault()
        const form = e.target
        const body = JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,

            school: form.school?.value === "其他" ?
                form.school_custom.value :
                form.school.value,
            department: form.department?.value === "其他" ?
                form.department_custom.value :
                form.department.value,
            grade: form.grade.value,
            student_id: form.student_id.value,
            phone: form.phone.value,
        })
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + pathname, {
            method: "POST",
            body,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            localStorage.setItem("token", data.access_token)
            router.replace('/course')
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            router.replace('/')
        }
    })

    return (
        <div className="mt-6">
            <form action="" ref={form} onSubmit={submit} method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        姓名
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        電子郵件
                    </label>
                    <label className={"block text-xs text-gray-500"}>
                        將會驗證，請務必確保填寫可以收到驗證碼的電子郵箱，作為重要通知使用。
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        密碼
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className={"space-y-1"}>
                    <label htmlFor="school" className="block text-sm font-medium leading-6 text-gray-900">
                        學校
                    </label>
                    <select
                        id="school"
                        name="school"

                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                    >
                        <option>國立清華大學</option>
                        <option>國立陽明交通大學</option>
                        <option>國立成功大學</option>
                        <option>其他</option>
                    </select>
                </div>

                {
                    schoolName === "其他" && (
                        <div className="space-y-1">
                            <label htmlFor="school_custom" className="block text-sm font-medium text-gray-700">
                                學校名稱
                            </label>
                            <div className="mt-1">
                                <input
                                    id="school_custom"
                                    name="school_custom"
                                    type="text"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    )
                }

                <div className={"space-y-1"}>
                    <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                        科系
                    </label>
                    <select
                        id="department"
                        name="department"

                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                    >
                        <option>資訊工程學系</option>
                        <option>經濟學系</option>
                        <option>教育科學系</option>
                        <option>電機工程學系</option>
                        <option>計量財務金融系</option>
                        <option>工學院學士班</option>
                        <option>理學院學士班</option>
                        <option>科管院學士班</option>
                        <option>電資學院學士班</option>
                        <option>其他</option>
                    </select>
                </div>

                {
                    departmentName === "其他" && (
                        <div className="space-y-1">
                            <label htmlFor="department_custom" className="block text-sm font-medium text-gray-700">
                                科系名稱
                            </label>
                            <div className="mt-1">
                                <input
                                    id="department_custom"
                                    name="department_custom"
                                    type="text"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    )
                }


                <div className={"space-y-1"}>
                    <label htmlFor="grade" className="block text-sm font-medium leading-6 text-gray-900">
                        畢業年份
                    </label>
                    <select
                        id="grade"
                        name="grade"

                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
                        學號
                    </label>
                    <div className="mt-1">
                        <input
                            id="student_id"
                            name="student_id"
                            type="text"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        手機
                    </label>
                    <label className={"block text-xs text-gray-500"}>
                        將會驗證，請務必確保填寫可以收到簡訊驗證碼的手機，作為重要通知使用。
                    </label>
                    <div className="mt-1">
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/*<div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>*/}

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        註冊
                    </button>
                </div>
            </form>
        </div>
    )
}