import { useEffect } from 'react';
import { listInput } from '~/pages/report/component/EditAndAddTodoForm';
import { InputForReport, ButtonClose } from '~/components';
import { useForm } from 'react-hook-form';
import { schema } from '~/pages/report/validation_report_page';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/app_redux/store';
import {
    changeIdAndKindOfForm,
    hiddenFormAddEdit,
    addTodoIntoList,
    ID_AND_KIND_OF_FORM,
} from '~/app_redux/reducer_redux';
import { typeOfTodo, typeOfListTodo } from '~/data/type/typeGlobal';
import { updateTodoForPageProject } from '~/custome_hook/call_api';
import * as CONST from "~/data/constance_for_page/constantGlobal"

type typeDefaultFormAdd = Omit<typeOfTodo, '_id'>;
type typeProps = {
    listTodo: typeOfListTodo;
    refetch: () => void;
};
const defaultFormAdd: typeDefaultFormAdd = {
    text: '',
    complete: false,
    author: '',
    createdDate: '',
};

const ADD = 'add';
const EDIT = 'edit';
function EditAddViewFormPageProject({ listTodo, refetch }: typeProps) {
    const { idAndKindOfForm } = useSelector((state: RootState) => state.manageAppTodo);
    const dispatchOfRedux = useDispatch();
    /*Start check xem form là form gì ADD/EDIT/VIEW */
    let defaultOfForm = defaultFormAdd;
    let kindOfForm = idAndKindOfForm.kindOfForm;
    if (idAndKindOfForm.id != '') {
        kindOfForm = EDIT;
    }
    if (idAndKindOfForm.id&&idAndKindOfForm.kindOfForm===CONST.VIEW){
        kindOfForm= CONST.VIEW
    }
    /* End check xem form là form gì */
    if (kindOfForm === ADD) {
        defaultOfForm = defaultFormAdd;
    }
    if (kindOfForm === EDIT||kindOfForm===CONST.VIEW) {
        defaultOfForm = listTodo.filter((todo, index) => {
            return todo._id === idAndKindOfForm.id;
        })[0];
    }
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
        dispatchOfRedux(changeIdAndKindOfForm(ID_AND_KIND_OF_FORM));
    };
    const handleSubmitForm = (dataOfForm: typeDefaultFormAdd) => {
        if (kindOfForm === ADD) {
            dispatchOfRedux(addTodoIntoList(dataOfForm));
            reset(defaultOfForm);
            // sau khi submit thì focus vào form đầu tiên .
            const element: any = document.querySelector('input[name="text"]');
            element?.focus();
        }
        if (kindOfForm === EDIT) {
            updateTodoForPageProject({
                dataSendServer: { ...dataOfForm, _id: idAndKindOfForm.id },
                refetch,
                dispatchRedux: dispatchOfRedux,
            });
        }
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
                {kindOfForm === EDIT && <div className="text-center">EDIT TODO</div>}
                {kindOfForm === CONST.VIEW && <div className="text-center">VIEW TODO</div>}
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
                        <button type="submit" className="btn_report" disabled={kindOfForm === CONST.VIEW }>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditAddViewFormPageProject;
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
