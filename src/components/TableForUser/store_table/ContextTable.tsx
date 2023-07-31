import { createContext, useState, useContext } from 'react';
import { Dispatch, SetStateAction, ReactElement } from 'react';
/* type */
type typeState = {
    rowPerPage: number;
    ordinalPage: number;
};
/* CONSTANCE */
const DEFAULT_ROW_PER_PAGE = 5;
const DEFAULT_ORDINAL_PAGE = 1;
/* initial */
const initState: typeState = { rowPerPage: DEFAULT_ROW_PER_PAGE, ordinalPage: DEFAULT_ORDINAL_PAGE };
/* initialization value  */
let stateOfTable: typeState = initState;
let setStateTable: Dispatch<SetStateAction<typeState>> = () => {};
/* set up  */
const Context = createContext<{
    stateOfTable: typeState;
    setStateTable: Dispatch<SetStateAction<typeState>>;
}>({
    stateOfTable,
    setStateTable,
});
const useContextTable = () => useContext(Context);

function ContextTableProvider({ children }: { children: ReactElement }) {
    const [stateOfTable, setStateTable] = useState<any>(initState);
    return (
        <Context.Provider value={{ stateOfTable: stateOfTable, setStateTable: setStateTable }}>
            {children}
        </Context.Provider>
    );
}
export { DEFAULT_ROW_PER_PAGE, DEFAULT_ORDINAL_PAGE };
export { ContextTableProvider,useContextTable };
export type { typeState };
