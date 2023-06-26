import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
      
    }
}
const theme = createTheme({
    typography: {
        fontFamily: 'Poppins',
        button: {
            textTransform: 'none',
        },
    },
    breakpoints: {
        values:{
            xs: parseInt(import.meta.env.VITE_BREAKPOINTS_XS)+1,
            sm: parseInt(import.meta.env.VITE_BREAKPOINTS_SM)+1,
            md: parseInt(import.meta.env.VITE_BREAKPOINTS_MD)+1,
            lg: parseInt(import.meta.env.VITE_BREAKPOINTS_LG)+1,
            xl: parseInt(import.meta.env.VITE_BREAKPOINTS_XL)+1,
            xxl: parseInt(import.meta.env.VITE_BREAKPOINTS_XXL)+1,
        }
    }
});
export default theme;
