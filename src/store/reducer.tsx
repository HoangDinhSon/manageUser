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
    ADD_NEW_USER,
    DISPLAY_IMPORT_FORM,
    RESET_CRITERIAL_FOR_FILTER,
} from './constants';
import { TypeOfUser } from '../type/typePageAccounts';
import { typeKeyOfCriterial, typeUserAfterCallApiBaseOnID } from '../type';
import { CRITERIAL_FOR_FILTER_DEFAULT } from '../constance_for_page';
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
import { findIndex } from '../handlelogic';
const ID_FOR_EDIT_DEFAULT = 0;
const DISPLAY_FORM_VIEW_USER_DEFAULT = false;
const IS_DISPLAY_IMPORT_FORM_DEFAULT = false;
type TypeStateGlobal = {
    rowPerPage: number;
    ordinalNumberPage: number;
    resApi: any; //Array<any>
    isDisplayFiler: boolean;
    isDisplayAsideMenu: boolean;
    UserForFormView: TypeOfUser;
    isDisplayFormView: boolean;
    UserForFormViewAfterCallApi: typeUserAfterCallApiBaseOnID;
    idForEdit: number;
    userAfterEdit: any; //object
    isDisplayImportForm: boolean;
    listFilter: Array<any>;
    criterialForFilter: any; //object
};
const initState = {
    rowPerPage: ROW_PER_PAGE_DEFAULT,
    ordinalNumberPage: ORDINAL_NUMBER_PAGE_DEFAULT,
    resApi: {},
    isDisplayFiler: IS_DISPLAY_FILTER_DEFAULT,
    isDisplayAsideMenu: DISPLAY_ASIDE_MENU_DEFAULT,
    UserForFormView: USE_FOR_FORM_VIEW_DEFAULT,
    isDisplayFormView: DISPLAY_FORM_VIEW_USER_DEFAULT,
    UserForFormViewAfterCallApi: {},
    idForEdit: ID_FOR_EDIT_DEFAULT,
    userAfterEdit: {}, // kiểm tra xem có dùng tới ko
    isDisplayImportForm: IS_DISPLAY_IMPORT_FORM_DEFAULT,
    listFilter: [],
    criterialForFilter: CRITERIAL_FOR_FILTER_DEFAULT,
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
                isDisplayFiler: isDisplay,
            };
        }
        case TOGLE_DISPLAY_ASIDE_MENU: {
            return {
                ...state,
                isDisplayAsideMenu: !action.payload,
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
        case GET_ID_FOR_EDIT: {
            return {
                ...state,
                idForEdit: action.payload,
            };
        }
        case EDIT_USER: {
            const index = findIndex(state.idForEdit, state.resApi.users);
            state.resApi.users.splice(index, 1, action.payload);
            return {
                ...state,
            };
        }

        case ADD_NEW_USER: {
            return {
                ...state,
                resApi: { ...state.resApi, users: [action.payload, ...state.resApi.users] },
            };
        }
        case DISPLAY_IMPORT_FORM: {
            return {
                ...state,
                isDisplayImportForm: !state.isDisplayImportForm,
            };
        }
        case MAKE_LIST_FILTER: {
            let keyOfCriterial: typeKeyOfCriterial = Object.keys(state.criterialForFilter);
            // nhưng cái criterial  nào dc chọn nằm ở đây
            const newListCriterial: typeKeyOfCriterial = keyOfCriterial.map((key: any) => {
                if (state.criterialForFilter[key][key] === true) {
                    return key;
                }
            });

            let unique: any[] = [];
            unique.push(action.payload[0]);
            action.payload.forEach((item: any) => {
                let flag = false;
                unique.forEach((element) => {
                    if (item.id == element.id) {
                        flag = true;
                    }
                });
                if (flag === false) {
                    unique.push(item);
                }
            });
            let listUserSuitableCriterial: any[] = [];
            unique.map((user) => {
                let flag = false;
                newListCriterial.map((criterial) => {
                    if (user[criterial] !== state.criterialForFilter[criterial]?.select) {
                        flag = true;
                    }
                });
                if (flag === false) {
                    listUserSuitableCriterial.push(user);
                }
            });

            return {
                ...state,
                listFilter: [...listUserSuitableCriterial],
            };
        }
        case SET_CRITERIAL_FOR_FILTER: {
            return {
                ...state,
                criterialForFilter: action.payload,
            };
        }
        case RESET_CRITERIAL_FOR_FILTER: {
            return {
                ...state,
                criterialForFilter: CRITERIAL_FOR_FILTER_DEFAULT,
            };
        }

        default:
            throw Error('action in valid hành động không phù hợp ');
    }
}
export { initState };
export default reducer;
