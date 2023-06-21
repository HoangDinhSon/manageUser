import { iconArrowTable } from "../../assets/icon";
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
                    <span>Age</span>
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
                    <span>Eye Color</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>University</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Gender</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[74px]">
                    <span>Blood Group</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between w-[94px]">
                    <span>Height</span>
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
export default TableRowForHeader 