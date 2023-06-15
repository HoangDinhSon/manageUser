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
const ROW_PER_PAGE_DEFAULT = 5;
const ORDINAL_NUMBER_PAGE_DEFAULT = 1;
const IS_DISPLAY_FILTER_DEFAULT = false;
const DISPLAY_ASIDE_MENU_DEFAULT = false;
const USE_FOR_FORM_VIEW_DEFAULT = {
    id: 0,
    firstName: 'DEFAULT',
    maidenName: 'DEFAULT',
    email: 'DEFAULT',
    company: 'DEFAULT',
    phone: 'DEFAULT',
};
const DISPLAY_FORM_VIEW_USER_DEFAULT = false;
type TypeStateGlobal = {
    rowPerPage: number;
    ordinalNumberPage: number;
    resApi: any;
    togleDisplayFiter: boolean;
    togleDisplayAsideMenu: boolean;
    UserForFormView: TypeOfUser;
    isDisplayFormView: boolean;
    UserForFormViewAfterCallApi: any;
};
const initState = {
    rowPerPage: ROW_PER_PAGE_DEFAULT,
    ordinalNumberPage: ORDINAL_NUMBER_PAGE_DEFAULT,
    resApi: {},
    togleDisplayFiter: IS_DISPLAY_FILTER_DEFAULT,
    togleDisplayAsideMenu: DISPLAY_ASIDE_MENU_DEFAULT,
    UserForFormView: USE_FOR_FORM_VIEW_DEFAULT,
    isDisplayFormView: DISPLAY_FORM_VIEW_USER_DEFAULT,
    UserForFormViewAfterCallApi: {},
};

function reducer(state: TypeStateGlobal, action: any) {
    switch (action.type) {
        case GET_ROW_PER_PAGE:
            return {
                ...state,
                rowPerPage: action.payload,
            };
        case GET_ORDINAL_NUMBER_PAGE:
            return {
                ...state,
                ordinalNumberPage: action.payload,
            };
        case UPDATE_LIST_USER: {
            return {
                ...state,
                resApi: action.payload,
            };
        }
        case TOGLE_DISPLAY_FILTER: {
            let isDisplay = !action.payload;
            return {
                ...state,
                togleDisplayFiter: isDisplay,
            };
        }
        case TOGLE_DISPLAY_ASIDE_MENU: {
            return {
                ...state,
                togleDisplayAsideMenu: !action.payload,
            };
        }
        case DISPLAY_FORM_VIEW_USER: {
            return {
                ...state,
                UserForFormView: action.payload,
                isDisplayFormView: true,
            };
        }
        case CLOSE_FORM_VIEW_USER: {
            return {
                ...state,
                isDisplayFormView: false,
            };
        }
        case VIEW_DATA_FOR_FORM_VIEW: {
            return {
                ...state,
                UserForFormViewAfterCallApi: action.payload,
            };
        }
        default:
            throw Error('action in valid hành động không phù hợp ');
    }
}
export { initState };
export default reducer;
