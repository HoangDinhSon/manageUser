import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { typeOfTodo } from '~/data/type/typeGlobal';
import * as  CONSTANT from "~/data/constance_for_page/constant_global"
//1. default value :
const DEFAULT_OF_LIST_TODO = [
    {
        text: '',
        complete: false,
        author: '',
        createdDate: "",
    },
];
export const ID_AND_KIND_OF_FORM = {
    id: '',
    kindOfForm: CONSTANT.ADD,
};
//2.type
type todoFromFormAdd = Omit<typeOfTodo, '_id'>;
type typeListTodoSendServer = Array<todoFromFormAdd>;
type typeIdAndKindOfForm = {
    id: string;
    kindOfForm: string;
};

export interface typeInitialState {
    isDisplayFormAddEditViewPageProject: boolean;
    listTodoSendServer: typeListTodoSendServer;
    isDisplayFormVerify: boolean;
    valueFormVerify: boolean;
    idAndKindOfForm: typeIdAndKindOfForm;
}
//3. initial
const initialState: typeInitialState = {
    isDisplayFormAddEditViewPageProject: false, //name sate
    listTodoSendServer: DEFAULT_OF_LIST_TODO,
    isDisplayFormVerify: false,
    valueFormVerify: false,
    idAndKindOfForm: ID_AND_KIND_OF_FORM,
};
// 4. tạo reducer với các action
export const reducerSlice = createSlice({
    name: 'manageAppTodo', // name reducer
    initialState,
    reducers: {
        displayFormAddEdit: (state) => {
            //action
            state.isDisplayFormAddEditViewPageProject = true;
        },
        hiddenFormAddEdit: (state) => {
            state.isDisplayFormAddEditViewPageProject = false;
        },
        addTodoIntoList: (state, action: PayloadAction<todoFromFormAdd>) => {
            state.listTodoSendServer.push(action.payload);
        },
        deleteOneTodo: (state, action: PayloadAction<number>) => {
            state.listTodoSendServer.splice(action.payload, 1);
        },
        addManyTodoIntoList: (state, action: PayloadAction<todoFromFormAdd[]>) => {
            state.listTodoSendServer = [...action.payload];
        },
        setDefaultTodoList: (state) => {
            state.listTodoSendServer = DEFAULT_OF_LIST_TODO;
        },
        displayFormVerify: (state) => {
            state.isDisplayFormVerify = true;
        },
        hiddenFormVerify: (state) => {
            state.isDisplayFormVerify = false;
        },
        updateValueFormVerify: (state, action: PayloadAction<boolean>) => {
            state.valueFormVerify = action.payload;
        },
        changeIdAndKindOfForm: (state, action: PayloadAction<typeIdAndKindOfForm>) => {
            state.idAndKindOfForm={ ...action.payload}
        },
    },
});
export const {
    displayFormAddEdit,
    hiddenFormAddEdit,
    addTodoIntoList,
    displayFormVerify,
    hiddenFormVerify,
    updateValueFormVerify,
    setDefaultTodoList,
    addManyTodoIntoList,
    deleteOneTodo,
    changeIdAndKindOfForm,
} = reducerSlice.actions;
export default reducerSlice.reducer;
/* 
Redux reducer : 
step 1: make reducer (initial state , and reducer )
step 2: in store run it and save it in key 
*/
