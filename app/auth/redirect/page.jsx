"use client"
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {signInWithCustomToken} from "firebase/auth";
import {auth} from "@/lib/firebase/firebase";
import {api} from "@/app/utils";

export default function Redirect() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const params = useSearchParams()
    const redirect = params.get("redirect")
    const router = useRouter()
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/custom-token', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + params.get("token")
            }
        }).then(res => res.text()).then(data => {
            signInWithCustomToken(auth, data).then(() => {
                if (redirect)
                    router.push(redirect)
                else
                    router.push("/course")
            }).catch(err => {
                setError(err)
                setLoading(false)
            })
        })
    }, [])

    return (<>
        {loading ? "Redirecting..." : "完成"}
        {error && <div>{error.message}</div>}
    </>)
}
