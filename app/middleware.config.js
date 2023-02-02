export const middlewareConfig = {
    "home": {
        regex: /^\/$/,
        middlewares: [
            'guest'
        ]
    },
    "intro": {
        regex: /^\/(about|pricing)$/,
        middlewares: [
            'guest'
        ]
    },
    "auth": {
        regex: /^\/auth\/(login|register|logout)$/,
        middlewares: [
            'guest'
        ]
    },
}