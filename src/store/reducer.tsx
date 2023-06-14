import { GET_ROW_PER_PAGE, GET_ORDINAL_NUMBER_PAGE, UPDATE_LIST_USER,TOGLE_DISPLAY_FILTER ,TOGLE_DISPLAY_ASIDE_MENU} from './constants';
const ROW_PER_PAGE_DEFAULT = 5;
const ORDINAL_NUMBER_PAGE_DEFAULT = 1;
const IS_DISPLAY_FILTER_DEFAULT= false;
const DISPLAY_ASIDE_MENU_DEFAULT = false ;
type TypeStateGlobal ={
    rowPerPage: number,
    ordinalNumberPage: number,
    resApi:any,
    togleDisplayFiter:boolean ,
    togleDisplayAsideMenu:boolean,
}
const initState = {
    rowPerPage: ROW_PER_PAGE_DEFAULT,
    ordinalNumberPage: ORDINAL_NUMBER_PAGE_DEFAULT,
    resApi: {},
    togleDisplayFiter:IS_DISPLAY_FILTER_DEFAULT,
    togleDisplayAsideMenu : DISPLAY_ASIDE_MENU_DEFAULT,
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
            return( {
                ...state,
                resApi:action.payload
            });
        }
        case TOGLE_DISPLAY_FILTER: {
            let isDisplay = !action.payload
            return({
                ...state,
                togleDisplayFiter:isDisplay,
            })
        }
        case TOGLE_DISPLAY_ASIDE_MENU: {
            return ({
                ...state,
                togleDisplayAsideMenu:!action.payload
            })
        }
        default:
            throw Error('action in valid hành động không phù hợp ');
    }
}
export { initState };
export default reducer;
