import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// validation of login
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

export default resolverLogin;
export type { FormLogin };
// validation of edit form 

const schemaForFormEdit =yup.object({
    



})
type FormEditUser = yup.InferType<typeof schemaForFormEdit >
