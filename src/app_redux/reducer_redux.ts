import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { typeOfTodo } from '~/data/type/typeGlobal';
//1. default value :
const DEFAULT_OF_LIST_TODO = [
    {
        text: '',
        complete: false,
        author: '',
        createdDate: '',
    },
];
//2.type
type todoFromFormAdd = Omit<typeOfTodo, '_id'>;
type typeListTodoSendServer = Array<todoFromFormAdd>;

export interface typeInitialState {
    isDisplayFormAddEditViewPageProject: boolean;
    listTodoSendServer: typeListTodoSendServer;
    isDisplayFormVerify: boolean;
    valueFormVerify: boolean;
}
//3. initial
const initialState: typeInitialState = {
    isDisplayFormAddEditViewPageProject: false, //name sate
    listTodoSendServer: DEFAULT_OF_LIST_TODO,
    isDisplayFormVerify: false,
    valueFormVerify: false,
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
        displayFormVerify: (state) => {
            state.isDisplayFormVerify = true;
        },
        hiddenFormVerify: (state) => {
            state.isDisplayFormVerify = false;
        },
        updateValueFormVerify: (state, action: PayloadAction<boolean>) => {
            state.valueFormVerify = action.payload;
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
} = reducerSlice.actions;
export default reducerSlice.reducer;
