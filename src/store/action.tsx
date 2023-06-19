import {
    GET_ROW_PER_PAGE,
    GET_ORDINAL_NUMBER_PAGE,
    UPDATE_LIST_USER,
    TOGLE_DISPLAY_FILTER,
    TOGLE_DISPLAY_ASIDE_MENU,
    DISPLAY_FORM_VIEW_USER,
    CLOSE_FORM_VIEW_USER,
    VIEW_DATA_FOR_FORM_VIEW,
    GET_ID_FOR_EDIT,
    EDIT_USER,
    DISPLAY_IMPORT_FORM,
    ADD_NEW_USER
} from './constants';
import { TypeOfUser } from '../type/typePageAccounts';
const getRowPerPage = (payload: any) => ({
    type: GET_ROW_PER_PAGE,
    payload: payload,
});
const getOrdinalNumberPage = (payload: any) => ({
    type: GET_ORDINAL_NUMBER_PAGE,
    payload: payload,
});
const upDateListUser = (payload: any) => ({
    type: UPDATE_LIST_USER,
    payload: payload,
});
const togleDisplayFilter = (payload: any) => ({
    type: TOGLE_DISPLAY_FILTER,
    payload: payload,
});
const togleDisplayAsideMenu = (payload: boolean) => ({
    type: TOGLE_DISPLAY_ASIDE_MENU,
    payload: payload,
});

const displayFormViewUser = (user: TypeOfUser) => ({
    type: DISPLAY_FORM_VIEW_USER,
    payload: user,
});
const closeFormViewUser = () => ({
    type: CLOSE_FORM_VIEW_USER,
});
const viewDataUserForFORMVIEW  =(payload:any)=>({
    type: VIEW_DATA_FOR_FORM_VIEW,
    payload:payload,

})
const getIdForEdit =(idForEdit:number|string)=>({
    type:GET_ID_FOR_EDIT,
    payload:idForEdit
})

type userAfterEdit = {}// object chứa các key value 
const editUser =(userAfterEdit:any)=>({
    type:EDIT_USER,
    payload:userAfterEdit,
})
const add_new_user =(newUser:any)=>({
    type:ADD_NEW_USER,
    payload:newUser,
})
const toggleImportForm = ()=>({
    type: DISPLAY_IMPORT_FORM,
})

export {
    getRowPerPage,
    getOrdinalNumberPage,
    upDateListUser,
    togleDisplayFilter,
    togleDisplayAsideMenu,
    displayFormViewUser,
    closeFormViewUser,
    viewDataUserForFORMVIEW,
    getIdForEdit,
    editUser,
    add_new_user,
    toggleImportForm,
};

/*
action là một object 
*/
