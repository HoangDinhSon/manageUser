import { styled ,Button} from '@mui/material';
const ButtonStyledLogin = styled(Button)((theme) => ({
    '&.MuiButton-root': {
        marginTop: '30px',
        padding: '10px 0',
        color: '#80A3E7',
        width: '100%',
        outline:"1px solid #1565C0",
    },
}));
export default ButtonStyledLogin;
