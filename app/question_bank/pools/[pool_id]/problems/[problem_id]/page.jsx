"use client"
import ProblemEditableForm from "@/app/question_bank/pools/[pool_id]/problems/ProblemEditableForm";
import {usePathname, useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {useState} from "react";
import useSWR from "swr";

export default function ({params: {pool_id, problem_id}}) {
    const router = useRouter()
    const [type, setType] = useState('0')
    const pathname = usePathname()
    const submit = (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const body = JSON.stringify({
            title: data.get('title'),
            description: data.get('description'),
            type,
            public: data.get('public') === 'on',
        })
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/question_bank/pools/' + pool_id + '/problems', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body
        }).then(res => res.json()).catch(e => {
            Swal.fire({
                title: "新增失敗",
                icon: "error",
                html: JSON.stringify(e)
            })
        }).then(data => {
            router.replace('/question_bank/pools/' + pool_id + '/problems')
        })
    }


    const {
        data: problem,
        isLoading
    } = useSWR(`/question_bank/pools/${pool_id}/problems/${problem_id}`, async (url) => {
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
        const data = await res.json()
        setType(data.type)
        return data
    })
    return (
        <>
            <ProblemEditableForm problem={problem} type={type} setType={setType} submit={submit} pathname={pathname}/>
        </>
    )
}