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
    GET_ID_OF_TODO_PAGE_STACK,
    TOGGLE_EDIT_ADD_PAGE_STACK,
    SET_ID_TODO_PAGE_STACK_TO_DEFAULT,
    TOGGLE_DISPLAY_VIEW_TODO_STACK,
    DISPLAY_VIEW_TODO_STACK,
    HIDDEN_VIEW_TODO_STACK,
} from './constants';
import { typeUserAfterCallApiBaseOnID } from '../data/type';
import { CRITERIAL_FOR_FILTER_DEFAULT } from '../data/constance_for_page';
const ROW_PER_PAGE_DEFAULT = 5;
const ORDINAL_NUMBER_PAGE_DEFAULT = 1;
const IS_DISPLAY_FILTER_DEFAULT = false;
const DISPLAY_ASIDE_MENU_DEFAULT = false;
const USE_FOR_FORM_VIEW_DEFAULT: typeUserAfterCallApiBaseOnID = {
    id: 0,
    firstName: '',
    lastName: 'string',
    maidenName: 'string',
    age: 11, // phai la số có 2 chữ số và lớn hơn
    gender: 'string',
    email: 'string',
    phone: 'string',
    username: 'string',
    password: 'string',
    birthDate: 'string',
    image: 'string',
    bloodGroup: 'string',
    height: 0, // là số
    weight: 0, // là số
    eyeColor: 'string',
    hair: {
        color: 'string',
        type: 'string',
    },
    domain: 'string',
    ip: 'string',
    address: {
        address: 'string',
        city: 'string',
        coordinates: {
            lat: 0, // là số
            lng: 0, // là số
        },
        postalCode: 'string',
        state: 'string',
    },
    macAddress: 'string',
    university: 'string',
    bank: {
        cardExpire: 'string',
        cardNumber: 'string',
        cardType: 'string',
        currency: 'string',
        iban: 'string',
    },
    company: {
        address: {
            address: 'string',
            city: 'string',
            coordinates: {
                lat: 0, // là số
                lng: 0, // là số
            },
            postalCode: 'string',
            state: 'string',
        },
        department: 'string',
        name: 'string',
        title: 'string',
    },
    ein: 'string',
    ssn: 'string',
    userAgent: 'string',
};
import { findIndex } from '../handlelogic';
import { typeOfListUser, OutPutFormFilter } from '../data/type';
const ID_FOR_EDIT_DEFAULT = 0;
const DISPLAY_FORM_VIEW_USER_DEFAULT = false;
const IS_DISPLAY_IMPORT_FORM_DEFAULT = false;
const DEFAULT_TODO_PAGE_STACK = '';
type TypeStateGlobal = {
    rowPerPage: number;
    ordinalNumberPage: number;
    resApi: any; //Array<any>
    isDisplayFiler: boolean;
    isDisplayAsideMenu: boolean;
    UserForFormView: typeUserAfterCallApiBaseOnID;
    isDisplayFormView: boolean;
    UserForFormViewAfterCallApi: typeUserAfterCallApiBaseOnID;
    idForEdit: number;
    isDisplayImportForm: boolean;
    listFilter: Array<any>;
    criterialForFilter: OutPutFormFilter; //object
    idOfTodoForPageStack: string; // id dành cho edit
    // idForViewOfPageStack: string; // id dành chi view
    isDisplayEditAndAddPageStack: boolean;
    isDisplayTodoViewOfPageStack: boolean;
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
    isDisplayImportForm: IS_DISPLAY_IMPORT_FORM_DEFAULT,
    listFilter: [],
    criterialForFilter: CRITERIAL_FOR_FILTER_DEFAULT,
    idOfTodoForPageStack: DEFAULT_TODO_PAGE_STACK,
    // idForViewOfPageStack: '',
    isDisplayEditAndAddPageStack: false,
    isDisplayTodoViewOfPageStack: false,
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
            const isDisplay = !action.payload;
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
            const keyOfCriterial: string[] = Object.keys(state.criterialForFilter);
            const payloadFromFilter: typeOfListUser = action.payload;
            // nhưng cái criterial  nào dc chọn nằm ở đây
            const newListCriterial: string[] = keyOfCriterial.filter((key) => {
                const valueOfFirstKey = state.criterialForFilter[key as keyof typeof state.criterialForFilter];
                const valueOfSecondKey = valueOfFirstKey[key as keyof typeof valueOfFirstKey];
                // typeof valueSecondkey is boolean why at here string|number
                if (!!valueOfSecondKey === true) {
                    return true;
                }
            });

            /* payloadFromFilter là một mảng chứa các user trong mảng này có thể có lặp lại 2 user giống nhau nên dựa vào id để xóa các user trùng nhau
             */
            const unique: typeOfListUser = [];
            unique.push(action.payload[0]);
            payloadFromFilter.forEach((item: any) => {
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
            /* 
                sau khi có unique : là danh sách user không trùng nhau , user nào có đủ các criterial thì chép vào mảng mới 
            
            */
            const listUserSuitableCriterial: typeOfListUser = [];
            unique.map((user) => {
                let flag = false;
                newListCriterial.map((criterial) => {
                    if (
                        user[criterial as keyof typeof user] !==
                        state.criterialForFilter[criterial as keyof typeof state.criterialForFilter]?.select
                    ) {
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
        case GET_ID_OF_TODO_PAGE_STACK: {
            return {
                ...state,
                idOfTodoForPageStack: action.payload,
            };
        }
        case TOGGLE_EDIT_ADD_PAGE_STACK: {
            return {
                ...state,
                isDisplayEditAndAddPageStack: !state.isDisplayEditAndAddPageStack,
            };
        }
        case SET_ID_TODO_PAGE_STACK_TO_DEFAULT: {
            return {
                ...state,
                idOfTodoForPageStack: DEFAULT_TODO_PAGE_STACK,
            };
        }
        case DISPLAY_VIEW_TODO_STACK: {
            return {
                ...state,
                isDisplayTodoViewOfPageStack: true,
            };
        }
        case HIDDEN_VIEW_TODO_STACK: {
            return {
                ...state,
                isDisplayTodoViewOfPageStack: false,
            };
        }

        default:
            throw Error('action in valid hành động không phù hợp ');
    }
}
export { initState };
export default reducer;
