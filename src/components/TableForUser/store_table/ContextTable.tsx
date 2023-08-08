import { createContext, useState, useContext } from 'react';
import { Dispatch, SetStateAction, ReactElement } from 'react';
import * as type from '~/data/type';
/*1. type */
type typeState = {
    rowPerPage: number;
    ordinalPage: number;
    userIsChecked: type.typeOfListUser;
};
type typeOfSetSate = Dispatch<SetStateAction<typeState>>;
type typePagination = Pick<typeState, 'rowPerPage' | 'ordinalPage'>;
type typeOnChangePagination =(payload: typePagination) => void
/*2. constant */
const DEFAULT_ROW_PER_PAGE = 5;
const DEFAULT_ORDINAL_PAGE = 1;
const DEFAULT_LIST_USER_IS_CHECKED: type.typeOfListUser = [];
/*3. initial */
const initState: typeState = {
    rowPerPage: DEFAULT_ROW_PER_PAGE,
    ordinalPage: DEFAULT_ORDINAL_PAGE,
    userIsChecked: DEFAULT_LIST_USER_IS_CHECKED,
};
/* initialization value  */
let stateOfTable: typeState = initState;
let setStateTable: typeOfSetSate = () => {};
/* set up  */
const Context = createContext<{
    stateOfTable: typeState;
    setStateTable: Dispatch<SetStateAction<typeState>>;
}>({
    stateOfTable,
    setStateTable,
});
const useContextTable = () => useContext(Context);
type typePropsContext = {
    children: ReactElement;
};
function ContextTableProvider({ children }: typePropsContext) {
    const [stateOfTable, setStateTable] = useState<any>(initState);
    return (
        <Context.Provider value={{ stateOfTable: stateOfTable, setStateTable: setStateTable }}>
            {children}
        </Context.Provider>
    );
}
export { DEFAULT_ROW_PER_PAGE, DEFAULT_ORDINAL_PAGE, initState };
export { ContextTableProvider, useContextTable };
export type { typeState, typeOfSetSate, typePagination,typeOnChangePagination };
