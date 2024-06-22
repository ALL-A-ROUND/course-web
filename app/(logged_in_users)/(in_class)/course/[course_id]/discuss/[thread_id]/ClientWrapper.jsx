"use client"

import PostEditBox from "@/app/course/[course_id]/discuss/[thread_id]/PostEditBox";
import {Suspense, useRef, useState} from "react";
import ThreadPost from "@/app/course/[course_id]/discuss/[thread_id]/ThreadPost";

export default function ClientWrapper({params}) {
    const [reply, setReply] = useState(null)
    const postEditRef = useRef()
    const focus = () => {
        postEditRef?.current?.scrollIntoView({behavior: "smooth"})
    }
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ThreadPost params={params} setReply={setReply} focus={focus}/>
            </Suspense>
            <PostEditBox params={params} reply={reply} ref={postEditRef}/>
        </>
    )
}