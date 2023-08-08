import { FormEvent, ChangeEvent } from 'react';
import * as type from '~/data/type';
import { iconArrowTable } from '~/assets/icon';
import { useContextTable } from '../store_table/ContextTable';
import { addOrRemoveListUser } from '../ultils';
type typePropsHeaderTable = {
    listUser: type.typeOfListUser;
};
function HeaderTable({ listUser }: typePropsHeaderTable) {
    const { setStateTable, stateOfTable } = useContextTable();
    // console.log('stateOfTable>>>', stateOfTable);
    const handleChangeAll = (event: ChangeEvent<HTMLInputElement>) => {
        addOrRemoveListUser({
            isChecked: event.target.checked,
            listUser: listUser,
            stateOfTable: stateOfTable,
            setStateTable: setStateTable,
        });
    };
    // useMemo
    const isChecked = listUser.every((element) => stateOfTable.userIsChecked.includes(element));

    return (
        <tr className="text-center">
            <td>
                <label htmlFor="checkBoxHeader" className="w-[20px] h-[20px] block ">
                    <input
                        checked={isChecked}
                        type="checkbox"
                        id="checkBoxHeader"
                        className="w-full h-full cursor-pointer"
                        onChange={(e) => handleChangeAll(e)}
                    />
                </label>
            </td>
            <td>
                <div className="flex justify-between min-w-[86px]">
                    <span>ID</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[94px]">
                    <span>First Name</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[74px]">
                    <span>Age</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[154px]">
                    <span>Email</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[94px]">
                    <span>Eye Color</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[94px]">
                    <span>University</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[94px]">
                    <span>Gender</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[104px]">
                    <span>Blood Group</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td>
                <div className="flex justify-between min-w-[94px]">
                    <span>Height</span>
                    <img src={iconArrowTable} alt="" />
                </div>
            </td>
            <td colSpan={2}>
                <div className="min-w-[94px] flex justify-between">
                    Action <img src={iconArrowTable} alt="" />
                </div>
            </td>
        </tr>
    );
}
export default HeaderTable;
