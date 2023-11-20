"use client"
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function Redirect() {
    const params = useSearchParams()
    const redirect = params.get("redirect")
    const router = useRouter()
    useEffect(() => {
        localStorage.setItem("token", params.get("token"))
        if (redirect)
            router.push(redirect)
        else
            router.push("/course")
    }, []);
}
