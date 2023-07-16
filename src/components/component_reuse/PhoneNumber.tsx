import { arrowSelect } from '../../assets/icon';
import { CODE_PHONE_NUMBER } from '../../data/constance_for_page/constant_type_ui';
type typeOfPhoneNumber = {
    nameCodeCountry: string;
    namePhoneNumber: string;
    register: any;
    errors: any;
};
function PhoneNumber({ nameCodeCountry, namePhoneNumber, register,  errors }: typeOfPhoneNumber) {
    return (
        <div className="relative">
            <p className="my_after_star ">Phone</p>
            <div className="flex relative ">
                <img src={arrowSelect} alt="" className="absolute  left-3 top-4 text-[14px]" />
                <select
                    className=" my_hidden_icon_select w-[76px] pl-8  h-[42px] rounded-l-[5px]  outline outline-1 outline-[--outlineColor] text-[#666666]"
                    name={nameCodeCountry}
                    {...register(nameCodeCountry)}
                >
                    <option value={CODE_PHONE_NUMBER['+84']}>{CODE_PHONE_NUMBER['+84']}</option>
                    <option value={CODE_PHONE_NUMBER['+85']}>{CODE_PHONE_NUMBER['+85']}</option>
                    <option value={CODE_PHONE_NUMBER['+86']}>{CODE_PHONE_NUMBER['+86']}</option>
                    <option value={CODE_PHONE_NUMBER['+63']}>{CODE_PHONE_NUMBER['+63']}</option>
                </select>
                <label htmlFor="phoneNumber"></label>
                <input
                    name={namePhoneNumber}
                    {...register(namePhoneNumber)}
                    id="phoneNumber"
                    type="text"
                    className="w-[calc(100%-76px)] outline outline-1 outline-[--outlineColor] rounded-r-[5px] pl-4"
                />
            </div>
            {errors[namePhoneNumber] && (
                <div className="text-[12px] absolute -bottom-[20px] text-[red]">{errors[namePhoneNumber].message}</div>
            )}
        </div>
    );
}
export default PhoneNumber;
