"use client"
import {useEffect, useState} from "react";

export function useOnBeforeUnload() {
    const [onBeforeUnload, setOnBeforeUnload] = useState(false)
    useEffect(() => {
        if (onBeforeUnload) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = null
        }
    }, [onBeforeUnload])
    return [onBeforeUnload, setOnBeforeUnload]
}