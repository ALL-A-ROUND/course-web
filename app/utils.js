import {BookOpenIcon, Cog6ToothIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {ChatBubbleLeftRightIcon, ClipboardIcon, TableCellsIcon} from "@heroicons/react/24/outline";

export async function api(method, endpoint, jsonBody) {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    return fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + endpoint, {
        method,
        body: (method === "GET" || typeof jsonBody === "undefined") ? null : JSON.stringify(jsonBody),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage?.getItem('token')
        }
    }).then(res => {
        if (res.status === 401)
            localStorage?.removeItem('token')
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