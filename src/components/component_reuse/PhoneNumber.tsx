
import { arrowSelect } from "../../assets/icon";
function PhoneNumber({ nameCodeCountry, namePhoneNumber, register, phone ,errors}: any) {
    const codePhone = phone?.slice(0, 3); //string
    const phoneAfter = phone?.slice(3);
    return (
        <div className="relative">
            <p className="my_after_star ">Phone</p>
            <div className="flex relative ">
                <img src={arrowSelect} alt="" className="absolute  left-3 top-4 text-[14px]" />
                <select
                    className=" my_hidden_icon_select w-[76px] pl-8  h-[42px] rounded-l-[5px]  outline outline-1 outline-[--outlineColor] text-[#666666]"
                    name={nameCodeCountry}
                    {...register(nameCodeCountry)}
                    defaultValue={codePhone}
                >
                    <option value="+84">+84</option>
                    <option value="+85">+85</option>
                    <option value="+86">+86</option>
                    <option value="+63">+63</option>
                </select>
                <label htmlFor="phoneNumber"></label>
                <input
                    defaultValue={phoneAfter}
                    name={namePhoneNumber}
                    {...register(namePhoneNumber)}
                    id="phoneNumber"
                    type="text"
                    className="w-[calc(100%-76px)] outline outline-1 outline-[--outlineColor] rounded-r-[5px] pl-4"
                />
            </div>
            {errors[namePhoneNumber]&& <div className="text-[12px] absolute -bottom-[20px] text-[red]">Phone is required and number</div>}
        </div>
    );
}
export default PhoneNumber;