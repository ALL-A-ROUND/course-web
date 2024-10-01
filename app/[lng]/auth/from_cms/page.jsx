"use client"
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {signInWithCustomToken} from "firebase/auth";
import {auth} from "@/lib/firebase/firebase";
import {api} from "@/app/[lng]/utils";

export default function Redirect() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const params = useSearchParams()
    const redirect = params.get("redirect")
    const token = params.get("token")
    const router = useRouter()
    useEffect(() => {
        signInWithCustomToken(auth, token).then(data => {
            if (redirect)
                router.push(redirect)
            else
                router.push("/course")
        }).catch(err => {
            setError(err)
            setLoading(false)
        })
    }, [])

    return (<>
        {loading ? "Redirecting..." : "完成"}
        {error && <div>{error.message}</div>}
    </>)
}
