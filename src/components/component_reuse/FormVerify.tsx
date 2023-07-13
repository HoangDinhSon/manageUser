import { useDispatch } from 'react-redux';
import { updateValueFormVerify } from '~/app_redux/reducer_redux';

function FormVerify() {
    const dispatchOfRedux = useDispatch();
    const handleYes = (value: boolean) => {
        dispatchOfRedux(updateValueFormVerify(value));
    };
    const handleNo = (value: boolean) => {
        dispatchOfRedux(updateValueFormVerify(value));
    };
    return (
        <div className="w-[200px] h-[100px] bg-[blue] center_fixed z-[4] ">
            <div className="pb-[50px] text-center">Verify</div>
            <div className="flex justify-end">
                <button className="px-[10px]" onClick={() => handleYes(true)}>
                    YES
                </button>
                <button className="px-[10px]" onClick={() => handleNo(false)}>
                    NO
                </button>
            </div>
        </div>
    );
}

export default FormVerify;
/* 
FormVerify :
sẽ xác nhận sư thay đổi: quản lí  valueFormVerify



*/
