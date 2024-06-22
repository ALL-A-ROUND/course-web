"use client"

import { motion } from 'framer-motion'

export default function Progress({
    value = 0
}: {
    value: number
}) {
    return (
        <div className="h-2 w-full bg-slate-50 relative rounded-md">
            <motion.div className="h-2 bg-teal-300 absolute rounded-md"
                style={{ width: 0 }}
                initial={{
                    width: 0,
                }}
                animate={{
                    width: `${value}%`,
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}