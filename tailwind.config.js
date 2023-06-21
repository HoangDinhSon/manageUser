/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs_max: { max: '375px' },
            sm_max: { max: '640px' },
            md_max: { max: '768px' },
            lg_max: { max: '1024px' },
            xl_max: { max: '1280px' },
            '2xl_max': { max: '1440px' },
            range_1441_: { min: '1441px' },
        },
        extend: {},
    },
    plugins: [],
};
