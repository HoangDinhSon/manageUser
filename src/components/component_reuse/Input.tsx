function Input({ content, icon, name, register, value }: any) {
    return (
        <div>
            <p className="my_after_star">{content}</p>
            <div className="relative ">
                <img src={icon} alt="" className="absolute right-4 top-[50%] -translate-y-[50%] " />
                <input
                    type="text"
                    className="my_input"
                    placeholder={content}
                    name={name}
                    {...register(name)}
                    value={value}
                />
            </div>
        </div>
    );
}
export default Input;