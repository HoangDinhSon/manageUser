type inputWithCharacter = {
    label: string;
    numberCharacter: number;
    register: any;
    name: string;
    errors: any;
};

function InputWithCharacter({ label, numberCharacter, register, name, errors }: inputWithCharacter) {
    return (
        <div className="relative">
            <p className="my_after_star">{label}</p>
            <div className="relative">
                <p className="absolute right-4 top-[50%] bottom-3 text-[#999999] text-[12px] ">{`${numberCharacter}/50`}</p>
                <input type="" className="my_input " placeholder={label} {...register(name)} />
            </div>
            {errors[name] && (
                <div className="text-[12px] absolute -bottom-[20px] text-[red]">{errors[name].message}</div>
            )}
        </div>
    );
}
export default InputWithCharacter;
