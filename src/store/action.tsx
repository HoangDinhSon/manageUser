import {
    GET_ROW_PER_PAGE,
    GET_ORDINAL_NUMBER_PAGE,
    SET_CRITERIAL_FOR_FILTER,
    MAKE_LIST_FILTER,
    UPDATE_LIST_USER,
    TOGLE_DISPLAY_FILTER,
    TOGLE_DISPLAY_ASIDE_MENU,
    DISPLAY_FORM_VIEW_USER,
    CLOSE_FORM_VIEW_USER,
    VIEW_DATA_FOR_FORM_VIEW,
    GET_ID_FOR_EDIT,
    EDIT_USER,
    RESET_CRITERIAL_FOR_FILTER,
    
    ADD_NEW_USER,
    DISPLAY_IMPORT_FORM,
} from './constants';
import { TypeOfUser } from '../data/type/typePageAccounts';
import { typeOfListUser } from '../data/type';
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

const addNewUser =(newUser:any)=>({
    type:ADD_NEW_USER,
    payload:newUser,
})
const toggleImportForm = ()=>({
    type: DISPLAY_IMPORT_FORM,
})
const makeListFilter = (listFilter:typeOfListUser)=>({
    type: MAKE_LIST_FILTER,
    payload : listFilter,
})
// criterialForFilter là một object chứa các key:  gender, height,...
const setCriterialForFilter =(criterialForFilter:any)=>({
    type:SET_CRITERIAL_FOR_FILTER,
    payload:criterialForFilter
})
const resetCriterialForFilter=()=>({
    type :RESET_CRITERIAL_FOR_FILTER,
})

export {
    getRowPerPage,
    getOrdinalNumberPage,
    setCriterialForFilter,
    makeListFilter,
    upDateListUser,
    togleDisplayFilter,
    togleDisplayAsideMenu,
    displayFormViewUser,
    closeFormViewUser,
    viewDataUserForFORMVIEW,
    getIdForEdit,
    editUser,
    addNewUser,
    toggleImportForm,
    resetCriterialForFilter,
};

/*
action là một object 
*/
