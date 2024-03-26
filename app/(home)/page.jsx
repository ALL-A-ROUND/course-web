"use client";
import dynamic from 'next/dynamic';

export default function Home() {
    const HomePageComponent = dynamic(() => import(`@/components/homepage/${process.env.NEXT_PUBLIC_APP_ID}`), {
        ssr: false,
    });

    return <HomePageComponent/>;
}