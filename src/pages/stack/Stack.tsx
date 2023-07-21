import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { TableAnimation, TableForNewApi } from '../../components';
import { getTodo } from '../../api/log_time_api';
import { EditAndAddForPageStack } from '..';
import { useGlobalState } from '~/store/Provider';
import { handleErrorAxiosUseForReactQuery } from '~/custome_hook';

import { NavAccount, SearchAndFilter } from '../../components';

function Stack() {
    const [state] = useGlobalState();
    // call api for table user
    const {
        status,
        data: dataTodo,
        refetch,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodo,
        onError:(error)=>{
            handleErrorAxiosUseForReactQuery(error, 'fail get data for report page')
        }
    });

    return (
        <section className="">
            <Toaster />
            {status === 'loading' && <TableAnimation />}
            {status === 'success' && (
                <div className="bg-white  rounded-[12px] px-8 pb-[68px] pt-8 xs_max:px-[--margin4px] xs_max:pt-4 ">
                    <NavAccount />
                    <SearchAndFilter />
                    <TableForNewApi listTodo={dataTodo} refetch={refetch} />
                    {(state.isDisplayEditAndAddPageStack) && <EditAndAddForPageStack listTodo={dataTodo}  refetch={refetch} />}
                </div>
            )}
        </section>
    );
}

export default Stack;
