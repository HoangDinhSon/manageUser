import { Checkbox, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { useMemo, useRef, useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { getUserBaseFilter } from '../../Api/logTimeApi';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
type typeSeclect = { children: string; value: string | number };
type typeForm = {
    contract: boolean;
    contractSelect: string;
    level: boolean;
    levelSelect: string;
    position: boolean;
    positionSelect: string;
    role: boolean;
    roleSelect: string;
    skill: boolean;
    skillSelect: string;
    team: boolean;
    teamSelect: string;
};

const ListFilter = [
    {
        label: 'Role(id)',
        propcheck: 'id',
        propselect: 'select',
        content: [
            { children: 'Admin1', value: '1' },
            { children: 'Customer2', value: '2' },
            { children: 'UserID3', value: '3' },
        ],
    },
    {
        label: 'Team(Age)',
        propcheck: 'age',
        propselect: 'select',
        content: [
            { children: 'JS', value: '50' },
            { children: 'Java', value: '27' },
            { children: 'C++', value: '28' },
        ],
    },
    {
        label: 'Position',
        propcheck: 'position',
        propselect: 'select',
        content: [
            { children: 'Leader', value: 'leader' },
            { children: 'Employee', value: 'employee' },
        ],
    },
    {
        label: 'Level',
        propcheck: 'level',
        propselect: 'select',
        content: [
            { children: 'Mot', value: 'mot' },
            { children: 'Hai', value: 'hai' },
        ],
    },
    {
        label: 'Skills',
        propcheck: 'skill',
        propselect: 'select',
        content: [
            { children: 'PM, React Native, Mobile iOS', value: 'pm' },
            { children: ' React Native', value: 'reactnative' },
        ],
    },
    {
        label: 'Contract Type',
        propcheck: 'contract',
        propselect: 'select',
        content: [
            { children: 'Probation', value: 'probation' },
            { children: 'Long', value: 'long' },
            { children: 'Short', value: 'short' },
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
type DataCallApi = { keyFilter: string | number; valueFilter: string | number }[]; // dạng mảng chứa object

function Filter() {
    const [state, dispatch] = useGlobalState();
    const [isdisplayForm, setIsDisplayForm] = useState(true);
    const [listUser, setListUser] = useState<any[]>([]);
    const { register, handleSubmit, reset } = useForm();
    let responseFromServer = useRef<any>([]);
    const { mutate } = useMutation({
        mutationFn: getUserBaseFilter,
        onSuccess: (res: any) => {
            responseFromServer.current = [...responseFromServer.current, ...res.users];
        },
    });

    const handleSubmitForm = (payloadForm: typeForm | any) => {
        const listKeyOfPayloadForm = Object.keys(payloadForm);
        listKeyOfPayloadForm.forEach((item) => {
            if (payloadForm[item][item]) {
                mutate({
                    keyFilter: item,
                    valueFilter: payloadForm[item]['select'],
                });
            }
        });
      
        reset();
    };
    const handleClearForm = () => {
        responseFromServer.current = [];
        setIsDisplayForm(false);
        setTimeout(() => {
            setIsDisplayForm(true);
        }, 1);
    };
    const listUnique = useMemo(() => {
        const listUserFromServer = responseFromServer.current;
        let uniqueList: any[] = [];
        listUserFromServer.forEach((element: any) => {
            let flag = true;
            uniqueList.forEach((item) => {
                if (item?.id === element.id) {
                    flag = false;
                }
            });
            if (flag === true) {
                uniqueList.push(element);
            }
        });
        setListUser(uniqueList);

        return uniqueList;
    }, [responseFromServer.current]);
    // useEffect(()=>{
    //     dispatch(actions.makeListFilter([...listUnique]));
    // })
    return (
        <div className="bg-white  w-[319px] pt-[13px] pb-[24px] px-[22px] h-[700px]  ">
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
