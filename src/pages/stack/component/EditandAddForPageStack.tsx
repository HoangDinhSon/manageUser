import { InputForReport, ButtonClose } from '~/components';
import { listInput } from '~/pages/report/component/EditAndAddTodoForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '~/pages/report/validation_report_page';
import { defaultValue } from '~/pages/report/component/EditAndAddTodoForm';
import { typeOfListTodo } from '~/data/type/typeGlobal';
import { useGlobalState } from '~/store/Provider';
import { actions } from '~/store';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { updateTodo, createTodo } from '~/api/log_time_api';
import { useToastPromise } from '~/custome_hook';

type typeProps = {
    listTodo: typeOfListTodo;
    refetch: any;
};
const ADD = 'add';
const EDIT = 'edit';
const WATCH = 'watch';
function EditAndAddForPageStack({ listTodo, refetch }: typeProps) {
    const [state, dispatch] = useGlobalState();
    function getTodoParticular() {
        return listTodo?.filter((todo) => {
            return todo._id === state.idOfTodoForPageStack;
        });
    }
    const [todoForEdit]= getTodoParticular();

    let defaultOfForm = defaultValue;
    let kindOfForm = ADD;
    if (state.idOfTodoForPageStack) {
        kindOfForm = EDIT;
        defaultOfForm = todoForEdit;
    }
    if (state.isDisplayTodoViewOfPageStack) {
        kindOfForm = WATCH;
    }
    // update todo dùng post
    const {
        mutate: mutateEdit,
        error: errorUpdateTodo,
        status: statusUpdateTodo,
    } = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            refetch();
        },
    });
    useToastPromise(statusUpdateTodo, errorUpdateTodo, 'Update Todo Fail');

    // create to do
    const {
        mutate: mutateCreate,
        error: errorCreateTodo,
        status: statusCreateTodo,
    } = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            refetch();
        },
    });
    useToastPromise(statusCreateTodo, errorCreateTodo, 'Create Todo Fail');
    useEffect(() => {
        if (statusCreateTodo === 'success') {
            dispatch(actions.toggleEditAddPageStack());
        }
        if (statusUpdateTodo === 'success') {
            dispatch(actions.toggleEditAddPageStack());
        }
    }, [statusUpdateTodo, statusCreateTodo, dispatch]);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultOfForm,
    });
    const handleSubmitForForm = (data: any) => {
        switch (kindOfForm) {
            case EDIT: {
                mutateEdit({
                    _id: state.idOfTodoForPageStack,
                    ...data,
                });
                break;
            }
            case ADD: {
                mutateCreate({
                    ...data,
                });
                reset(defaultValue);
                break;
            }
        }
    };
    const handleClose = () => {
        dispatch(actions.toggleEditAddPageStack());
        dispatch(actions.setIdTodoPageStackToDefault());
        dispatch(actions.hiddenViewTodoStack());
    };
    // focus field first with errors
    useEffect(() => {
        const firstErrorKey = Object.keys(errors).find((key) => errors[key as keyof typeof errors]);
        if (firstErrorKey) {
            const element: any = document.querySelector(`input[name="${firstErrorKey}"]`);
            element?.focus();
        }
    }, [errors]);
    return (
        <div className="">
            <div className="bg_parent_form"></div>
            <div className="z-20 pb-[30px] pt-[10px] center_fixed bg-white rounded-xl">
                <ButtonClose onClick={handleClose} />
                {kindOfForm === WATCH && <div className="text-center">VIEW TODO</div>}
                {kindOfForm === EDIT && <div className="text-center">EDIT TODO</div>}
                {kindOfForm === ADD && <div className="text-center">ADD TODO</div>}
                <div className="w-[500px] px-[20px]">
                    <form action="" onSubmit={handleSubmit(handleSubmitForForm)}>
                        {listInput?.map((ele, index) => {
                            return (
                                <InputForReport
                                    key={index}
                                    errors={errors}
                                    label={ele.label}
                                    name={ele.name}
                                    control={control}
                                />
                            );
                        })}
                        <button type="submit" className="btn_report" disabled={state.isDisplayTodoViewOfPageStack}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditAndAddForPageStack;
/* 
lấy todo hiển thị vào form focus vào cái đầu tiên 
khi nhập sai tự động focus vào cái ô bị sai 
lấy inputvalue và validate--> thông báo chính xác lỗi 
send to server 
back lại trang report để  
*/
