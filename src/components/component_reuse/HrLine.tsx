function HrLine({content}:any) {
    return (
        <div className="pt-9">
            <div className="relative">
                <hr />
                <p className="text-[25px] absolute left-[50%] -top-[20px] -translate-x-[50%] px-[1rem] bg-white">{content}</p>
            </div>
        </div>
    );
}

export default HrLine;
