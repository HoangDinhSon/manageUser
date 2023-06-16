import { useState, useRef, useEffect } from 'react';
import { closeSmall } from '../../assets';
import toast, { Toaster } from 'react-hot-toast';
const listSkillDefault: Array<string> = [];
function SkillDisplayInput({ resultListSkill }: any) {
    const [listSkill, setListSkill] = useState<Array<string>>(listSkillDefault);
    const [skill, setSkill] = useState<string>('');
    const refInputSkill = useRef<any | null>(null);
    useEffect(() => resultListSkill(listSkill), [listSkill]);
    const handlePressKey = (event: any) => {
        if (event.key === 'Insert') {
            if (skill === '') {
                return toast.error('Skill is empty');
            }
            setListSkill([...listSkill, skill]);
            setSkill('');
            const input = refInputSkill.current;
            input.value = '';
            input.focus();
        }
    };
    const handleGetInput = (event: any) => {
        setSkill(event.target.value);
    };
    const handleRemoveSkill = (e: any, index: number) => {
        // console.log('e, index:', e, index);
        listSkill.splice(index, 1);
        setListSkill([...listSkill]);
    };
    return (
        <div className="pt-4 pb-[42px] ">
            <Toaster />
            <p className="my_after_star">Skills</p>
            <div className="my_outline_rounded_edit_form h-[42px] overflow-auto">
                <ul className="flex items-center h-[42px] ">
                    {listSkill.map((element, index) => {
                        return (
                            <div
                                className=" flex bg-[--outlineColor] mx-1 rounded-[8px] px-2 text-[12px] hover:cursor-pointer"
                                key={index}
                                onClick={(e: any) => handleRemoveSkill(e, index)}
                            >
                                <img src={closeSmall} alt="" />
                                <li>{element}</li>
                            </div>
                        );
                    })}
                </ul>
            </div>
            <input
                type="text"
                className="w-full h-[42px] focus-within:my_outline_rounded_edit_form px-4"
                placeholder="Skills..."
                onKeyUpCapture={handlePressKey}
                onChange={handleGetInput}
                ref={refInputSkill}
            />
        </div>
    );
}

export default SkillDisplayInput;
