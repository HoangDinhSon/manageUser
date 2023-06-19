import { NavLink } from 'react-router-dom';
import { iconArrowTable, IconEditUser, IconViewUser } from '../../../assets/icon';
import PaginationTable from './PaginationTable';
import { ContextState } from '../../../store';
import { actions } from '../../../store';
import { TypeOfUser } from '../../../type/typePageAccounts';
import { LINK_PAGE_ACCOUNT_EDIT } from '../../../constance_for_page';

function TableRowForHeader() {
    return (
        <tr className="text-center">
            <td>
                <div className="w-[20px]">
                    <input type="checkbox" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[86px]">
                    <span>ID</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>First Name</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Alias</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[154px]">
                    <span>Email</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Team</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Company</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Position</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Role</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Status</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td colSpan={2}>
                <div className="w-[94px] flex justify-between">
                    Action <img src={iconArrowTable} alt="" />
                </div>
            </td>
        </tr>
    );
}

function TableUser() {
    const [state, dispatch] = ContextState.useGlobalState();
    const listUser = state.resApi.users;
    const handleDisplayViewForm = (user: TypeOfUser) => {
        // console.log("🚀 ~ file: TableUser.tsx:73 ~ handleDisplayViewForm ~ user:", user)
        dispatch(actions.displayFormViewUser(user));
    };
    const handleGetID = (id: number | string) => {
        dispatch(actions.getIdForEdit(id));
    };

    return (
        <div className="bg-white overflow-x-auto ">
            <table>
                <thead>
                    <TableRowForHeader />
                </thead>
                <tbody>
                    {listUser?.map((user: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">
                                    <input type="checkbox" />
                                </td>
                                <td className="">{user?.id}</td>
                                <td className=" ">{user?.firstName}</td>
                                <td className="">{user?.alias}</td>
                                <td className="">{user?.email}</td>
                                <td className="">{user?.team}</td>
                                <td className="">{user?.company.name}</td>
                                <td className="">{user?.position}</td>
                                <td className="">{user?.role}</td>
                                <td className="">{user?.status}</td>
                                <td onClick={() => handleDisplayViewForm(user)}>
                                    <img src={IconViewUser} alt="" className="w-[50px] " />
                                </td>
                                <td>
                                    <NavLink to={LINK_PAGE_ACCOUNT_EDIT}>
                                        <img
                                            src={IconEditUser}
                                            alt=""
                                            className="w-[50px]"
                                            onClick={() => handleGetID(user.id)}
                                        />
                                    </NavLink>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <PaginationTable />
        </div>
    );
}

export default TableUser;
