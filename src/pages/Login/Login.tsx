import { TextField, Button, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { LINK_PAGE_ACCOUNT } from '../../data/constance_for_page';
import { HrLine } from '../../components/component_reuse';
import { TextFieldLoginPassword } from '../../components/Login';
import { Frame, bgLogin } from '../../assets/image';
import { resolverLogin, FormLogin } from './validationLogin';
import { loginAuth } from '../../api/log_time_api';
import debounce from '~/custome_hook/debounce';
import { handleErrorAxiosUseForReactQuery } from '~/custome_hook/handle_error';



type payloadLogin = {
    username: string;
    password: string;
};

function Login() {
    // check đă đăng nhập chưa
    const localAccount = `http://localhost:${import.meta.env.VITE_PORT + LINK_PAGE_ACCOUNT}`;
    if (!!localStorage.getItem('userAdmin')) {
        window.location.href = localAccount;
        return <LinearProgress />;
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLogin>(resolverLogin);
    const { mutate, isLoading } = useMutation({
        mutationFn: loginAuth,
        onSuccess: (data) => {
            localStorage.setItem('userAdmin', JSON.stringify(data.token));
            location.href = localAccount;
        },
        onError: (error: any) => {
            handleErrorAxiosUseForReactQuery(error,"Password or Username Wrong")
        },
    });
    const onSubmit = (payload: payloadLogin) => {
        debounce(() =>  mutate(payload), 500);
    };
    //UI ***
    const theme = useTheme();
    const xsMax = theme.breakpoints.down(parseInt(import.meta.env.VITE_BREAKPOINTS_XS) + 1);
    const themeStyle = createTheme({
        typography: {
            button: { textTransform: 'none' },
            fontFamily: 'Poppins',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontSize: '16px',
                        height: '60px',
                        [xsMax]: {
                            fontSize: '16px',
                            padding: '5px',
                            height: '40px',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    input: {
                        fontSize: '16px',
                        height: '27px',
                        [xsMax]: {
                            fontSize: '16px',
                            padding: '5px',
                            height: '30px',
                        },
                        '&::-ms-reveal': {
                            display: 'none',
                        },
                    },
                },
            },
        },
    });
    function HeaderLogin() {
        return (
            <>
                <h2 className="sm_max:pt-4 xs_max:text-[18px]">VINOVA</h2>
                <h1 className="xs_max:text-[25px]">RESOURCE MANAGEMENT</h1>
                <h3 className="xs_max:text-[18px]">The #1 tool to plan capacity and schedule work</h3>
            </>
        );
    }
    return (
        <ThemeProvider theme={themeStyle}>
            <section className="Login w-full h-screen  pl-[--pLeftLogin]  xl_max:flex xl_max:flex-col xl_max:items-center xl_max:pl-0 flex  items-center ">
                <Toaster />
                <div className="main_login w-full  xl_max:w-[initial] ">
                    <div className="w-full flex  justify-between items-center  xl_max:block xl_max:max-w-[609px] sm_max:w-full sm_max:px-2">
                        <div className="form_login w-[609px]  xl_max:pt-0  sm_max:w-full">
                            <div className="response_height_hidden">
                                <HeaderLogin />
                            </div>
                            <form action="submit" onSubmit={handleSubmit(onSubmit)}>
                                <HrLine content="Login" />
                                <div className="relative">
                                    <label htmlFor="userName">Email</label>
                                    <TextField
                                        autoFocus={true}
                                        {...register('username')}
                                        id="userName"
                                        name="username"
                                        placeholder="Email"
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                    <p className="absolute -bottom-6 text-[14px] text-[red]">
                                        {errors.username?.message}
                                    </p>
                                </div>
                                <div className="pt-5 relative xs_max:pt-[10px]">
                                    <label htmlFor="">Password</label>
                                    <TextFieldLoginPassword register={register} />
                                    <p className="absolute -bottom-6 text-[14px] text-[red]">
                                        {errors.password?.message}
                                    </p>
                                </div>
                                <p className="pt-5 xs_max:pt-[10px]">
                                    <a href="#">Forgot your password</a>
                                </p>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        marginTop: '20px',
                                        [xsMax]: {
                                            marginTop: '10px',
                                        },
                                    }}
                                >
                                    {isLoading ? 'Login...' : 'Login'}
                                </Button>
                                <HrLine content="Or continue with" />
                                <Button variant="outlined" fullWidth>
                                    Login with SSO
                                </Button>
                            </form>
                        </div>
                        <div className="image_right   xl_max:w-full text-center ">
                            <div className="hidden response_height_display">
                                <HeaderLogin />
                            </div>
                            <div className="relative  xl_max:mt-4 sm_max:hidden response_img  mx-[auto]">
                                <img src={bgLogin} alt="" className="object-cover" />
                                <img src={Frame} alt="" className="absolute top-[30px]  object-cover" />
                            </div>
                        </div>
                    </div>
                    <p className="font-[500] text-[20px] text-[#80A2D9] pt-[44px] mr-[--pLeftLogin] text-center xl_max:py-5 xs_max:text-[15px] xs_max:mr-0 my_version">
                        Version 1.1.24
                    </p>
                </div>
            </section>
        </ThemeProvider>
    );
}

export default Login;
