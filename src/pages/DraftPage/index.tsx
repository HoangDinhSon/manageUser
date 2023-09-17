import { useForm, useController, UseControllerProps, Control } from 'react-hook-form';
import { TextField, Container, Box } from '@mui/material';
import { useEffect } from 'react';

interface HeaderInputProps {
    control: Control<any>;
    nameFirst: 'firstName' | 'lastName' | 'email' | 'passWord';
    nameSecond: 'firstName' | 'lastName' | 'email' | 'passWord';
    nameThird: 'firstName' | 'lastName' | 'email' | 'passWord';
    nameFourth: 'firstName' | 'lastName' | 'email' | 'passWord';
}
type TextFieldInput = UseControllerProps;
function Input(props: TextFieldInput) {
    const { field } = useController(props);
    return (
        <Box>
            <TextField {...field} />
        </Box>
    );
}
function HeaderInput(props: HeaderInputProps) {
    const { control, nameFirst, nameFourth, nameSecond, nameThird } = props;
    return (
        <Box>
            <Input control={control} name={nameFirst} />
            <Input control={control} name={nameSecond} />
            <Input control={control} name={nameThird} />
            <Input control={control} name={nameFourth} />
        </Box>
    );
}

interface FormValue {
    firstName: string;
    lastName: string;
    email: string;
    passWord: string;
}
function DraftPage() {
    const { control, handleSubmit, setFocus, reset } = useForm<FormValue>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            passWord: '',
        },
    });
    useEffect(() => {
        setFocus('firstName');
    }, [setFocus]);
    const onSubmit = (data: FormValue) => {
        console.log(data);
        reset();
    };
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HeaderInput
                    control={control}
                    nameFirst="firstName"
                    nameSecond="lastName"
                    nameThird="email"
                    nameFourth="passWord"
                />
                <button type="submit">Click</button>
            </form>
        </Container>
    );
}
export default DraftPage;
