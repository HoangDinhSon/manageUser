import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins',
        button: {
            textTransform:"none",
        }
    },
    breakpoints: {
        values: {
            xs: 376,
            sm: 641,
            md: 769,
            lg: 1025,
            xl: 1281,
        },
    },
});
export default theme;
