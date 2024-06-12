"use client"
import useSWR from "swr";
import {api, moment} from "@/app/utils";
import YouTube from "react-youtube";
import {useEffect, useState} from "react";
import DiscussPage from "@/app/course/[course_id]/discuss/page";

export default function LessonPage({params: {course_id, unit_id, lesson_id}}) {
    const [player, setPlayer] = useState(null)
    const [watchTime, setWatchTime] = useState(null)
    let timer;
    const [endOfVideo, setEndOfVideo] = useState(null)
    const {
        data: lesson,
        isLoading
    } = useSWR(`/lesson/${lesson_id}`, async (url) => await api("GET", url, null).then(d => d))
    const {
        data: course,
        isLoading2
    } = useSWR(`/course/${course_id}`, async (url) => await api("GET", url, null).then(d => d))
    const [showQuiz, setShowQuiz] = useState(false)
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
        setInterval(async () => {
            if (player) {
                console.log(player.getCurrentTime())
                if (player.getCurrentTime() > 30 && !course?.can_access) {
                    alert("您沒有權限看超過30秒的影片")
                }
            }
        }, 5000)
        return () => {
            window.removeEventListener('mousemove', updateTimer)
            window.removeEventListener('keydown', updateTimer)
        }
    }, [])

    const updateTimer = async () => {
        console.log('[INFO] Update timer')
        clearTimeout(timer)
        timer = setTimeout(alertWatch, Math.random() * 10000 + 120 * 1000)
    }

    const alertWatch = async () => {
        await player?.pauseVideo()
        console.log("[INFO] User is not watching the video")
        alert('請移動您的滑鼠或按任意鍵以保持觀看狀態')
        clearTimeout(timer)
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
                            opts={{
                                playerVars: {
                                    autoplay: 1,
                                    start: watchTime,
                                    controls: 0,
                                    rel: 0,
                                },
                                width: "100%",
                            }}
                            onEnd={async e => {
                                await api('POST', `/lesson/${lesson_id}/watch/end`, {
                                    time: e.target.getCurrentTime(),
                                })
                                alert("影片觀看完成，可以進行測驗")
                                setShowQuiz(true)
                            }}
                            onReady={e => {
                                setPlayer(e.target)
                                e.target.seekTo(watchTime)
                                setEndOfVideo(e.target.getDuration())
                            }}
                            onPlay={async e => {
                                await api('POST', `/lesson/${lesson_id}/watch`, {
                                    time: e.target.getCurrentTime()
                                })
                                await updateTimer()
                            }}
                            iframeClassName={"w-full"}
                            className={"w-full"}
                            width={"100%"}
                            height={"100%"}
                        />
                    ) : "本堂課程未提供影片"}

                    {
                        watchTime !== null && <div
                            className={"text-gray-500"}>
                            上次觀看到：
                            {moment.duration(moment().add(watchTime, 'seconds').diff(moment())).humanize()} /
                            {endOfVideo !== null && moment.duration(endOfVideo, 'seconds').humanize()} ({Math.round(watchTime / endOfVideo * 100)}%)
                        </div>
                    }

                    <div className={"h-full my-8"}>
                        {lesson?.article ?? "本堂課程未提供文字講義"}

                        <div className={"flex flex-col gap-2"}>

                            {showQuiz && <>
                                {lesson?.form_url ?
                                    <div onClick={()=>window.open(lesson?.form_url)} className={"flex items-center justify-center bg-indigo-300  w-full h-12"}>做測驗</div> :
                                    <span className={"text-red-500"}>本堂課程未提供測驗</span>}
                                {lesson?.motivation_survey_url ?
                                    <div onClick={()=>window.open(lesson?.motivation_survey_url)}
                                       className={"flex items-center justify-center bg-indigo-300 w-full h-12"}>滿意度調查</div> :
                                    <span className={"text-red-500"}>本堂課程未提供滿意度調查</span>}
                            </>}
                        </div>
                    </div>
                </div>
            </ul>

            <DiscussPage params={{course_id, unit_id, lesson_id}}/>
        </div>
    )
}
