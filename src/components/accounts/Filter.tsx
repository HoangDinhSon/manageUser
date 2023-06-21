import { Checkbox, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { getUserBaseFilter } from '../../Api/logTimeApi';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import { OutPutFormFilter } from '../../type';
type typeSeclect = { children: string; value: string | number };
type DataCallApi = { keyFilter: string | number; valueFilter: string | number }[]; // dạng mảng chứa object

const ListFilter = [
    {
        label: 'gender',
        propcheck: 'gender',
        propselect: 'select',
        content: [
            { children: 'male', value: 'male' },
            { children: 'female', value: 'female' },
        ],
    },
    {
        label: 'Age',
        propcheck: 'age',
        propselect: 'select',
        content: [
            { children: '50', value: 50 },
            { children: '49', value: 49 },
            { children: '38', value: 38 },
        ],
    },
    {
        label: 'eyeColor',
        propcheck: 'eyeColor',
        propselect: 'select',
        content: [
            { children: 'Green', value: 'Green' },
            { children: 'Amber', value: 'Amber' },
            { children: 'Blue', value: 'Blue' },
        ],
    },
    {
        label: 'bloodGroup',
        propcheck: 'bloodGroup',
        propselect: 'select',
        content: [
            { children: 'B−', value: 'B−' },
            { children: 'A−', value: 'A−' },
        ],
    },
    {
        label: 'university',
        propcheck: 'university',
        propselect: 'select',
        content: [
            { children: 'Capitol University', value: 'Capitol University' },
            { children: 'Stavropol State Technical University', value: 'Stavropol State Technical University' },
        ],
    },
    {
        label: 'height',
        propcheck: 'height',
        propselect: 'select',
        content: [
            { children: '188', value: 188 },
            { children: '200', value: 200 },
            { children: '176', value: 176 },
        ],
    },
];

function CheckAndSeclect({ PropsCheck, PropsSelect, label, content, register }: any) {
    const [value, setValue] = useState(content[0].value);
    const handleChange = (e: any) => {
        setValue(e.target.value);
    };
    return (
        <div className="mt-[19px] ">
            <FormControlLabel
                control={<Checkbox {...register(`${PropsCheck}.${PropsCheck}`)}></Checkbox>}
                label={label}
                sx={{ width: '100%', height: '20px' }}
            />
            <Select
                {...register(`${PropsCheck}.${PropsSelect}`)}
                value={value}
                sx={{ width: '100%', height: '36px', marginTop: '11px' }}
                onChange={handleChange}
            >
                {content.map((element: typeSeclect) => (
                    <MenuItem value={element.value} key={element.value}>
                        {element.children}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}

function Filter() {
    const [state, dispatch] = useGlobalState();
    const [isdisplayForm, setIsDisplayForm] = useState(true);
    const { register, handleSubmit,reset } = useForm();
    let responseFromServer = useRef<any>([]);
    const { mutate } = useMutation({
        mutationFn: getUserBaseFilter,
        onSuccess: (res: any) => {
            responseFromServer.current = [...responseFromServer.current, ...res.users];
            dispatch(actions.makeListFilter(responseFromServer.current));
        },
    });

    const handleSubmitForm = (payloadForm: OutPutFormFilter | any) => {
        // khi lấy từ input tất cả đề là string nên dòng này chuyển select của age và height  về number
        payloadForm = {
            ...payloadForm,
            age: { ...payloadForm.age, select: parseInt(payloadForm.age.select) },
            height: { ...payloadForm.height, select: parseInt(payloadForm.height.select) },
        };
        dispatch(actions.setCriterialForFilter(payloadForm));
        // duyệt qua các phần tữ trong object
        const listKeyOfPayloadForm = Object.keys(payloadForm);
        listKeyOfPayloadForm.forEach((item) => {
            if (payloadForm[item][item]) {
                mutate({
                    keyFilter: item,
                    valueFilter: payloadForm[item]['select'],
                });
            }
        });
        // sau khi submit thì phải reset mảng vì nếu không nó sẽ tích vào rất nhiêu lần
        responseFromServer.current = [];
    };
    const handleClearForm = () => {
        responseFromServer.current = [];
        setIsDisplayForm(false);
        setTimeout(() => {
            setIsDisplayForm(true);
        }, 1);
        reset();
    };

    return (
        <div className="bg-white  w-[319px] pt-[13px] pb-[24px] px-[22px]  ">
            <div className="bg-white rounded-md">
                <p>Filter</p>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    {isdisplayForm &&
                        ListFilter.map((each) => (
                            <CheckAndSeclect
                                label={each.label}
                                content={each.content}
                                key={each.label}
                                register={register}
                                PropsCheck={each.propcheck}
                                PropsSelect={each.propselect}
                            />
                        ))}
                    {/* Hàm này tránh khi reset lại thì bị giật  */}
                    {!isdisplayForm &&
                        ListFilter.map((each) => (
                            <CheckAndSeclect
                                label={each.label}
                                content={each.content}
                                key={each.label}
                                register={register}
                                PropsCheck={each.propcheck}
                                PropsSelect={each.propselect}
                            />
                        ))}
                    <div className="mt-[42px] flex justify-between">
                        <Button variant="outlined" sx={{ width: '129px' }} onClick={handleClearForm}>
                            Clear All
                        </Button>
                        <Button variant="contained" sx={{ width: '129px' }} type="submit">
                            Show{' '}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filter;
