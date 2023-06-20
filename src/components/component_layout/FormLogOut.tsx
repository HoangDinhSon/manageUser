import { iconLogout } from '../../assets';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '100%',
                    backgroundColor: '#FFF3F4',
                    color: '#FF7177',
                    textTransform: 'none',
                },
                outlined: {
                    color: 'black',
                },
            },
            defaultProps: {},
        },
        MuiButtonBase: {},
    },
});

function FormLogOut() {
    const handleLogOut = () => {
        localStorage.removeItem('userAdmin');
        window.location.href="http://localhost:4000"
    };
    return (
        <ThemeProvider theme={theme}>
            <div className="w-[255px] h-[134px] bg-white px-6 py-4 rounded-lg">
                <h4>Username</h4>
                <p className="text-[--colorGrey] leading-[150%]">example@email</p>
                <Button startIcon={<img src={iconLogout} alt=""/>} onClick={handleLogOut}>
                    Log Out
                </Button>
            </div>
        </ThemeProvider>
    );
}

export default FormLogOut;
