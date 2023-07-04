function InputWithCharacter({ label, numberCharacter, register, name, value,errors }: any) {
    return (
        <div className="relative">
            <p className="my_after_star">{label}</p>
            <div className="relative">
                <p className="absolute right-4 top-[50%] bottom-3 text-[#999999] text-[12px] ">{`${numberCharacter}/50`}</p>
                <input type="" className="my_input " placeholder={label} {...register(name)} defaultValue={value} />
            </div>
           {errors[name]&& <div className="text-[12px] absolute -bottom-[20px] text-[red]">{label +" is required"}</div>}
        </div>
    );
}
export default InputWithCharacter;