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
    "member": {
        regex: /^\/member\/(.*)$/,
        middlewares: [
            'auth'
        ]
    },
    "course": {
        regex: /^\/course?$/,
        middlewares: [
            'auth'
        ]
    },
    "problem": {
        regex: /^\/problem\/[0-9]+$/,
        middlewares: [
            'auth'
        ]
    }
}