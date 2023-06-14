import { Checkbox, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
type typeSeclect = { children: string; value: string | number };
const ListFilter = [
    {
        label: 'Role',
        content: [
            { children: 'Admin', value: 'admin' },
            { children: 'Customer', value: 'customer' },
            { children: 'User', value: 'user' },
        ],
    },
    {
        label: 'Team',
        content: [
            { children: 'JS', value: 'js' },
            { children: 'Java', value: 'java' },
            { children: 'C++', value: 'c' },
        ],
    },
    {
        label: 'Position',
        content: [
            { children: 'Leader', value: 'admin' },
            { children: 'Employee', value: 'employee' },
        ],
    },
    {
        label: 'Level',
        content: [
            { children: 'Mot', value: 'mot' },
            { children: 'Hai', value: 'hai' },
        ],
    },
    {
        label: 'Skills',
        content: [
            { children: 'PM, React Native, Mobile iOS', value: 'pm' },
            { children: ' React Native', value: 'reactnative' },
        ],
    },
    {
        label: 'Contract Type',
        content: [
            { children: 'Probation', value: 'probation' },
            { children: 'Long', value: 'long' },
            { children: 'Short', value: 'short' },
        ],
    },
];

function CheckAndSeclect({ PropCheck, PropsSelect, label, value, content }: any) {
    return (
        <div className="mt-[19px] ">
            <FormControlLabel
                control={<Checkbox {...PropCheck}></Checkbox>}
                label={label}
                sx={{ width: '100%', height: '20px' }}
            />
            <Select
                value={value ? value : content[0].value}
                sx={{ width: '100%', height: '36px', marginTop: '11px' }}
                {...PropsSelect}
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
    return (
        <div className="bg-white  w-[319px] pt-[13px] pb-[24px] px-[22px] h-[700px]  ">
            <div className="bg-white rounded-md">
                <p>Filter</p>
                <form>
                    {ListFilter.map((each) => (
                        <CheckAndSeclect label={each.label} content={each.content} key={each.label} />
                    ))}
                    <div className='mt-[42px] flex justify-between' >
                        <Button variant="outlined" sx={{width:"129px"}}>Clear All</Button>
                        <Button variant="contained" sx={{width:"129px"}}>Show </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filter;
