/** @type {import('tailwindcss').Config} */
// dùng env : npm i dotenv , npm i @types/node
require('dotenv').config();
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs_max: { max: parseInt(process.env.VITE_BREAKPOINTS_XS) + 'px' }, //375
            sm_max: { max: parseInt(process.env.VITE_BREAKPOINTS_SM) + 'px' }, //640
            md_max: { max: parseInt(process.env.VITE_BREAKPOINTS_MD) + 'px' }, //768
            lg_max: { max: parseInt(process.env.VITE_BREAKPOINTS_LG) + 'px' }, //1025
            xl_max: { max: parseInt(process.env.VITE_BREAKPOINTS_XL) + 'px' }, //1280
            xxl_max: { max: parseInt(process.env.VITE_BREAKPOINTS_XXL) + 'px' }, //1440
            range_1441_: { min: parseInt(process.env.VITE_BREAKPOINTS_XXL) + 1 + 'px' }, //1441
            min_376: { min: parseInt(process.env.VITE_BREAKPOINTS_XS) + 1 + 'px' }, //376
        },
        extend: {},
    },
    plugins: [],
};
