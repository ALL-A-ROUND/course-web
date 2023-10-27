"use client";
import useUser from "@/app/useUser";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {api} from "@/app/utils";

export default function SettingsForm() {
    const user = useUser()
    const [schoolName, setSchoolName] = useState("國立清華大學")
    const [departmentName, setDepartmentName] = useState("資訊工程學系")
    const [avatar, setAvatar] = useState("")
    const router = useRouter()
    const submit = (e) => {
        e.preventDefault()
        const form = e.target
        const body = new FormData(form)
        body.set("school", form.school?.value === "其他" ?
            form.school_custom.value :
            form.school.value)
        body.set("department", form.department?.value === "其他" ?
            form.department_custom.value :
            form.department.value)
        api("POST", "/user", body).then(() => {
            router.replace('/member/general')
        })
    }

    const changeImage = e => {
        setAvatar(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        if (user) {
            if (user?.school in ["國立清華大學", "國立陽明交通大學", "國立成功大學"]) {
                setSchoolName(user?.school)
            } else {
                setSchoolName("其他")
            }

            if (user?.department in ["資訊工程學系", "經濟學系", "教育科學系", "電機工程學系", "計量財務金融系", "工學院學士班", "理學院學士班", "科管院學士班", "電資學院學士班"]) {
                setDepartmentName(user?.department)
            } else {
                setDepartmentName("其他")
            }

            if (user?.avatar)
                setAvatar(`${process.env.NEXT_PUBLIC_ASSET_ENDPOINT}/avatars/${user?.avatar}`)
            else
                setAvatar(`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.name}`)
        }
    }, [user]);
    return (
        <main>
            <div className="divide-y divide-white/5">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4  sm:px-6 md:grid-cols-3 lg:px-8">
                    <form className="md:col-span-2" onSubmit={submit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full flex items-center gap-x-8">
                                <img
                                    src={avatar}
                                    alt=""
                                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                />
                                <div>
                                    <label
                                        className="cursor-pointer block rounded-md border border-gray-100 bg-gray-100/10 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100/20"
                                    >
                                        更改頭像
                                        <input
                                            onChange={changeImage}
                                            type="file"
                                            className={"hidden"}
                                            name={"avatar"}
                                            accept={"image/*"}
                                        />
                                    </label>
                                    <p className="mt-2 text-xs leading-5 text-gray-600">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="name"
                                       className="block text-sm font-medium leading-6 text-gray-800">
                                    姓名
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        defaultValue={user?.name ?? ""}
                                        className="block border border-gray-200  w-full rounded-md  bg-gray-100/5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className={"space-y-1 sm:col-span-full"}>
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
                                    <div className="space-y-1 sm:col-span-full">
                                        <label htmlFor="school_custom" className="block text-sm font-medium text-gray-700">
                                            學校名稱
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                defaultValue={user?.school ?? ""}
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

                            <div className={"space-y-1 sm:col-span-full"}>
                                <label htmlFor="department"
                                       className="block text-sm font-medium leading-6 text-gray-900">
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
                                    <div className="space-y-1 sm:col-span-full">
                                        <label htmlFor="department_custom"
                                               className="block text-sm font-medium text-gray-700">
                                            科系名稱
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                defaultValue={user?.department ?? ""}
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


                            <div className={"space-y-1 sm:col-span-full"}>
                                <label htmlFor="grade" className="block text-sm font-medium leading-6 text-gray-900">
                                    畢業年份
                                </label>
                                <select
                                    id="grade"
                                    name="grade"
                                    defaultValue={user?.grade ?? ""}
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

                            <div className="space-y-1 sm:col-span-full">
                                <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
                                    學號
                                </label>
                                <div className="mt-1">
                                    <input
                                        defaultValue={user?.student_id ?? ""}
                                        id="student_id"
                                        name="student_id"
                                        type="text"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-800">
                                    電子郵件
                                </label>
                                <span className={"flex text-sm text-gray-500 items-center gap-1"}><ExclamationCircleIcon
                                    className={"h-4 w-4 text-red-500"}/>僅支持未填填寫</span>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        readOnly={!user?.email}
                                        defaultValue={user?.email ?? ""}
                                        className="block w-full rounded-md border border-gray-200 bg-gray-100/5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-800">
                                    手機號碼
                                </label>
                                <span className={"flex text-sm text-gray-500 items-center gap-1"}><ExclamationCircleIcon
                                    className={"h-4 w-4 text-red-500"}/>僅支持未填填寫</span>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        readOnly={!!user?.phone}
                                        defaultValue={user?.phone ?? ""}
                                        className="block w-full rounded-md border border-gray-200 bg-gray-100/5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 flex">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                更新
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
