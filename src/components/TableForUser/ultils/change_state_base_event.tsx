
import { typeState, typeOfSetSate } from '../store_table/ContextTable';
import { removeUserFromList } from '~/custome_hook';
import * as type from '~/data/type';
type typeChangeOfStateBaseEvent = {
    isChecked: boolean;
    user: type.typeUserAfterCallApiBaseOnID;
    stateOfTable: typeState;
    setStateTable: typeOfSetSate;
};
function changeStateBaseEvent({ isChecked, user, stateOfTable ,setStateTable}: typeChangeOfStateBaseEvent) {
    if (isChecked) {
        stateOfTable.userIsChecked.push(user);
        setStateTable((prev) => ({
            ...prev,
            userIsChecked: stateOfTable.userIsChecked,
        }));
    } else {
        const listAfterRemove = removeUserFromList(stateOfTable.userIsChecked, user);
        setStateTable((prev) => ({
            ...prev,
            userIsChecked: listAfterRemove,
        }));
    }
}

export default changeStateBaseEvent;
