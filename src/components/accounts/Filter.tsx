import { Checkbox, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { useRef, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { getUserBaseFilter } from '../../Api/logTimeApi';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import { OutPutFormFilter } from '../../type';
import { ListFilter, CRITERIAL_FOR_FILTER_DEFAULT } from '../../constance_for_page';
type typeSeclect = { children: string; value: string | number };
type DataCallApi = { keyFilter: string | number; valueFilter: string | number }[]; // dạng mảng chứa object

function CheckAndSelect({ PropsCheck, PropsSelect, label, content, register }: any) {
    const [state, dispatch] = useGlobalState();
    const [value, setValue] = useState(state.criterialForFilter[PropsCheck].select);
    const [isChecked, setIsChecked] = useState(state.criterialForFilter[PropsCheck][PropsCheck]);
    const handleChangeSelect = (e: any) => {
        setValue(e.target.value);
    };
    const handleChangeCheckBox = (e: any) => {
        setIsChecked(e.target.checked);
    };
    useMemo(()=>{
        setValue(state.criterialForFilter[PropsCheck].select);
        setIsChecked(state.criterialForFilter[PropsCheck][PropsCheck])
    },[state])

    return (
        <div className="mt-[19px] ">
            <FormControlLabel
                control={
                    <Checkbox
                        {...register(`${PropsCheck}.${PropsCheck}`)}
                        checked={isChecked}
                        onChange={(e) => handleChangeCheckBox(e)}
                    ></Checkbox>
                }
                label={label}
                sx={{ width: '100%', height: '20px' }}
            />
            <Select
                {...register(`${PropsCheck}.${PropsSelect}`)}
                value={value}
                sx={{ width: '100%', height: '36px', marginTop: '11px' }}
                onChange={handleChangeSelect}
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
    const { register, handleSubmit, reset } = useForm();
    // const [ListFilterState , setListFilter] = useState(ListFilter)
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
        console.log('payloadForm>>>', payloadForm);
        
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
        reset();
    };
    const handleClearForm = () => {
        reset();
        responseFromServer.current = [];
        dispatch(actions.setCriterialForFilter(CRITERIAL_FOR_FILTER_DEFAULT));
    };
    const handleHiddenFilter = () => {
        dispatch(actions.togleDisplayFilter(state.isDisplayFiler));
    };

    return (
        <div className="bg-[white]  w-[319px] pt-[25px] pb-[24px] px-[22px] sm_max:w-full ">
            <div className="bg-white rounded-md my_test_height">
                <button onClick={handleHiddenFilter}>FILTER</button>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    {ListFilter.map((each) => (
                        <CheckAndSelect
                            label={each.label}
                            content={each.content}
                            key={each.label}
                            register={register}
                            PropsCheck={each.propcheck}
                            PropsSelect={each.propselect}
                        />
                    ))}
                    <div className="mt-[42px] flex justify-between ">
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
