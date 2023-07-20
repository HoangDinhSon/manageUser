import { Checkbox, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useForm, useController } from 'react-hook-form';
import { useMutation } from 'react-query';
import { getUserBaseFilter } from '../../api/log_time_api';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import { OutPutFormFilter } from '../../data/type';
import { ListFilter, CRITERIAL_FOR_FILTER_DEFAULT } from '../../data/constance_for_page';
import { typeSelect } from '../../data/constance_for_page/constant_filter';
type PropsCheckAndSelect = {
    PropsCheck: string;
    PropsSelect: string;
    label: string;
    content: typeSelect[];
    register: any;
    control: any;
};

function CheckAndSelect({ PropsCheck, PropsSelect, label, content, control }: PropsCheckAndSelect) {
    const [state, dispatch] = useGlobalState();
    // console.log('state>>>', state.criterialForFilter);
    /*Start Test useControl*/
    const { field: checkBox } = useController({
        control: control,
        name: `${PropsCheck}.${PropsCheck}`,
    });
    const { field: select } = useController({
        control: control,
        name: `${PropsCheck}.${PropsSelect}`,
    });
    /*End  Test useControl*/
    const [value, setValue] = useState(state.criterialForFilter[PropsCheck].select);
    const [isChecked, setIsChecked] = useState(state.criterialForFilter[PropsCheck][PropsCheck]);
    const handleChangeSelect = (e: any) => {
        setValue(e.target.value);
        select.onChange(e.target.value);
    };
    const handleChangeCheckBox = (e: any) => {
        checkBox.onChange(e.target.checked); // true or false send value to react hook form
        setIsChecked(e.target.checked);
    };
    /* mục đích:  dùng để câp nhật lại UI khi state redux thay đổi.  */
    useEffect(() => {
        setValue(state.criterialForFilter[PropsCheck].select);
        setIsChecked(state.criterialForFilter[PropsCheck][PropsCheck]);
    }, [state.criterialForFilter]);
    return (
        <div className="mt-[19px] res_height_Filter">
            <FormControlLabel
                control={
                    <Checkbox
                        // value={isChecked}
                        checked={isChecked}
                        onChange={(e) => handleChangeCheckBox(e)}
                        name={checkBox.name}
                    ></Checkbox>
                }
                label={label}
                sx={{ width: '100%', height: '20px' }}
            />
            <Select
                value={value}
                sx={{ width: '100%', height: '36px', marginTop: '11px' }}
                onChange={handleChangeSelect}
                //test
                name={select.name}
            >
                {content.map((element: typeSelect) => (
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
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: state.criterialForFilter,
    });
    let responseFromServer = useRef<any>([]);
    const { mutate, isLoading } = useMutation({
        mutationFn: getUserBaseFilter,
        onSuccess: (res: any) => {
            responseFromServer.current = [...responseFromServer.current, ...res.users];
            dispatch(actions.makeListFilter(responseFromServer.current));
        },
    });

    const handleSubmitForm = (payloadForm: OutPutFormFilter | any) => {
        // khi lấy từ input tất cả đề là string nên dòng này chuyển select của age và height  về number
        // console.log('payloadForm>>>', payloadForm);
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
        reset(CRITERIAL_FOR_FILTER_DEFAULT);
        responseFromServer.current = [];
        dispatch(actions.resetCriterialForFilter());
    };
    const handleHiddenFilter = () => {
        dispatch(actions.togleDisplayFilter(state.isDisplayFiler));
    };

    return (
        <div className="fixed z-10 right-[--mrForChild] top-[calc(var(--heightNav)+var(--mrForChild))] bottom-[--mrForChild] rounded-[--borderForLayout]  overflow-auto xs_max:top-0 xs_max:right-0 xs_max:left-0 xs_max:bottom-0 ">
            <div className="bg-[white]  w-[319px] pt-[25px] pb-[24px] px-[22px] sm_max:w-full xs_max:h-full ">
                <button onClick={handleHiddenFilter} className="btnFlashing">
                    {isLoading ? 'Loading...' : ' FILTER'}
                </button>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    {ListFilter.map((each) => (
                        <CheckAndSelect
                            label={each.label}
                            content={each.content}
                            key={each.label}
                            register={register}
                            PropsCheck={each.propcheck}
                            PropsSelect={each.propselect}
                            control={control}
                        />
                    ))}
                    <div className="mt-[42px] flex justify-between relative">
                        <p className="absolute top-[-30px]  w-full">Click FILTER to close</p>
                        <Button variant="outlined" sx={{ width: '129px' }} onClick={handleClearForm}>
                            Clear All
                        </Button>
                        <Button variant="contained" sx={{ width: '129px' }} type="submit">
                            Show
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filter;
/* 
useEffect đề bọc 2 cái setValue  vì tránh vòng lặp vĩnh viễn 

*/
