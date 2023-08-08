import { hasSameProperty } from "../../handlelogic";
type listOption = Array<{
    value: string;
    content: string;
}>;
type typeFormAddAndEditAfterChange = {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    bloodGroup: string;
    email: string;
    phoneCodeCountry: string;
    phoneNumber: string;
    birthDate: string;
    university: string; // mới thêm vào
    eyeColor: string;
    hairColor: string;
    team: string;
    position: string;
    level: string;
};
const listOptionEyeColor: listOption = [
    { value: 'Green', content: 'Green' },
    { value: 'Brown', content: 'Brown' },
    { value: 'Gray', content: 'Gray' },
    { value: 'Amber', content: 'Amber' },
    { value: 'Blue', content: 'Blue' },
];
const listHairColor: listOption = [
    { value: 'Blond', content: 'Blond' },
    { value: 'Brown', content: 'Brown' },
    { value: 'Chestnut', content: 'Chestnut' },
    { value: 'Black', content: 'Black' },
];
const listOptionTeam: listOption = [
    { value: 'backend', content: 'Backend' },
    { value: 'frontend', content: 'Frontend' },
];
const listOptionPotion: listOption = [
    { value: 'lead', content: 'Lead' },
    { value: 'employee', content: 'Employee' },
];
const listOptionLevel: listOption = [
    { value: 'senior', content: 'Senior' },
    { value: 'fresher', content: 'Fresher' },
];
const listGender: listOption = [
    { value: 'male', content: 'male' },
    { value: 'female', content: 'female' },
];

const listBlood: listOption = [
    { value: 'A−', content: 'A−' },
    { value: 'A+', content: 'A+' },
    { value: 'O+', content: 'O+' },
    { value: 'O−', content: 'O−' },
    { value: 'B+', content: 'B+' },
    { value: 'B−', content: 'B−' },
    { value: 'AB−', content: 'AB−' },
];
const CODE_PHONE_NUMBER = {
    '+84': '+84',
    '+85': '+85',
    '+86': '+86',
    '+63': '+63',
    '+37': '+37',
};
const instance: typeFormAddAndEditAfterChange = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    email: '',
    phoneCodeCountry: '',
    phoneNumber: '',
    birthDate: '',
    university: '',
    eyeColor: '',
    hairColor: '',
    team: '',
    position: '',
    level: '',
};
const NameRegisterForm = {
   
    firstName: 'firstName',
    lastName: 'lastName',
    age: 'age',
    gender: 'gender',
    bloodGroup: 'bloodGroup',
    email: 'email',
    phoneCodeCountry: 'phoneCodeCountry',
    phoneNumber: 'phoneNumber',
    birthDate: 'birthDate',
    university: 'university', // mới thêm vào
    eyeColor: 'eyeColor',
    hairColor: 'hairColor',
    team: 'team',
    position: 'position',
    level: 'level',
};
 (function checkKeyOfObject() {
    if (hasSameProperty( instance,NameRegisterForm) === false || hasSameProperty(instance, NameRegisterForm) === -1) {
        console.log('NameRegisterForm need has key same key of  typeFormAddAndEditAfterChange ');
        alert('NameRegisterForm need has key same key of  typeFormAddAndEditAfterChange ');
    }
})();

const DEFAULT_VALUE_fORM_ADD: typeFormAddAndEditAfterChange = {
    firstName: '',
    lastName: '',
    age: '',
    gender: listGender[0].value,
    bloodGroup: listBlood[0].value,
    email: '',
    phoneCodeCountry: CODE_PHONE_NUMBER['+84'],
    phoneNumber: '',
    birthDate: '1994-01-02',
    university: '', // mới thêm vào
    eyeColor: listOptionEyeColor[0].value,
    hairColor: listHairColor[0].value,
    team: listOptionTeam[0].value,
    position: listOptionPotion[0].value,
    level: listOptionLevel[0].value,
};

export {
    listOptionEyeColor,
    listHairColor,
    listOptionTeam,
    listOptionPotion,
    listOptionLevel,
    listBlood,
    listGender,
    NameRegisterForm,
    DEFAULT_VALUE_fORM_ADD,
    CODE_PHONE_NUMBER,
};
export type { typeFormAddAndEditAfterChange, listOption };
