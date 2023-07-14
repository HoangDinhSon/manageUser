import { useDispatch } from 'react-redux';
import { updateValueFormVerify,hiddenFormVerify } from '~/app_redux/reducer_redux';

function FormVerify() {
    const dispatchOfRedux = useDispatch();
    const handleYes = (value: boolean) => {
        dispatchOfRedux(updateValueFormVerify(value));
        dispatchOfRedux(hiddenFormVerify());
    };
    const handleNo = (value: boolean) => {
        dispatchOfRedux(updateValueFormVerify(value));
        dispatchOfRedux(hiddenFormVerify());
    };
    return (
        <div className="bg_parent_form">
            <div className="w-[350px] h-[150px] bg-[white] center_fixed z-[4] rounded-md relative">
                <div className=" pl-3 pt-4">Do you want to add the Todo?</div>
                <div className="flex justify-end gap-4 absolute bottom-3 right-3 ">
                    <button className="btn85x25"  onClick={() => handleYes(true)}>
                        Yes
                    </button>
                    <button className="btn85x25" onClick={() => handleNo(false)}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormVerify;
/* 
FormVerify :
sẽ xác nhận sư thay đổi: quản lí  valueFormVerify



*/
