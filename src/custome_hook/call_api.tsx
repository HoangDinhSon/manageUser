import { useEffect, useState, useRef } from 'react';
import { axiosTodo } from '~/api/axios_client';
import { toast } from 'react-hot-toast';
import type { AxiosResponse } from 'axios';
import { typeOfTodo } from '~/data/type/typeGlobal';
import { useDispatch, useSelector } from 'react-redux';
import handleError from './handle_error';
import debounce from './debounce';
import {
    updateValueFormVerify,
    addManyTodoIntoList,
    ID_AND_KIND_OF_FORM,
    changeIdAndKindOfForm,
    hiddenFormAddEdit,
} from '~/app_redux/reducer_redux';
import { RootState } from '~/app_redux/store';
import { updateTodoHandle } from '~/api/log_time_api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

function useGetData() {
    const [triggerFetching, setTriggerFetching] = useState(1);
    const [resForFetch, setDataOfRes] = useState<any>(null);
    /* build ra product need delete because Strict mode  */
    const refCleanup = useRef<boolean>(false);
    const refetch = () => {
        setTriggerFetching((prev) => (prev += 1));
    };
    // define axios call api
    const getTodoHandleByUseEffect = async (setSate: (res: AxiosResponse<any, any>) => void) => {
        try {
            const res = await axiosTodo.get('/todos');
            if (res.data) {
                setSate(res);
                refCleanup.current = false;
            }
        } catch (error: any) {
            console.log('error>>>', error);
            toast.error(`Oh some thing Error`);
        }
    };
    useEffect(() => {
        /*Start  Hàm này sẽ không có tác dụng trong product vì trong product Strict mode*/
        if (refCleanup.current) {
            return;
        }
        refCleanup.current = true;
        /*End  Hàm này sẽ không có tác dụng trong product vì trong product Strict mode */
        getTodoHandleByUseEffect(setDataOfRes);
    }, [triggerFetching]);
    return { refetch: refetch, response: resForFetch };
}
export { useGetData };
/* 
+ refetch use trigger fetching data 
+ response  from api , 
if disconnect OR have connect but can't connect to server api will ==> announce mistake , and response === null   
*/
const DEFAULT_OF_LIST_TODO = [
    {
        text: '',
        complete: false,
        author: '',
        createdDate: '',
    },
];

function createTodoHandle(refetch: () => void) {
    const { listTodoSendServer, valueFormVerify } = useSelector((state: RootState) => state.manageAppTodo);
    const [responseTodoFromApi, setResponseTodoFrommApi] = useState<any>([]);
    const ref = useRef(false);
    const refCloneListTodo = useRef<any>(listTodoSendServer);
    const dispatchOfRedux = useDispatch();
    //Define Call api
    type typeDataForAdd = Omit<typeOfTodo, '_id'>;
    async function PromiseALLCreateTodo() {
        const createTodo = (dataForAdd: typeDataForAdd) => axiosTodo.post('/todos', dataForAdd);
        try {
            const list = listTodoSendServer.map((element, index) => index && createTodo(element));
            const result = await Promise.all(list);
            setResponseTodoFrommApi(result);
        } catch (error) {
            console.log('error at PromiseALLCreateTodo>>>', error);
        }
    }

    useEffect(() => {
        if (valueFormVerify && listTodoSendServer.length > 1) {
            console.log('only 1 times>>>', 999);
            PromiseALLCreateTodo();
            ref.current = false;
        }
    }, [valueFormVerify]);
    useEffect(() => {
        if (!ref.current && responseTodoFromApi.length > 0) {
            ref.current = true;
            console.log('responseTodoFromApi>>>', responseTodoFromApi);
            dispatchOfRedux(updateValueFormVerify(false));
            dispatchOfRedux(addManyTodoIntoList(DEFAULT_OF_LIST_TODO));
            setTimeout(() => {
                refetch();
            }, 1000);
        }
    });
}
export { createTodoHandle };
/* 
Note 1 : when send listTodo to server : if some thing is error , will some todo can not send to ser ver , 
that todo save at listTodoSendSer ver 
*/

/* **********o0o************* */
type typePropsOfUpdate = {
    dataSendServer: typeOfTodo;
    refetch: () => void;
    dispatchRedux: Dispatch<AnyAction>;
};
const updateTodoForPageProject = ({ dataSendServer, refetch, dispatchRedux }: typePropsOfUpdate) => {
    updateTodoHandle(dataSendServer)
        .then((res) => {
            if (res.data) {
                // reset state IdAndKindOfForm--> Default value
                dispatchRedux(changeIdAndKindOfForm(ID_AND_KIND_OF_FORM));
                //refetch Api
                refetch();
                //close form
                dispatchRedux(hiddenFormAddEdit());
            } else {
                toast.error('update to do Fail');
            }
        })
        .catch((error) => {
            handleError({ error, myMessage: 'Update to do Fail catch' });
        });
};
export { updateTodoForPageProject };
