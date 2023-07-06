import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NameRegisterForm } from '../../data/constance_for_page/UI_TYPE_CONSTANT';
const {
    firstName,
    lastName,
    age,
    bloodGroup,
    email,
    phoneCodeCountry,
    phoneNumber,
    birthDate,
    university,
    eyeColor,
    hairColor,
    team,
    position,
    level,
} = NameRegisterForm;

const schemaAddUSer = yup
    .object({
        [firstName]: yup.string().matches(/\p{L}/u).required(), // chỉ dc chữ cái bao gồm cả chữ non ASCII 
        [lastName]: yup.string().matches(/\p{L}/u).required(),
        [age]: yup.string().required(),//ok
        [bloodGroup]: yup.string().required(),
        [email]: yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
        [phoneCodeCountry]: yup.string().required(),
        [phoneNumber]: yup.string().matches(/^\d+$/).required(), // yêu cầu là string chỉ có số only Number
        [university]: yup.string().required(),
        [birthDate]: yup.string().required(),
        [eyeColor]: yup.string().required(),//ok
        [hairColor]: yup.string().required(),
        [team]: yup.string().required(),
        [position]: yup.string().required(),
        [level]: yup.string().required(),
    })
    .required(); // yêu cầu phải điền vào cả .
const resolverFormAddUser = {
    resolver: yupResolver(schemaAddUSer),
};
export { resolverFormAddUser };

/* 
NameRegisterForm mục đích để khớp Name của UI 

*/
