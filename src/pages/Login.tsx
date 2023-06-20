import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { HrLine, ButtonStyledLogin } from '../components/component_reuse';
import { TextFieldLoginPassword } from '../components/Login';
import { Frame, bgLogin } from '../assets/image';
import { resolverLogin } from '../myYup';
import { FormLogin } from '../myYup';
import { loginAuth } from '../Api/logTimeApi';

type payloadLogin = {
    username: string;
    password: string;
};

function Login() {
    if(localStorage.getItem("userAdmin")){
        window.location.href = 'http://localhost:4000/accounts';
        return(<div></div>);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLogin>(resolverLogin);
    const { mutate } = useMutation({
        mutationFn: loginAuth,
        onSuccess: (data) => {
            toast.success('Login succcess');
            localStorage.setItem('userAdmin', JSON.stringify(data.token));
            location.href = 'http://localhost:4000/accounts';
           
        },
        onError: (error: any) => {
            toast.error(`login faill because of +${error?.message}`);
        },
    });

    const onSubmit = (payload: payloadLogin) => {
        mutate(payload);
    };
    return (
       <section className="Login w-full h-screen  pl-[60px]">
            <Toaster />
            <div className=" flex relative justify-between">
                <div className="form_login w-[609px]  pt-[70px]">
                    <h2>VINOVA</h2>
                    <h1>RESOURCE MANAGEMENT</h1>
                    <h3>The #1 tool to plan capacity and schedule work</h3>
                    <form action="submit" onSubmit={handleSubmit(onSubmit)}>
                        <HrLine content="Login" />
                        <div className="pt-[35px] relative">
                            <label htmlFor="userName">Email</label>
                            <TextField
                                {...register('username')}
                                id="userName"
                                name="username"
                                placeholder="Email"
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <p className="absolute -bottom-6 text-[14px] text-[red]">{errors.username?.message}</p>
                        </div>
                        <div className="pt-5 relative">
                            <label htmlFor="">Password</label>
                            {/* <TextFieldLoginPassword  {...register('password', { required: true })}/> */}
                            <TextField
                                {...register('password', { required: true })}
                                name="password"
                                placeholder="Password"
                                type="password"
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <p className="absolute -bottom-6 text-[14px] text-[red]">{errors.password?.message}</p>
                        </div>
                        <p className="pt-5">
                            <a href="#">Forgot your password</a>
                        </p>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                marginTop: '20px',
                                padding: '12px 0',
                                width: '100%',
                            }}
                        >
                            Login
                        </Button>
                        <HrLine content="Or continue with" />
                        <ButtonStyledLogin> Login with SSO</ButtonStyledLogin>
                    </form>
                </div>
                <div className="image_right relative w-[50%] ">
                    <img src={bgLogin} alt="" className="pt-[120px]" />
                    <img src={Frame} alt="" className="absolute top-[150px]" />
                </div>
            </div>
            <p className="font-[500] text-[20px]  text-[#80A2D9] pt-20 text-center">Version 1.1.24</p>
        </section>
    );
}

export default Login;
