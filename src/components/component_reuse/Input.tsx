
import { NameRegisterForm } from '../../data/constance_for_page/constant_type_ui';
type typeInput = {
    content: string;
    name: string;
    register: any;
    errors: any;
};
function Input({ content, name, register, errors }: typeInput) {
    let type;
    if (name === NameRegisterForm.email) {
        type = 'email';
    } else {
        type = 'date';
    }

    return (
        <div className="relative">
            <p className="my_after_star">{content}</p>
            <div className="relative ">
                <input type={type} className="my_input" placeholder={content} name={name} {...register(name)} />
            </div>
            {errors[name] && (
                <div className="text-[12px] absolute -bottom-[20px] text-[red]">{errors[name].message}</div>
            )}
        </div>
    );
}
export default Input;
/* 
    tùy chọn : icon , value 
*/
