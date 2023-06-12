import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"

const schema = yup.object({
    "username": yup.string().required(),
    "password": yup.string().required(),
}).required()
type FormLogin = yup.InferType<typeof schema>
 const resolverLogin = {
    resolver : yupResolver(schema)
 }
 export default resolverLogin  ;
 export type {FormLogin}