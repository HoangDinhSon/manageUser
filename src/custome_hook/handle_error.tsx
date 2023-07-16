import { toast } from 'react-hot-toast';
type typeProps = {
    error: any;
    myMessage:string
};
function handleError({ error , myMessage}: typeProps) {
    if (error.response) {
        toast.error(myMessage);
        console.log(`The request was made and the server responded with a status code`);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        toast.error(myMessage);
        console.log(` The request was made but no response was received `);
        console.log(error.request);
    } else {
        toast.error(myMessage);
        console.log('Something happened in setting up the request that triggered an Error', error.message);
    }
}
export default handleError
/* 
axios when error :

*/
