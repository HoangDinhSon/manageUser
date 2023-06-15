import {
    GET_ROW_PER_PAGE,
    GET_ORDINAL_NUMBER_PAGE,
    UPDATE_LIST_USER,
    TOGLE_DISPLAY_FILTER,
    TOGLE_DISPLAY_ASIDE_MENU,
    DISPLAY_FORM_VIEW_USER,
    CLOSE_FORM_VIEW_USER,
    VIEW_DATA_FOR_FORM_VIEW,
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

export {
    getRowPerPage,
    getOrdinalNumberPage,
    upDateListUser,
    togleDisplayFilter,
    togleDisplayAsideMenu,
    displayFormViewUser,
    closeFormViewUser,
    viewDataUserForFORMVIEW,
};

/*
action là một object 
*/
