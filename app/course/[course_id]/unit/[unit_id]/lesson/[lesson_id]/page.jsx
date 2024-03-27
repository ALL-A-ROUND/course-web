"use client"
import useSWR from "swr";
import {api, moment} from "@/app/utils";
import YouTube from "react-youtube";
import {useEffect, useState} from "react";
import DiscussPage from "@/app/course/[course_id]/discuss/page";

export default function LessonPage({params: {course_id, unit_id, lesson_id}}) {
    const [player, setPlayer] = useState(null)
    const [watchTime, setWatchTime] = useState(null)
    const [timer, setTimer] = useState(null)
    const {
        data: lesson,
        isLoading
    } = useSWR(`/lesson/${lesson_id}`, async (url) => await api("GET", url, null).then(d => d))

    useEffect(() => {
        if (lesson?.video) {
            api('GET', `/lesson/${lesson_id}/watch`).then(d => {
                setWatchTime(d.time)
            })
        }
    }, [lesson])

    useEffect(() => {
        // register mouse move event
        window.addEventListener('mousemove', updateTimer)
        window.addEventListener('keydown', updateTimer)
        return () => {
            window.removeEventListener('mousemove', updateTimer)
            window.removeEventListener('keydown', updateTimer)
        }
    })

    const updateTimer = async () => {
        console.log('[INFO] Update timer')
        clearTimeout(timer)
        setTimer(setTimeout(alertWatch, Math.random() * 10000 + 120*1000))
    }

    const alertWatch = async () => {
        player?.pauseVideo()
        console.log("[INFO] User is not watching the video")
        alert('請移動您的滑鼠或按任意鍵以保持觀看狀態')
    }

    return (
        <div className="overflow-hidden bg-white sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {isLoading && <div>Loading...</div>}

                <div className={"flex flex-col gap-4"}>

                    <div className={"text-3xl text-purple-700 font-extrabold"}>
                        {lesson?.title}
                        {lesson?.completed && <span className={"text-green-500 ml-2"}>✔</span>}
                    </div>

                    {lesson?.video ? (
                        watchTime !== null && <YouTube
                            videoId={lesson?.video}
                            onPause={async e => {
                                await api('POST', `/lesson/${lesson_id}/watch`, {
                                    time: e.target.getCurrentTime()
                                })
                            }}
                            onEnd={async e => {
                                await api('POST', `/lesson/${lesson_id}/watch/end`, {
                                    time: e.target.getCurrentTime(),
                                })
                            }}
                            onReady={e => {
                                setPlayer(e.target)
                                e.target.seekTo(watchTime)
                            }}
                            onPlay={async e => {
                                await api('POST', `/lesson/${lesson_id}/watch`, {
                                    time: e.target.getCurrentTime()
                                })
                                await updateTimer()
                            }}
                        />
                    ) : "本堂課程未提供影片"}

                    {
                        watchTime !== null && <div
                            className={"text-gray-500"}>上次觀看到：{moment.duration(moment().add(watchTime, 'seconds').diff(moment())).humanize()}</div>
                    }

                    <div className={"h-full my-8"}>
                        {lesson?.article ?? "本堂課程未提供文字講義"}
                    </div>
                </div>
            </ul>

            <DiscussPage params={{course_id, unit_id, lesson_id}}/>
        </div>
    )
}
