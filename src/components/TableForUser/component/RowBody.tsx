import { NavLink } from 'react-router-dom';
import { IconViewUser, IconEditUser } from '~/assets/icon';
import { useContextTable } from '../store_table/ContextTable';
import { hasUserInList, removeUserFromList } from '~/custome_hook';
import * as type from '~/data/type';
import { useGlobalState } from '~/store/Provider';
import { actions } from '~/store';

import { changeStateBaseEvent } from '../ultils';
type typeProps = {
    user: type.typeUserAfterCallApiBaseOnID;
};
function RowBody({ user }: typeProps) {
    const [state, dispatch] = useGlobalState();
    const { setStateTable, stateOfTable } = useContextTable();
    const isChecked = hasUserInList(stateOfTable.userIsChecked, user);

    const handleDisplayViewForm = (user: type.typeUserAfterCallApiBaseOnID) => {
        dispatch(actions.displayFormViewUser(user));
    };
    const handleOnchange = (event: any) => {
        changeStateBaseEvent({
            isChecked: event.target.checked,
            user: user,
            setStateTable: setStateTable,
            stateOfTable: stateOfTable,
        });
    };
    const handleGetID = (id: any) => {
        dispatch(actions.getIdForEdit(id));
        // console.log('DATA>>>', 999);
    };

    return (
        <tr>
            <td className="text-center">
                <input
                    checked={isChecked}
                    type="checkbox"
                    onChange={(event) => handleOnchange(event)}
                    className="w-[20px] h-[20px] block cursor-pointer"
                />
            </td>
            <td className="">{user?.id}</td>
            <td className="">{user?.firstName}</td>
            <td className="">{user?.age}</td>
            <td className="">{user?.email}</td>
            <td className="">{user?.eyeColor}</td>
            <td className="">{user?.university}</td>
            <td className="">{user?.gender}</td>
            <td className="">{user?.bloodGroup}</td>
            <td className="">{user?.height}</td>
            <td onClick={() => handleDisplayViewForm(user)}>
                <img src={IconViewUser} alt="" className="w-[50px] cursor-pointer " />
            </td>
            <td>
                <NavLink to="edit">
                    <img src={IconEditUser} alt="" className="w-[50px]" onClick={() => handleGetID(user.id)} />
                </NavLink>
            </td>
        </tr>
    );
}

export default RowBody;
