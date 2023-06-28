import { TextField, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
function TextFieldLoginPassword({ register }: any) {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword=()=>{
        setShowPassword(!showPassword)
    }
    return (
        <TextField
            {...register('password', { required: true })}
            name="password"
            placeholder="Password"
            type={showPassword?"text":"password"}
            sx={{
                width: '100%',
                
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" onClick= {handleShowPassword}>{showPassword ? <VisibilityOff sx={{cursor:"pointer",}}/> : <Visibility  sx={{cursor:"pointer",}}/>}</InputAdornment>
                ),
            }}
        />
    );
}

export default TextFieldLoginPassword;
