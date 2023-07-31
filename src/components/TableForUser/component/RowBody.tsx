import { NavLink } from 'react-router-dom';
import { IconViewUser, IconEditUser } from '~/assets/icon';

function RowBody({ user }: any) {
    const handleDisplayViewForm = (user: any) => {};
    const handleOnchange = (event: any) => {};
    const handleGetID = (id: any) => {};
    return (
        <tr>
            <td className="text-center">
                <input type="checkbox"  onChange={(event) => handleOnchange(event)} />
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
