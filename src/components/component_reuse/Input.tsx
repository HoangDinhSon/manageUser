import { NameRegisterForm } from '../../data/constance_for_page/UI_TYPE_CONSTANT';
function Input({ content, icon, name, register, value, errors }: any) {
    let type = 'email';
    if (name === NameRegisterForm.contractEndDate || name === NameRegisterForm.contractStartDate) {
        type = 'date';
    }
    return (
        <div className="relative">
            <p className="my_after_star">{content}</p>
            <div className="relative ">
                <img src={icon} alt="" className="absolute right-4 top-[50%] -translate-y-[50%]  xs_max:hidden" />
                <input
                    type={type}
                    className="my_input"
                    placeholder={content}
                    name={name}
                    {...register(name)}
                    defaultValue={value}
                />
            </div>
            {errors[name] && (
                <div className="text-[12px] absolute -bottom-[20px] text-[red]">{content + ' is required'}</div>
            )}
        </div>
    );
}
export default Input;
/* 
    tùy chọn : icon , value 
    

*/
