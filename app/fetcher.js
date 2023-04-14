/**
 * @param {string} endpoint
 * @param {object} options
 * */
export const fetcher = (endpoint, options = {}, router = null) => {
    // merge options with default options
    const {method = 'GET', body, ...rest} = options;
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
            if (res.status === 401 && router && options.bearer) {
                window?.localStorage?.removeItem('token')
                return router.push('/auth/login');
            }
            throw new Error(res);
        })
        .catch((error) => {
            console.error(error);
        });
}