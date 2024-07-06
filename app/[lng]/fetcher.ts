/**
 * @param {string} endpoint
 * @param {object} options
 * */
import { useRouter } from 'next/router';

export const fetcher = (endpoint: string, options: any = {}) => {
    // merge options with default options
    const router = useRouter();
    const { method = 'GET', body, ...rest } = options;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...rest.headers,
    }
    if (options.bearer) headers.Authorization = `Bearer ${options.bearer}`;

    return fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + endpoint, {
        method,
        headers,
        body: JSON.stringify(body),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            if (res.status === 401 && options.bearer) {
                window?.localStorage?.removeItem('token')
                return router.push('/auth/login');
            }

            console.error("res.status 為 401 且 options.bearer 不存在，請檢查是否有登入。")
            throw new Error("歐歐錯誤ㄌ");
        })
        .catch((error) => {
            console.error(error);
            let error_message = "歐歐，伺服器發生錯誤，請稍後再試。"
            if(error instanceof Error) {
                error_message = error.message;
            }
        });
}