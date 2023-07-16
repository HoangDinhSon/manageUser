import { arrowSelect } from "../../assets/icon";
import { listOption } from "../../data/constance_for_page/constant_type_ui";
type typeSelect = {
    nameSelect:string;
    listOption:listOption;// mảng các object 
    label:string;
    register:any;
}
function Select({ nameSelect, listOption, label, register }: typeSelect) {
    return (
        <div>
            <p className="my_after_star pb-[5px]">{label}</p>
            <div className="relative">
                <img src={arrowSelect} alt="" className="absolute right-4 top-[50%] -translate-y-[50%]" />
                <select
                    {...register(nameSelect)}
                    name={nameSelect}
                    className="w-full h-[42px] outline outline-1 outline-[--outlineColor] rounded-[5px] px-4  my_hidden_icon_select"
                >
                    {listOption.map((option, index: any) => (
                        <option value={option.value} key={index}>
                            {option.content}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Select;