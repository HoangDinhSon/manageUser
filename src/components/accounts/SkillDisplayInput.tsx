import { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ListName } from '../../components';
const listSkillDefault: Array<string> = [];
function SkillDisplayInput({ resultListSkill }: any) {
    const [listSkill, setListSkill] = useState<Array<string>>(listSkillDefault);
    const [skill, setSkill] = useState<string>('');
    const refInputSkill = useRef<any | null>(null);
    let flag = useRef(false);
    // transform ListSkill out parent 
    useEffect(() => {
        resultListSkill(listSkill);
    }, [listSkill]);

    // get value Skill nhập từ input
    const handleGetInput = (event: any) => {
        setSkill(event.target.value);
    };
    // lưu mỗi skill vào trong list
    const handlePressKey = (event: any) => {
        if (event.key === 'Enter') {
            if (skill === '') {
                flag.current = true;
                return toast.error('Skill is empty');
            }
            setListSkill([...listSkill, skill]);
            setSkill('');
            const input = refInputSkill.current;
            input.value = '';
            input.focus();
        }
    };
    // xóa skill ra khỏi danh sách
    const handleRemoveSkill = (index: number) => {
        listSkill.splice(index, 1);
        setListSkill([...listSkill]);
    };
    return (
        <div className="pt-4 pb-[42px] relative ">
            <Toaster />
            <p className="my_after_star">Skills</p>
            <ListName listName={listSkill} onClick={handleRemoveSkill} />
            <input
                type="text"
                className="w-full h-[42px] my_outline_rounded_edit_form px-4"
                placeholder="Skills..."
                onKeyUpCapture={handlePressKey}
                onChange={handleGetInput}
                ref={refInputSkill}
                id="IDlistSkill" // dành để focus
            />
            {/* 2. */}
            {listSkill.length === 0 && flag.current && (
                <div className="text-[red] text-[12px] absolute bottom-[15px]"> Skill can't empty</div>
            )}
        </div>
    );
}

export default SkillDisplayInput;

/* 
2. condition display notification error 
3.IDlistSkill: to focus when user click Save while ListSkill is empty
 */