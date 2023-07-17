import { toast } from 'react-hot-toast';
type typeProps = {
    error: any;
    myMessage: string;
};
/* dùng cho axios xử lí lỗi cái này không dùng với thư viện react query  */
function handleError({ error, myMessage }: typeProps) {
    if (error.response) {
        toast.error(myMessage);
        // console.log(`The request was made and the server responded with a status code`);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
    } else if (error.request) {
        toast.error('Whoops!! disconnect error');
        // console.log(` The request was made but no response was received `);
        // console.log(error.request);
    } else {
        toast.error('Some thing wrong!!!');
        console.log('Something happened in setting up the request that triggered an Error', error.message);
    }
}
export default handleError;

/*
 ***********************************OoO**********************************************
 */

type typeError = any;
function handleErrorAxiosUseForReactQuery(error: typeError, myMessage: string) {
    if (error.response) {
        toast.error(myMessage);
        console.log(`The request was made and the server responded with a status code`);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
    } else if (error.request) {
        toast.error('Whoops!! disconnect error');
        console.log(` The request was made but no response was received `);
        // console.log(error.request);
    } else {
        toast.error('Some thing wrong!!!');
        console.log('Something happened in setting up the request that triggered an Error', error.message);
    }
}
export { handleErrorAxiosUseForReactQuery };
