import * as yup from 'yup';
import { NAME } from '~/data/type/typeGlobal';
const LENGTH =20;
const MESSAGE_ERROR = `less ${LENGTH} chart`;
// const MAX_DATE= new Date("31/12/2023") ;
// const MIN_DATE= new Date("1/1/2023")

const schema = yup
    .object({
        [NAME.text]: yup.string().max(LENGTH, MESSAGE_ERROR).required(),
        [NAME.author]: yup.string().max(LENGTH, MESSAGE_ERROR).required(),
        [NAME.createdDate]: yup.string().max(LENGTH, MESSAGE_ERROR).required(),
        [NAME.complete]: yup.boolean().required(),
    })
    .required();
export { schema };
/* 
thêm yêu cầu 1-100 kí tự 
ngày phải có form : 25/12/2023 dd/mm/yyyy

*/
