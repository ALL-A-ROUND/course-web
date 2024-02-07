"use client";
import {useEffect, useState} from "react";
import {api} from "@/app/utils";
import {auth} from "@/lib/firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export default function useUser() {
    const [loading, setLoading] = useState(true);
    const [firebaseUser, firebaseLoading, error] = useAuthState(auth)
    const [systemUser, setSystemUser] = useState(null);
    useEffect(() => {
        if (!firebaseLoading) {
            (async () => {
                api("GET", "/user").then(setSystemUser).finally(() => setLoading(false));
            })()
        }
    }, [firebaseLoading]);

    return {
        user: systemUser,
        loading,
        firebaseUser,
        systemUser
    }
}