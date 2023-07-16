type typeSelect = { children: string; value: string | number };
type typeListFilter = {
    checked: boolean;
    valueSelect: string|number;
    label: string;
    propcheck: string;
    propselect: string;
    content: typeSelect[];
}[];
const ListFilter:typeListFilter = [
    {
        checked: false,
        valueSelect: '',
        label: 'Gender',
        propcheck: 'gender',
        propselect: 'select',
        content: [
            { children: 'male', value: 'male' },
            { children: 'female', value: 'female' },
        ],
    },
    {
        checked: false,
        valueSelect: 50,
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
        checked: false,
        valueSelect: '',
        label: 'Eye Color',
        propcheck: 'eyeColor',
        propselect: 'select',
        content: [
            { children: 'Green', value: 'Green' },
            { children: 'Amber', value: 'Amber' },
            { children: 'Blue', value: 'Blue' },
        ],
    },
    {
        checked: false,
        valueSelect: '',
        label: 'Blood Group',
        propcheck: 'bloodGroup',
        propselect: 'select',
        content: [
            { children: 'B−', value: 'B−' },
            { children: 'A−', value: 'A−' },
        ],
    },
    {
        checked: false,
        valueSelect: '',
        label: 'University',
        propcheck: 'university',
        propselect: 'select',
        content: [
            { children: 'Capitol University', value: 'Capitol University' },
            { children: 'Stavropol State Technical University', value: 'Stavropol State Technical University' },
        ],
    },
    {
        checked: false,
        valueSelect: '',
        label: 'Height',
        propcheck: 'height',
        propselect: 'select',
        content: [
            { children: '188', value: 188 },
            { children: '200', value: 200 },
            { children: '176', value: 176 },
        ],
    },
];
const CRITERIAL_FOR_FILTER_DEFAULT = {
    gender: {
        gender: false,
        select: 'male',
    },
    age: {
        age: false,
        select: 50,
    },
    eyeColor: {
        eyeColor: false,
        select: 'Green',
    },
    bloodGroup: {
        bloodGroup: false,
        select: 'A−',
    },
    university: {
        university: false,
        select: 'Capitol University',
    },
    height: {
        height: false,
        select: 188,
    },
};
export { CRITERIAL_FOR_FILTER_DEFAULT, ListFilter };
export type {typeSelect,typeListFilter}
