type listOption = Array<{
    value: string;
    content: string;
}>;
const listOptionCompany:listOption = [
    { value: 'vinovaOne', content: 'VinovaOne' },
    { value: 'vinovaTow', content: 'VinovaTow' },
];
const listOptionOffice :listOption = [
    { value: 'hn', content: 'Hà Nội' },
    { value: 'hcm', content: 'Hồ Chí Minh' },
];
const listOptionTeam :listOption = [
    { value: 'propation1', content: 'Propation1' },
    { value: 'propation2', content: 'Propation2' },
];
const listOptionPotion :listOption = [
    { value: 'lead', content: 'Lead' },
    { value: 'employee', content: 'Employee' },
];
const listOptionLevel :listOption = [
    { value: 'senior', content: 'Senior' },
    { value: 'fresher', content: 'Fresher' },
];
const listContractType :listOption = [
    { value: 'short', content: 'Short' },
    { value: 'middle', content: 'Middle' },
    { value: 'long', content: 'Long' },
    { value: 'infinity', content: 'Infinity' },
];

const NameRegisterForm = {
    firstName: 'firstName',
    lastName: 'lastName',
    alias: 'alias',
    role: 'role',
    email: 'email',
    phoneCodeCountry: 'phoneCodeCountry',
    phoneNumber: 'phoneNumber',
    contractType: 'contractType',
    contractStartDate: 'contractStartDate',
    contractEndDate: 'contractEndDate',
    company: 'company',
    office: 'office',
    team: 'team',
    position: 'position',
    level: 'level',
};
type typeFormAddAndEditAfterChange = typeof NameRegisterForm;
export {
    listOptionCompany,
    listOptionOffice,
    listOptionTeam,
    listOptionPotion,
    listOptionLevel,
    listContractType,
    NameRegisterForm,
};
export type { typeFormAddAndEditAfterChange, listOption };
