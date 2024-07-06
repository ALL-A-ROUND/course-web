"use client"
import dynamic from 'next/dynamic';
import NavigationBar from "@/app/[lng]/(home)/navigation-bar";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import React from "react";
import {Spin} from "antd";
import {useRouter} from "next/navigation";


export default function HomeLayout({children}) {
    const router = useRouter()
    const [firebaseUser, loading, error] = useAuthState(auth)
    if (loading) return <div className={"min-h-screen flex justify-center items-center"}><Spin size={"large"}/></div>
    if (!firebaseUser) router.push("/auth")

    const FooterComponent = dynamic(() => import(`@/components/homepage-footer/${process.env.NEXT_PUBLIC_APP_ID}`), {
        ssr: false,
    });
    return (
        <div className="bg-white">
            <NavigationBar/>
            <main>
                {children}
            </main>

            <FooterComponent/>
        </div>
    )
}
