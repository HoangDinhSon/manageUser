import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import { TableAnimation, TableForNewApi } from '../../components';
import { getTodo } from '../../api/log_time_api';
import { NavAccount, SearchAndFilter } from '../../components';
import { handleErrorAxiosUseForReactQuery } from '~/custome_hook';

function Report() {
    // call api for table Todo
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
        < >
            {status === 'loading' && <TableAnimation />}
            {status === 'success' && (
                <div className="bg-white  rounded-[12px] px-8 pb-[68px] pt-8 xs_max:px-[--margin4px] xs_max:pt-4 ">
                    <NavAccount />
                    <SearchAndFilter />
                    <TableForNewApi listTodo={dataTodo} refetch={refetch} />
                    <Outlet context={[dataTodo, refetch]} />
                </div>
            )}
        </>
    );
}

export default Report;
/*
Component Outlet use for position of children in react-router-dom 
*/
