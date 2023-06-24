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