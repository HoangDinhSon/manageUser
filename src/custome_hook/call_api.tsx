import { useEffect, useState, useRef } from 'react';
import { axiosTodo } from '~/Api/axiosClient';
import { toast } from 'react-hot-toast';
import type { AxiosResponse } from 'axios';
import { typeOfTodo } from '~/data/type/typeGlobal';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateValueFormVerify,
    addManyTodoIntoList,
    ID_AND_KIND_OF_FORM,
    changeIdAndKindOfForm,
    hiddenFormAddEdit,
} from '~/app_redux/reducer_redux';
import { RootState } from '~/app_redux/store';
import { updateTodoHandle } from '~/Api/logTimeApi';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

function useGetData() {
    const [triggerFetching, setTriggerFetching] = useState(1);
    const [resForFetch, setDataOfRes] = useState<any>(null);
    const refetch = () => {
        setTriggerFetching((prev) => (prev += 1));
    };
    const getTodoHandleByUseEffect = async (setSate: (res: AxiosResponse<any, any>) => void) => {
        try {
            const res = await axiosTodo.get('/todos');
            if (res.data) {
                setSate(res);
            }
        } catch (error: any) {
            toast.error(`Oh some thing Error`);
        }
    };
    useEffect(() => {
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

function createTodoHandle(refetch: () => void) {
    const { listTodoSendServer, valueFormVerify } = useSelector((state: RootState) => state.manageAppTodo);
    const ref = useRef(false);
    const cloneListTodo = JSON.parse(JSON.stringify(listTodoSendServer));
    const refCloneListTodo = useRef(cloneListTodo);
    // console.log('reCloneListTodo>>>', refCloneListTodo);
    const dispatchOfRedux = useDispatch();
    //Define Call api
    type typeDataForAdd = Omit<typeOfTodo, '_id'>;
    const createTodo = (dataForAdd: typeDataForAdd, i: number) => {
        axiosTodo
            .post('/todos', dataForAdd)
            .then((res) => {
                if (res.data) {
                    console.log('resdata if success>>>', res.data);
                    refCloneListTodo.current.splice(i, 1);
                }
            })
            .catch(() => {
                toast.error(`can NOT create Todo `);
            });
    };
    // check length của listTodo và verify of User
    if (valueFormVerify && listTodoSendServer.length > 1 && !ref.current) {
        for (let i = 1; i < listTodoSendServer.length; i++) {
            createTodo(listTodoSendServer[i], i);
        }
        ref.current = true;
    }
    // when success or a part success xem Note 1
    if (ref.current === true) {
        // console.log('check ref current>>>', ref.current);
        setTimeout(() => {
            dispatchOfRedux(updateValueFormVerify(false));
            dispatchOfRedux(addManyTodoIntoList(refCloneListTodo.current));
            ref.current = false;
        }, 2000);
        setTimeout(() => {
            refetch();
        }, 2000);
    }
}
export { createTodoHandle };
/* 
Note 1 : when send listTodo to server : if some thing is error , will some todo can not send to ser ver , 
that todo save at listTodoSendSer ver 

*/

// const dispatchRedux = useDispatch();
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
        .catch(() => {
            toast.error('update to do Fail catch');
        });
};
export { updateTodoForPageProject };