import { useForm, useController } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import { typeOfTodo, typeOfListTodo, NAME } from '~/data/type/typeGlobal';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../validation_report_page';
import { LINK_PAGE_REPORT } from '~/data/constance_for_page';
import { useMutation } from 'react-query';
import { updateTodo } from '~/Api/logTimeApi';

type typeDefaultValue = Omit<typeOfTodo, '_id'>;

const listInput = [
    {
        label: 'Do',
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
        label: 'CreateDate',
        name: `${NAME.createdDate}`,
    },
];

type PropsInputReport = {
    label: string;
    name: string;
    control: any;
    errors: any;
};
function InputForReport({ label, name, control, errors }: PropsInputReport) {
    const { field } = useController({
        name: name,
        control: control,
    });
    return (
        <div>
            <label htmlFor={name} className="cursor-pointer py-[5px] block">
                {label}
            </label>
            {name === NAME.complete ? (
                <input id={name} type="checkbox" name={field.name} onChange={field.onChange} />
            ) : (
                <input
                    id={name}
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    className="input_for_report"
                />
            )}
            {errors[name] && <span>{errors[name].message}</span>}
        </div>
    );
}

const defaultValue: typeDefaultValue = {
    text: '',
    author: '',
    complete: false,
    createdDate: '', //createDate
};

function EditTodoForm() {
    const [listTodo,refetch]:[typeOfListTodo,any] = useOutletContext();
    const { id }: any = useParams<string>();
    // do server không hỗ trợ lấy todo dựa vào Api nên cần lọc để lấy todo hiện lên form
    const [todoForEdit] = listTodo.filter((todo) => {
        return todo._id === id;
    });
    // kiểm tra người dùng đã lấy đúng id chưa (có thể người dùng nhập trực tiếp vào ô input )
    if (!!!todoForEdit) {
        window.location.href = `http://localhost:4000${LINK_PAGE_REPORT}`;
        return <span>directors to page reload</span>;
    }
    // update todo dùng put
    const { mutate } = useMutation({
        mutationFn: updateTodo,
        onSuccess: (res)=>{
            console.log('res to update>>>', res);
            refetch()
            window.history.back();
        },
        onError:(error)=>{
            console.log('Error>>>', error);
        }
        
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: todoForEdit,
    });
    const handleSubmitForForm = (data: any) => {
        mutate({
            _id: id,
            ...data,
        });
        reset(defaultValue);
    };
    return (
        <div className=" pt-[30px]  h-full w-full z-50">
            <div className="w-[500px] px-[20px]">
                <form action="" onSubmit={handleSubmit(handleSubmitForForm)}>
                    {listInput.map((ele, index) => {
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
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
}

export default EditTodoForm;
/* 
lấy todo hiển thị vào form 
lấy inputvalue và validate--> thông báo chính xác lỗi 
send to server 
back lại trang report để  

*/
