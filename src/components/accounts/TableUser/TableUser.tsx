import { iconArrowTable ,IconEditUser, IconViewUser} from '../../../assets/icon';
import PaginationTable from './PaginationTable';
import { ContextState } from '../../../store';
import { actions } from '../../../store';
import { TypeOfUser } from '../../../type/typePageAccounts';

function TableRowForHeader() {
    return (
        <tr className="text-center">
            <td className="w-6">
                <input type="checkbox" />
            </td>
            <td className="w-[110px] ">ID</td>
            <td className="w-[118px] ">
                First Name
                <img src={iconArrowTable} alt="" className="inline " />
            </td>
            <td className="w-[110px]">
                Alias <img src={iconArrowTable} alt="" className="inline ml-[30px]" />
            </td>
            <td className="w-[178px]">
                Email <img src={iconArrowTable} alt="" className="inline ml-[30px]" />
            </td>
            <td className="w-[110px]">
                Team <img src={iconArrowTable} alt="" className="inline ml-[30px]" />
            </td>
            <td className="w-[210px]">
                <div className="flex">
                    <span>Company</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td className="">
                <div className="flex justify-between w-[110px] overflow-auto">
                    <span>Position</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td className="w-[110px]">
                Role <img src={iconArrowTable} alt="" className="inline ml-[30px]" />
            </td>
            <td className="w-[110px]">
                Status <img src={iconArrowTable} alt="" className="inline ml-[30px]" />
            </td>
            <td colSpan={2} className="w-[200px]">
                Action <img src={iconArrowTable} alt="" className="inline ml-[30px]" />
            </td>
        </tr>
    );
}
// function TableRowForBody(user: any) {
//     return (
//         <tr>
//             <td>
//                 <input type="checkbox" />
//             </td>
//             <td>{user?.id}</td>
//             <td>{user?.firstName}</td>
//             <td>{user?.alias}</td>
//             <td>{user?.email}</td>
//             <td>{user?.team}</td>
//             <td>{user?.company.name}</td>
//             <td>{user?.position}</td>
//             <td>{user?.role}</td>
//             <td>{user?.status}</td>
//             <td>{user?.action}</td>
//         </tr>
//     );
// }

function TableUser() {
    const [state, dispatch] = ContextState.useGlobalState();
    const listUser = state.resApi.users;
    const handleDisplayViewForm=( user:TypeOfUser) => {
        // console.log("🚀 ~ file: TableUser.tsx:73 ~ handleDisplayViewForm ~ user:", user)
        dispatch(actions.displayFormViewUser(user))

     
        
    }
    return (
        <div className="bg-white overflow-auto">
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
                                <td><img src={IconViewUser} alt="" className='w-[100px]' onClick={( )=>handleDisplayViewForm(user)} /></td>
                                <td><img src={IconEditUser} alt=""  className='w-[100px]'/></td>
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
