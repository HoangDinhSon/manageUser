import axiosClient from './axiosClient';
type payloadLogin = {
    username:string,
    password:string,
}
const loginAuth = (payload:payloadLogin) =>
    axiosClient
        .post('/auth/login', {
            username: payload.username,
            password: payload.password,
        })
        .then((res) => res.data);

export { loginAuth };
