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
    GET_ID_OF_TODO_PAGE_STACK,
    TOGGLE_EDIT_ADD_PAGE_STACK,
    SET_ID_TODO_PAGE_STACK_TO_DEFAULT,
    TOGGLE_DISPLAY_VIEW_TODO_STACK,
    DISPLAY_VIEW_TODO_STACK,
    HIDDEN_VIEW_TODO_STACK,
} from './constants';
import { typeUserAfterCallApiBaseOnID, OutPutFormFilter } from '../data/type';
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

const displayFormViewUser = (user: typeUserAfterCallApiBaseOnID) => ({
    type: DISPLAY_FORM_VIEW_USER,
    payload: user,
});
const closeFormViewUser = () => ({
    type: CLOSE_FORM_VIEW_USER,
});
const viewDataUserForFORMVIEW = (payload: any) => ({
    type: VIEW_DATA_FOR_FORM_VIEW,
    payload: payload,
});
const getIdForEdit = (idForEdit: number | string) => ({
    type: GET_ID_FOR_EDIT,
    payload: idForEdit,
});
const editUser = (userAfterEdit: any) => ({
    type: EDIT_USER,
    payload: userAfterEdit,
});

const addNewUser = (newUser: any) => ({
    type: ADD_NEW_USER,
    payload: newUser,
});
const toggleImportForm = () => ({
    type: DISPLAY_IMPORT_FORM,
});
const makeListFilter = (listFilter: typeOfListUser) => ({
    type: MAKE_LIST_FILTER,
    payload: listFilter,
});
// criterialForFilter là một object chứa các key:  gender, height,...
const setCriterialForFilter = (criterialForFilter: OutPutFormFilter) => ({
    type: SET_CRITERIAL_FOR_FILTER,
    payload: criterialForFilter,
});
const resetCriterialForFilter = () => ({
    type: RESET_CRITERIAL_FOR_FILTER,
});
const getIdOfTodoPageStack = (id: string) => ({
    type: GET_ID_OF_TODO_PAGE_STACK,
    payload: id,
});
const toggleEditAddPageStack = () => ({
    type: TOGGLE_EDIT_ADD_PAGE_STACK,
});
const setIdTodoPageStackToDefault = () => ({
    type: SET_ID_TODO_PAGE_STACK_TO_DEFAULT,
});
const toggleDisplayViewTodo = () => ({
    type: TOGGLE_DISPLAY_VIEW_TODO_STACK,
});
const displayViewTodoStack = () => ({
    type: DISPLAY_VIEW_TODO_STACK,
    // payload: id,
});
const hiddenViewTodoStack =()=>({
    type:HIDDEN_VIEW_TODO_STACK,
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
    getIdOfTodoPageStack,
    toggleEditAddPageStack,
    setIdTodoPageStackToDefault,
    toggleDisplayViewTodo,
    displayViewTodoStack,
    hiddenViewTodoStack,
};

/*
action là một object 
*/
