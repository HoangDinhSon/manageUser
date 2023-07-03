import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//---- validation of login----------
const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();// end schema
type FormLogin = yup.InferType<typeof schema>;
const resolverLogin = {
    resolver: yupResolver(schema),
};
export  {resolverLogin};
export type { FormLogin };