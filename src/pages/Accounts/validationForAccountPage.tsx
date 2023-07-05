import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NameRegisterForm } from '../../data/constance_for_page/UI_TYPE_CONSTANT';
const {
    firstName,
    lastName,
    alias,
    role,
    email,
    phoneCodeCountry,
    phoneNumber,
    contractEndDate,
    contractType,
    contractStartDate,
    company,
    office,
    team,
    position,
    level,
} = NameRegisterForm;

const schemaAddUSer = yup
    .object({
        [firstName]: yup.string().matches(/\p{L}/u).required(), // chỉ dc chữ cái bao gồm cả chữ non ASCII 
        [lastName]: yup.string().matches(/\p{L}/u).required(),
        [alias]: yup.string().matches(/\p{L}/u).required(),
        [role]: yup.string().matches(/\p{L}/u).required(),
        [email]: yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
        [phoneCodeCountry]: yup.string().required(),
        [phoneNumber]: yup.string().matches(/^\d+$/).required(), // yêu cầu là string chỉ có số only Number
        [contractType]: yup.string().required(),
        [contractStartDate]: yup.string().required(),
        [contractEndDate]: yup.string().required(),
        [company]: yup.string().required(),
        [office]: yup.string().required(),
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
