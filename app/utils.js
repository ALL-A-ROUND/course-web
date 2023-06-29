import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ChatBubbleLeftRightIcon, ClipboardIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import originMoment from 'moment'
import 'moment/locale/zh-tw'

export async function api(method, endpoint, jsonBody) {
    const SSR = typeof window === "undefined"
    return fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + endpoint, {
        method,
        body: (method === "GET" || typeof jsonBody === "undefined") ? null : JSON.stringify(jsonBody),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',

            // 如果不是 SSR，就加上 Authorization
            ...(!SSR && {
                'Authorization': 'Bearer ' + localStorage?.getItem('token')
            })
        }
    }).then(res => {
        // 避免 migration 後的 token 失效
        if (res.status === 401 && !SSR) {
            localStorage?.removeItem('token')
        }
        return res.json()
    })
}

export function makeFeature(params) {
    return [
        {
            id: 'unit',
            name: '單元',
            path: `/course/${params.course_id}/unit`,
            icon: BookOpenIcon,
        },
        {
            id: 'contest',
            name: '競賽',
            path: `/course/${params.course_id}/contest`,
            icon: ClipboardIcon,
        },
        {
            id: 'problem',
            name: '題庫',
            path: `/course/${params.course_id}/problem`,
            icon: PencilSquareIcon,
        },
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
            id: 'manage',
            name: '管理',
            path: `/course/${params.course_id}/manage`,
            icon: Cog6ToothIcon,
        }
    ]
}

originMoment.locale('zh-tw')
export const moment = originMoment