import axiosClient from '~/api/axios_client';
import { axiosTodo } from '~/api/axios_client';
import { typeOfTodo } from '~/data/type/typeGlobal';
// import handleError from '~/custome_hook/handle_error';
import { handleErrorAxiosUseForReactQuery } from '~/custome_hook/handle_error';

// import type { AxiosResponse } from 'axios';
// import { toast } from 'react-hot-toast';
// import { useEffect } from 'react';

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
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });

const getLimitAndSkipUser = (limit: number, skip: number) =>
    axiosClient
        .get(`/users?limit=${limit}&skip=${skip}`)
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
                console.log(error.config);
            }
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
 Ghi hàm mục đích là để truyền tham số 
 dùng axios call API 
 dùng react Query theo doi quá trình call API của axios . 

*/
/* ----------------------New API ------------------ */
const getTodo = () =>
    axiosTodo
        .get('/todos')
        .then((res) => res.data)
        .catch((error)=>{
            handleErrorAxiosUseForReactQuery(error,"fail get data for report page")
        })
const updateTodo = (dataForUpdate: typeOfTodo) =>
    axiosTodo
        .post(`/todos/${dataForUpdate._id}`, dataForUpdate)
        .then((res) => res.data)
        .catch((error) => {
            throw error
        });
type typeDataForAdd = Omit<typeOfTodo, '_id'>;
const createTodo = (dataForAdd: typeDataForAdd) =>
    axiosTodo
        .post('/todos', dataForAdd)
        .then((res) => res.data)
        .catch((error) => {
            throw error
        });
const deleteTodo = (id: string) =>
    axiosTodo
        .delete(`/todos/${id}`)
        .then((res) => res.data)
        .catch((error) => {
            throw error
        });
export { getTodo, updateTodo, createTodo, deleteTodo };
// axios for useEffect
const updateTodoHandle = (dataForUpdate: typeOfTodo) => axiosTodo.post(`/todos/${dataForUpdate._id}`, dataForUpdate);
export { updateTodoHandle };
