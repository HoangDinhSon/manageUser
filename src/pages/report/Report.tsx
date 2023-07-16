import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Outlet} from 'react-router-dom';
import { TableAnimation, TableForNewApi } from '../../components';
import { getTodo } from '../../api/log_time_api';

import {
    NavAccount,
    SearchAndFilter,
} from '../../components';

function Report() {
    // call api for table user
    const { status, data: dataTodo, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodo,
        onError:()=>{
            toast.error("Oh No fail try press F5 refresh")
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
                    <Outlet context={[dataTodo,refetch]} />
                </div>
            )}
        </section>
    );
}

export default Report;
