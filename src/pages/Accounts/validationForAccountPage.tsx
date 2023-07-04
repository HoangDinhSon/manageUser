import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NameRegisterForm } from '../../data/constance_for_page/constantUI';
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
        [firstName]: yup.string().required(),
        [lastName]: yup.string().required(),
        [alias]: yup.string().required(),
        [role]: yup.string().required(),
        [email]: yup.string().required(),
        [phoneCodeCountry]: yup.string().required(),
        [phoneNumber]: yup.string().matches(/^\d+$/).required(),// yêu cầu là string chỉ có số only Number 
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
type typeFormAddAndEdit = yup.InferType<typeof schemaAddUSer>;
const resolverFormAddUser = {
    resolver: yupResolver(schemaAddUSer),
};
export { resolverFormAddUser };
export type { typeFormAddAndEdit };
/* 
NameRegisterForm mục đích để khớp Name của UI 



*/