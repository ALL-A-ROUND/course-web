"use client"
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
import ProblemEditableForm from "@/app/(logged_in_users)/(editor)/question_bank//pools/[pool_id]/problems/ProblemEditableForm";
import Swal from "sweetalert2";

export default function ({params}) {
    const router = useRouter()
    const [type, setType] = useState('0')
    const pathname = usePathname()
    const submit = (e) => {
        e.preventDefault()
        const pool_id = params.pool_id
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
    return (
        <ProblemEditableForm type={type} setType={setType} submit={submit} pathname={pathname}/>
    )
}
