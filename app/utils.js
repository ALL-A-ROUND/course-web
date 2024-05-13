import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ChatBubbleLeftRightIcon, ClipboardIcon, MegaphoneIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import originMoment from 'moment'
import 'moment/locale/zh-tw'
import Swal from "sweetalert2";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {auth} from "@/lib/firebase/firebase";
import {useAuthState, useIdToken} from "react-firebase-hooks/auth";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from "next/navigation";

export function sha256(str) {
    // Get the string as arraybuffer.
    var buffer = new TextEncoder("utf-8").encode(str)
    return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
        return hex(hash)
    })
}

export function hex(buffer) {
    var digest = ''
    var view = new DataView(buffer)
    for (var i = 0; i < view.byteLength; i += 4) {
        // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
        var value = view.getUint32(i)
        // toString(16) will transform the integer into the corresponding hex string
        // but will remove any initial "0"
        var stringValue = value.toString(16)
        // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
        // chars for Uint16 and 2 chars for Uint8)
        var padding = '00000000'
        var paddedValue = (padding + stringValue).slice(-padding.length)
        digest += paddedValue
    }

    return digest
}

export async function api(method, endpoint, jsonBody = undefined, options = {
    disableError: false,
}) {
    const SSR = typeof window === "undefined"
    const token = SSR ? null : await auth.currentUser?.getIdToken()

    return fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + endpoint, {
        method,
        body: (
            (method === "GET" || typeof jsonBody === "undefined") ? null :
                (!SSR && jsonBody instanceof FormData) ?
                    // 如果是 FormData 就不要轉成 JSON
                    jsonBody :
                    JSON.stringify(jsonBody)
        ),
        headers: {
            ...(!SSR && jsonBody instanceof FormData) ? {
                // 如果是 FormData 就不要加 Content-Type
            } : ({
                'Content-Type': 'application/json',
            }),
            'Accept': 'application/json',
            'Via': 'fetcher-1.0',

            // 如果不是 SSR，就加上 Authorization
            ...(!SSR && {
                'Authorization': 'Bearer ' + token,
            })
        }
    }).then(async (res) => {
        // 避免 migration 後的 token 失效
        if (res.status === 401 && !SSR) {
            // return signInWithPopup(auth, new GoogleAuthProvider())
        }
        const data = await res.json()
        if (res.status >= 400) {
            if (options.disableError !== true && !SSR) {
                // await Swal.fire({
                //     icon: 'error',
                //     title: '發生錯誤',
                //     text: data?.message ?? '未知錯誤'
                // })
                if (data?.redirect)
                    window.location.href = data.redirect
            }
            return Promise.reject(JSON.stringify(data))
        }
        return data
    })
}

export function makeFeature(params) {
    return [
        {
            id: 'bulletin',
            name: '公告',
            path: `/course/${params.course_id}/bulletin`,
            icon: MegaphoneIcon,
        },
        {
            id: 'unit',
            name: '單元',
            path: `/course/${params.course_id}/unit`,
            icon: BookOpenIcon,
        },
        // {
        //     id: 'contest',
        //     name: '競賽',
        //     path: `/course/${params.course_id}/contest`,
        //     icon: ClipboardIcon,
        // },
        // {
        //     id: 'problem',
        //     name: '題庫',
        //     path: `/course/${params.course_id}/problem`,
        //     icon: PencilSquareIcon,
        // },
        {
            id: 'scores_checking',
            name: '成績查詢',
            path: `/course/${params.course_id}/scores_checking`,
            icon: TableCellsIcon,
        },
        {
            id: 'discuss',
            name: '討論區',
            path: `/course/${params.course_id}/discuss`,
            icon: ChatBubbleLeftRightIcon,
        },
        {
            id: 'assignment',
            name: '作業',
            path: `/course/${params.course_id}/assignment`,
            icon: ClipboardIcon,
        },
        {
            id: 'info',
            name: '資料查詢',
            path: `/course/${params.course_id}/info`,
            icon: InformationCircleIcon,
        },
        {
            id: 'manage',
            name: '管理',
            path: `/course/${params.course_id}/manage`,
            icon: Cog6ToothIcon,
        }
    ]
}

originMoment.locale('zh-tw')
export const moment = originMoment

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

export function EchoAuth(channel, options) {
    return {
        authorize: (socketId, callback) => {
            api("POST", '/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(response => {
                    callback(null, response);
                })
                .catch(error => {
                    callback(error);
                });
        }
    };
}

export function generateEchoInstance() {
    window.Pusher = Pusher;

    return new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_PUSHER_KEY,
        wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST,
        wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT,
        wsPath: process.env.NEXT_PUBLIC_PUSHER_PATH,
        forceTLS: true,
        encrypted: true,
        disableStats: true,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        enabledTransports: ['ws', 'wss'],
        authorizer: EchoAuth,
    });
}
