/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                'year':{
                    '100': "#ffe9c7",
                    '200': "#f0c588",
                    '300': "#dbaa64",
                    '400': "#a87732",
                    '500': "#875919",
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
