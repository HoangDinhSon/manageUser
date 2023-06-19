/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            range_0_375: { min: '0', max: '375px' },
            range_1441_: { min: '1441px' },
        },
        extend: {},
    },
    plugins: [],
};
