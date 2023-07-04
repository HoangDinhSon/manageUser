import axiosClient from './axiosClient';
type typeID = string | number;
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
        .get(
            `/users?limit=${limit}&skip=${skip}&select=id,firstName,maidenName,email,company,phone,gender,age,eyeColor,bloodGroup,university,height`,
        )
        .then((res) => res.data)
        .catch((error) => {
            alert(error?.message);
        });
const getUserBaseFilter = ({ keyFilter, valueFilter }: any) =>
    axiosClient.get(`/users/filter?key=${keyFilter}&value=${valueFilter}`).then((res) => res.data);

const getUserBaseOnID = (id: typeID) => axiosClient.get(`/users/${id}`).then((res) => res.data);
//type informationAfterEdit là một object chứa {firstName:string , id:number|string ,... }
const editUserBaseOnID = (payload: any) =>
    axiosClient.put(`/users/${payload.id}`, payload.informationAfterEdit).then((res) => res.data);

const addUserToServer = (detailUser: any) => axiosClient.post('/users/add', detailUser).then((res) => res.data);

export { loginAuth, getLimitAndSkipUser, getUserBaseOnID, addUserToServer, editUserBaseOnID, getUserBaseFilter };
