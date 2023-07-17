import * as yup from 'yup';
import { NAME } from '~/data/type/typeGlobal';
import { parse, isDate } from 'date-fns';
const LENGTH = 20;
const MESSAGE_ERROR = `less ${LENGTH} chart`;
const schema = yup
    .object({
        [NAME.text]: yup.string().max(LENGTH, MESSAGE_ERROR).required('can not empty'),
        [NAME.author]: yup.string().max(LENGTH, MESSAGE_ERROR).required(),
        // [NAME.createdDate]: yup.string().max(LENGTH, MESSAGE_ERROR).required(),
        [NAME.createdDate]: yup
            .date()
            .transform((value, originalValue) => {
                const parsedDate = isDate(originalValue)
                    ? originalValue
                    : parse(originalValue, 'dd/MM/yyyy', new Date());
                return parsedDate;
            })
            .typeError('Example:23/12/2023')
            .min(new Date(), 'Không dc điền ngày trong quá khứ')
            .required(),
        [NAME.complete]: yup.boolean().required(),
    })
    .required();
export { schema };
/* 
thêm yêu cầu 1-100 kí tự 
ngày phải có form : 25/12/2023 dd/mm/yyyy
không dc nhập ngày trong quá khứ . 
dùng thư viện date-fns
*/
