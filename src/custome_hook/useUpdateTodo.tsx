import { useMutation } from 'react-query';
import { updateTodo} from '~/api/log_time_api';


function useUpdateTodo (refetch :any){
    return useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            refetch();
            window.history.back();
        },
    });
}
export default useUpdateTodo