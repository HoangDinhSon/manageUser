import { useEffect } from 'react';
import { listInput } from '~/pages/report/component/EditAndAddTodoForm';
import { InputForReport, ButtonClose } from '~/components';
import { useForm } from 'react-hook-form';
import { schema } from '~/pages/report/validation_report_page';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { displayFormAddEdit, hiddenFormAddEdit, addTodoIntoList } from '~/app_redux/reducer_redux';
import { typeOfTodo } from '~/data/type/typeGlobal';
import { createTodo } from '~/Api/logTimeApi';
type typeDefaultFormAdd = Omit<typeOfTodo, '_id'>;
const defaultFormAdd: typeDefaultFormAdd = {
    text: '',
    complete: false,
    author: '',
    createdDate: '',
};

const ADD = 'add';
function EditAddViewForm() {
    const dispatchOfRedux = useDispatch();
    /*Start check xem form là form gì ADD/EDIT/VIEW */
    let defaultOfForm = defaultFormAdd;
    const kindOfForm = ADD;
    if (kindOfForm === ADD) {
        defaultOfForm = defaultFormAdd;
    }
    /*End check xem form là form gì ADD/EDIT/VIEW */

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultOfForm,
    });
    const handleClose = () => {
        dispatchOfRedux(hiddenFormAddEdit());
    };
    const handleSubmitForm = (dataOfForm: typeDefaultFormAdd) => {
        console.log('dataOfForm>>>', dataOfForm);
        dispatchOfRedux(addTodoIntoList(dataOfForm));
        reset(defaultOfForm);
        // sau khi submit thì focus vào form đầu tiên .
        const element: any = document.querySelector('input[name="text"]');
        element?.focus();
    };
    // dùng để focus vào giá trị bị lỗi .
    useEffect(() => {
        const firstErrorKey = Object.keys(errors).find((key) => errors[key as keyof typeof errors]);
        if (firstErrorKey) {
            const element: any = document.querySelector(`input[name="${firstErrorKey}"]`);
            element?.focus();
        }
    }, [errors]);
    return (
        <div>
            <div className="bg_parent_form"></div>
            <div className="z-20 pb-[30px] pt-[10px] center_fixed bg-white rounded-xl">
                <ButtonClose onClick={handleClose} />
                {kindOfForm === ADD && <div className="text-center">ADD TODO</div>}
                <div className="w-[500px] px-[20px]">
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        {listInput.map((ele, index) => (
                            <InputForReport
                                key={index}
                                label={ele.label}
                                name={ele.name}
                                errors={errors}
                                control={control}
                            />
                        ))}
                        <button type="submit" className="btn_report">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditAddViewForm;
/* 
chức năng Add : hiển thị form 
giá trị mặc định của component Add . 
sau khi submit thì reset lại giá trị mặc đinh của form ADD . 
focus vào giá trị đầu tiên . 
ban đầu: vào focus giá trị đầu tiên 
khi ấn submit giá trị nào sai thì cần focus vào 
khi submit thành công thì focus vào giá trị đầu tiên 
-------



*/
