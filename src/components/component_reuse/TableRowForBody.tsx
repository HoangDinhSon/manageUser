import { typeUserAfterCallApiBaseOnID } from '../../data/type';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import { IconViewUser, IconEditUser } from '../../assets/icon';
import { LINK_PAGE_ACCOUNT_EDIT } from '../../data/constance_for_page';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as redux from '~/app_redux';
import { hasUserInList } from '~/custome_hook';

function TableRowForBody({ user }: any) {
    const { listUserIsSelected } = useSelector((state: redux.RootState) => state.listUserIsSelect);
    const {addOneUser,removeOneUser}= redux
    const dispatchOfRedux = useDispatch();
    const [, dispatch] = useGlobalState();
    const handleDisplayViewForm = (user: typeUserAfterCallApiBaseOnID) => {
        dispatch(actions.displayFormViewUser(user));
    };
    const handleGetID = (id: number | string) => {
        dispatch(actions.getIdForEdit(id));
    };
    const isChecked = hasUserInList(listUserIsSelected, user);
    const handleOnchange =(event:any)=>{
        if (event.target.checked){
            dispatchOfRedux(addOneUser(user))
        }else{
            dispatchOfRedux(removeOneUser(user))
        }
        console.log('event>>>', event.target.checked);
    }
    return (
        <tr>
            <td className="text-center">
                <input type="checkbox" checked={isChecked} onChange={(event) => handleOnchange(event)} />
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
                <NavLink to="edit">
                    <img src={IconEditUser} alt="" className="w-[50px]" onClick={() => handleGetID(user.id)} />
                </NavLink>
            </td>
        </tr>
    );
}

export default TableRowForBody;
