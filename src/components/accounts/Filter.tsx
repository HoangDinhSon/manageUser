import { Checkbox, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { useState,  } from 'react';
import { useForm } from 'react-hook-form';
type typeSeclect = { children: string; value: string | number };
interface formFilter {
    contract: boolean;
    contractSelect: string | number;
    level: boolean;
    levelSelect: string | number;
    position: boolean;
    positionSelect: string | number;
    role: boolean;
    roleSelect: string | number;
    skill: boolean;
    skillSelect: string | number;
    team: boolean;
    teamSelect: string | number;
}
const ListFilter = [
    {
        label: 'Role',
        propcheck: 'role',
        propselect: 'roleSelect',
        content: [
            { children: 'Admin', value: 'admin' },
            { children: 'Customer', value: 'customer' },
            { children: 'User', value: 'user' },
        ],
    },
    {
        label: 'Team',
        propcheck: 'team',
        propselect: 'teamSelect',
        content: [
            { children: 'JS', value: 'js' },
            { children: 'Java', value: 'java' },
            { children: 'C++', value: 'c' },
        ],
    },
    {
        label: 'Position',
        propcheck: 'position',
        propselect: 'positionSelect',
        content: [
            { children: 'Leader', value: 'leader' },
            { children: 'Employee', value: 'employee' },
        ],
    },
    {
        label: 'Level',
        propcheck: 'level',
        propselect: 'levelSelect',
        content: [
            { children: 'Mot', value: 'mot' },
            { children: 'Hai', value: 'hai' },
        ],
    },
    {
        label: 'Skills',
        propcheck: 'skill',
        propselect: 'skillSelect',
        content: [
            { children: 'PM, React Native, Mobile iOS', value: 'pm' },
            { children: ' React Native', value: 'reactnative' },
        ],
    },
    {
        label: 'Contract Type',
        propcheck: 'contract',
        propselect: 'contractSelect',
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
        console.log('check handle ', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className="mt-[19px] ">
            <FormControlLabel
                control={<Checkbox {...register(PropsCheck)}></Checkbox>}
                label={label}
                sx={{ width: '100%', height: '20px' }}
            />
            <Select
                {...register(PropsSelect)}
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
    const [isdisplayForm , setIsDisplayForm]= useState(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const handleSubmitForm = (payloadForm: any) => {
        console.log('🚀 ~ file: Filter.tsx:55 ~ handleSubmitForm ~ payload:', payloadForm);
        reset();
    };
    const handleClearForm = () => {
        setIsDisplayForm(false);
        // hàm này mục đích mount lại filter lúc đó nó sẽ reset lại data 
        setTimeout(()=>{setIsDisplayForm(true);},1)
        
    };
    
    return (
        <div className="bg-white  w-[319px] pt-[13px] pb-[24px] px-[22px] h-[700px]  ">
            <div className="bg-white rounded-md">
                <p>Filter</p>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    {isdisplayForm&&ListFilter.map((each) => (
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
                    {!isdisplayForm&&ListFilter.map((each) => (
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
