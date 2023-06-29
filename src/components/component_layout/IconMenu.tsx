/*
chức năng : khi hover vào icon thì hiện thông tin chi tiết 
dùng  : group , group-hover tailwindcss
*/
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//type name :string
//...props là một dạng của Atribute của thẻ div
function IconMenu({ icon, iconNameMenu, name, ...props }: any) {
    const location = useLocation();
    const bgBaseAdress: boolean = location.pathname.search(name) !== -1; // tìm thấy
    return (
        <div
            className={
                bgBaseAdress
                    ? 'group relative bg-[#FFF3F4] outline outline-[#FFF3F4] outline-[13px] rounded-[1px] cursor-pointer'
                    : 'group relative cursor-pointer'
            }
            {...props}
        >
            <div className="hidden group-hover:!block absolute top-[50%] left-[32px] -translate-y-[50%] h-[30px] w-[200px]  object-cover">
                <img src={iconNameMenu} alt="" className="" />
            </div>
            <NavLink to={name}>
            <img src={icon} alt="" />
            </NavLink>
        </div>
    );
}
export default IconMenu;
