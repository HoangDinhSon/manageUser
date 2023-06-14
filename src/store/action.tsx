import { GET_ROW_PER_PAGE, GET_ORDINAL_NUMBER_PAGE, UPDATE_LIST_USER,TOGLE_DISPLAY_FILTER, TOGLE_DISPLAY_ASIDE_MENU } from './constants';
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
const togleDisplayFilter = (payload: any)=>({
    type: TOGLE_DISPLAY_FILTER,
    payload:payload ,
})
const togleDisplayAsideMenu= (payload:boolean)=>({
    type: TOGLE_DISPLAY_ASIDE_MENU,
    payload:payload ,
})

export { getRowPerPage, getOrdinalNumberPage,upDateListUser,togleDisplayFilter,togleDisplayAsideMenu};

/*
action là một object 
*/
