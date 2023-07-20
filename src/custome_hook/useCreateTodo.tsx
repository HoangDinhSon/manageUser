import { useMutation } from 'react-query';
import {  createTodo } from '~/api/log_time_api';

const useCreateTodo = (refetch: any) => {
    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            refetch();
            window.history.back();
        },
    });
};
export default useCreateTodo;
