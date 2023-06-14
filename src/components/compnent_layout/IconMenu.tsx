/*
chức năng : khi hover vào icon thì hiện thông tin chi tiết 
dùng  : group , group-hover tailwindcss
*/

function IconMenu({ icon, iconNameMenu, ...props }: any) {
    return (
        <div className="group relative " {...props}>
            <div className="hidden group-hover:!block absolute top-[50%] left-[32px] -translate-y-[50%] h-[26px] w-[105px]  object-cover">
                <img src={iconNameMenu} alt="" className="" />
            </div>
            <img src={icon} alt="" className="" />
        </div>
    );
}
export default IconMenu;
