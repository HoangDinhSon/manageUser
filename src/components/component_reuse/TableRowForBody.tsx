import { typeUserAfterCallApiBaseOnID } from '../../data/type';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import { IconViewUser, IconEditUser } from '../../assets/icon';
import { LINK_PAGE_ACCOUNT_EDIT } from '../../data/constance_for_page';
import { NavLink } from 'react-router-dom';

function TableRowForBody({ user}:any) {
    const [, dispatch] = useGlobalState();
    const handleDisplayViewForm = (user: typeUserAfterCallApiBaseOnID) => {
        dispatch(actions.displayFormViewUser(user));
    };
    const handleGetID = (id: number | string) => {
        dispatch(actions.getIdForEdit(id));
    };
    return (
        <tr >
            <td className="text-center">
                <input type="checkbox" />
            </td>
            <td className="">{user?.id}</td>
            <td className=" ">{user?.firstName}</td>
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
                <NavLink to={LINK_PAGE_ACCOUNT_EDIT}>
                    <img src={IconEditUser} alt="" className="w-[50px]" onClick={() => handleGetID(user.id)} />
                </NavLink>
            </td>
        </tr>
    );
}

export default TableRowForBody;
