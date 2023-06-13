import { styled, TextField } from '@mui/material';
const TextFieldLoginPassword = styled(TextField)(() => ({
    color:"red",
    '&.MuiTextField-root': {
        name:'password',
        placeholder:'Password',
        width:"100%",
    },
}));
export default TextFieldLoginPassword;
