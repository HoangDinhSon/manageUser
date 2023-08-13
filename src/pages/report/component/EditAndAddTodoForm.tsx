import { useForm } from 'react-hook-form';
import { useOutletContext, useParams, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import {  useToastPromise } from '~/custome_hook';
import { typeOfTodo, typeOfListTodo, NAME } from '~/data/type/typeGlobal';
import { schema } from '../validation_report_page';
import { LINK_PAGE_REPORT } from '~/data/constance_for_page';
import { InputForReport } from '~/components';
import { useCreateTodo, useUpdateTodo,useFindKindOfFormBaseURL } from '~/custome_hook';
import *as CONST from "~/data/constance_for_page";

type typeDefaultValue = Omit<typeOfTodo, '_id'>;

export const listInput = [
    {
        label: 'Todo',
        name: `${NAME.text}`,
    },
    {
        label: 'Complete',
        name: `${NAME.complete}`,
    },
    {
        label: 'Author',
        name: `${NAME.author}`,
    },
    {
        label: 'Date Finish',
        name: `${NAME.createdDate}`,
    },
];

export const defaultValue: typeDefaultValue = {
    text: '',
    author: '',
    complete: false,
    createdDate: '',
};
const EDIT = 'edit';
const ADD = 'add';
function EditAndAddTodoForm() {
    /* Kiểm tra xem form là form add hay form edit  */
    const {kindOfForm} =  useFindKindOfFormBaseURL()
    const [listTodo, refetch]: [typeOfListTodo, any] = useOutletContext();
    // update todo
    const { mutate: mutateEdit, status: statusUpdateTodo,error : errorUpdateTodo, } = useUpdateTodo(refetch);
    useToastPromise(statusUpdateTodo,errorUpdateTodo,"Update Todo Fail");
    // create to do
    const { mutate: mutateCreate, status: statusCreateTodo ,error:errorCreateTodo } = useCreateTodo(refetch);
    useToastPromise(statusCreateTodo,errorCreateTodo,"Create Todo Fail!!!");
    const { id }: any = useParams<string>();
     // focus field first with errors
     
    // do server không hỗ trợ lấy todo dựa vào Api nên cần lọc để lấy todo hiện lên form
    const [todoForEdit] = listTodo.filter((todo) => {
        return todo._id === id;
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: todoForEdit || defaultValue,
    });
    useEffect(() => {
        const firstErrorKey = Object.keys(errors).find((key) => errors[key as keyof typeof errors]);
        if (firstErrorKey) {
            const element: any = document.querySelector(`input[name="${firstErrorKey}"]`);
            element?.focus();
        }
    }, [errors]);
    if (kindOfForm!=CONST.ADD && kindOfForm != CONST.EDIT){
        window.location.href = `http://localhost:4000${LINK_PAGE_REPORT}`
    }

    // kiểm tra người dùng đã lấy đúng id chưa (có thể người dùng nhập trực tiếp vào thanks địa chỉ  )
    if (!todoForEdit && kindOfForm === EDIT) {
        window.location.href = `http://localhost:4000${LINK_PAGE_REPORT}`;
        return <span>directors to page reload</span>;
    }
    const handleSubmitForForm = (data: any) => {
        // console.log('type of data>>>', data);
        switch (kindOfForm) {
            case EDIT: {
                mutateEdit({
                    _id: id,
                    ...data,
                });
                reset(defaultValue);
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
   
    return (
        <div className=" pt-[30px]  h-full w-full z-50">
            {kindOfForm === EDIT && <div className="px-[20px] w-full ">EDIT TODO</div>}
            {kindOfForm === ADD && <div className="px-[20px] w-full">ADD TODO</div>}
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
                    <button type="submit" className="btn_report">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditAndAddTodoForm;
/* 
lấy todo hiển thị vào form focus vào cái đầu tiên 
khi nhập sai tự động focus vào cái ô bị sai 
lấy inputvalue và validate--> thông báo chính xác lỗi 
send to server 
back lại trang report để  
*/
