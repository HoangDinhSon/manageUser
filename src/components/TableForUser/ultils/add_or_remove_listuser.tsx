import { typeState, typeOfSetSate } from '../store_table/ContextTable';
import { removeListUserInOtherList } from '~/custome_hook';
import * as type from '~/data/type';
type typeChangeOfStateBaseEvent = {
    isChecked: boolean;
    listUser: type.typeOfListUser;
    stateOfTable: typeState;
    setStateTable: typeOfSetSate;
};
function addOrRemoveListUser({ isChecked, listUser, stateOfTable, setStateTable }: typeChangeOfStateBaseEvent) {
    if (isChecked) {// true add
        setStateTable((prev) => ({
            ...prev,
            userIsChecked: [...stateOfTable.userIsChecked, ...listUser],
        }));
    } else {// false remove 
        const listAfterRemove = removeListUserInOtherList(stateOfTable.userIsChecked, listUser);
        setStateTable((prev) => ({
            ...prev,
            userIsChecked: listAfterRemove,
        }));
    }
}

export default addOrRemoveListUser;
