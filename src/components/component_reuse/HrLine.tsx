function HrLine({content}:{content:string}) {
   let classForParagraph = "absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] px-[1rem] bg-white xs_max:text-[12px]"
    if (content.startsWith("L")){
        classForParagraph ="text-[25px] absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] px-[1rem] bg-white xs_max:text-[16px]"
    }
    return (
        <div className="py-9 sm_max:py-4">
            <div className="relative">
                <hr className="bg-[#00000030] h-[2px] mx-5" />
                <p className={classForParagraph}>{content}</p>
            </div>
        </div>
    );
}

export default HrLine;
