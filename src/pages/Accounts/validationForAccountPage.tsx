import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NameRegisterForm } from '../../data/constance_for_page/constant_type_ui';
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
const wordNonASCII = /^([\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEFA-Za-z.]{0,55})$/
const schemaAddUSer = yup
    .object({
        [firstName]: yup.string().matches(wordNonASCII,"NOT include number").required(), // chỉ dc chữ cái bao gồm cả chữ non ASCII 
        [lastName]: yup.string().matches(wordNonASCII,"NOT include number").required(),
        [age]: yup.string().matches(/^[1-9][0-9]$/,"10<age<100").required(),//ok
        [bloodGroup]: yup.string().required(),
        [email]: yup.string().email().required(),
        [phoneCodeCountry]: yup.string().required(),
        [phoneNumber]: yup.string().matches(/^\+[\d ]|^\d+$/ ,"Only Number").required(), // yêu cầu là string chỉ có số only Number and space
        [university]: yup.string().matches(wordNonASCII,"NOT include number").required(),
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
export default  resolverFormAddUser ;

/* 
NameRegisterForm mục đích để khớp Name của UI 

*/
