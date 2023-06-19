import { NavLink, Link } from 'react-router-dom';
import { iconArrowTable, IconEditUser, IconViewUser } from '../../../assets/icon';
import PaginationTable from './PaginationTable';
import { ContextState } from '../../../store';
import { actions } from '../../../store';
import { TypeOfUser } from '../../../type/typePageAccounts';
import { LINK_PAGE_ACCOUNT_EDIT } from '../../../constance_for_page';

function TDHeader({ header, width }: any) {
    const classOfCss = `flex justify-between w-[${width}]`;
    return (
        <td>
            <div className={classOfCss}>
                <span>{header}</span>
                <img src={iconArrowTable} alt="" />
            </div>
        </td>
    );
}
function TableRowForHeader() {
    return (
        <tr className="text-center">
            <td>
                <div className="w-[44px]">
                    <input type="checkbox" />
                </div>
            </td>
            <TDHeader header="ID" width={'110px'} />
            <TDHeader header="First Name" width={'308px'} />
            <TDHeader header="Alias" width={'258px'} />
            <TDHeader header="Email" width={'178px'} />
            <TDHeader header="Team" width={'128px'} />
            <TDHeader header="Company" width={'128px'} />
            <TDHeader header="Position" width={'128px'} />
            <TDHeader header="Role" width={'128px'} />
            <TDHeader header="Status" width={'128px'} />
            <td colSpan={2}>
                <div className="w-[100px] flex justify-between">
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
                    {listUser?.map((user: any) => {
                        return (
                            <tr key={user?.id}>
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
