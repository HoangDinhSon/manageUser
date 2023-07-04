import { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ListName } from '../../components';
const listSkillDefault: Array<string> = [];
function SkillDisplayInput({ resultListSkill }: any) {
    const [listSkill, setListSkill] = useState<Array<string>>(listSkillDefault);
    const [skill, setSkill] = useState<string>('');
    const refInputSkill = useRef<any | null>(null);
    // transform ListSkill out
    useEffect(() =>{ resultListSkill(listSkill);}, [listSkill]);
    // get value Skill nhập từ input
    const handleGetInput = (event: any) => {
        setSkill(event.target.value);
    };
    // lưu mỗi skill vào trong list
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
    // xóa skill ra khỏi danh sách
    const handleRemoveSkill = (index: number) => {
        listSkill.splice(index, 1);
        setListSkill([...listSkill]);
    };
    return (
        <div className="pt-4 pb-[42px] relative ">
            <Toaster />
            <p className="my_after_star">Skills</p>
            <ListName listName={listSkill} onClick={handleRemoveSkill}/>
            <input
                type="text"
                className="w-full h-[42px] focus-within:my_outline_rounded_edit_form px-4"
                placeholder="Skills..."
                onKeyUpCapture={handlePressKey}
                onChange={handleGetInput}
                ref={refInputSkill}
                id="IDlistSkill"
                
            />
           {(listSkill.length===0) && <div className='text-[red] text-[12px] absolute bottom-[15px]'> Kỹ năng không dc để trống bạn nhé </div>}
        </div>
    );
}

export default SkillDisplayInput;
// count >0,và lengmang2 =0 thì hiện thông bào 
