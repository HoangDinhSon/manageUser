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
            `/users?limit=${limit}&skip=${skip}`,
        )
        .then((res) => res.data)
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

const getUserBaseFilter = ({ keyFilter, valueFilter }: any) =>
    axiosClient.get(`/users/filter?key=${keyFilter}&value=${valueFilter}`).then((res) => res.data);

const getUserBaseOnID = (id: typeID) => axiosClient.get(`/users/${id}`).then((res) => res.data);
//type informationAfterEdit là một object chứa {firstName:string , id:number|string ,... }
const editUserBaseOnID = (payload: any) =>
    axiosClient.put(`/users/${payload.id}`, payload.informationAfterEdit).then((res) => res.data);

const addUserToServer = (detailUser: any) => axiosClient.post('/users/add', detailUser).then((res) => res.data);

export { loginAuth, getLimitAndSkipUser, getUserBaseOnID, addUserToServer, editUserBaseOnID, getUserBaseFilter };
/* 
 ghi ghi hàm mục đích là để truyền tham số 
 dùng axios call API 
 dùng react Query theo doi quá trình call API của axios . 

*/
