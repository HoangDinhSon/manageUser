import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { handleErrorAxiosUseForReactQuery } from '.';
type message = string;
// export const toastSuccess = (message: message) => {
//     toast.success(`${message} is success`, {
//         // nếu có 2 toast success xảy ra đồng thời nó chỉ chấp nhận 1 cái tránh 2 thông báo lặp lại
//         // id: 'clipboard',
//     });
// };

let idLoading: any;
export const myToastPromise = (status: string,error:any,myMessage:string) => {
    useEffect(() => {
        if (status != 'idle') {
            if (status === 'loading') {
                idLoading = toast.loading('Loading...');
            }
            if (status === 'success') {
                toast.success('success');
                toast.dismiss(idLoading);
            }
            if (status === 'error') {
                handleErrorAxiosUseForReactQuery(error,myMessage)
                toast.dismiss(idLoading);
            }
        }
    }, [status]);
};
/* 
input :
1. status of useMutation or useQuery ,
2. error : from axios throw -> useMutation
3. myMessage: string 

*/
/* *****************0o0***************** */
function toastHandleWithoutLib(){
    
}
