import axiosClient from './axiosClient';
type typeID = string|number
type payloadLogin = {
    username: string;
    password: string;
};
const loginAuth = (payload: payloadLogin) =>
    axiosClient
        .post('/auth/login', {
            username: payload.username,
            password: payload.password,
        })
        .then((res) => res.data);
const getLimitAndSkipUser = (limit: number, skip: number) =>
    axiosClient
        .get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=id,firstName,maidenName,email,company,phone`)
        .then((res) => res.data);
const getUserBaseOnID=(id:typeID)=> axiosClient.get(`/users/${id}`).then((res)=>res.data);
type typeUserSendServer={
    firstName:string;
    email:string;
    position:string;
    phone:string;
} 
const addUserToServer = (detailUser:any)=>axiosClient.post("/users/add",detailUser ).then((res)=>res.data)

export { loginAuth,getLimitAndSkipUser ,getUserBaseOnID,addUserToServer};
