import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { TableAnimation } from '../../components';
import { useGlobalState } from '../../store/Provider';
import { getLimitAndSkipUser, getUserBaseOnID } from '../../api/log_time_api';
import { actions } from '../../store';
import { TableForUser } from '~/components';
import debounce from '~/custome_hook/debounce';
import {
    ImportForm,
    Filter,
    FormViewUser,
    AnimationMountAndUnMount,
    NavAccount,
    SearchAndFilter,
} from '../../components';
import { typeUserAfterCallApiBaseOnID } from '../../data/type';
import { useKindOfTable, classifyUser } from '~/custome_hook';
import { initState, typePagination } from '~/components/TableForUser';

function Accounts() {
    const [state, dispatch] = useGlobalState();
    const kindOfTable = useKindOfTable();
    const [statePagination, setStatePagination] = useState({
        rowPerPage: initState.rowPerPage,
        ordinalPage: initState.ordinalPage,
    });
    const [searchParam, setSearchParam] = useState('');
    // call apis by id dùng cho hiển thị form View
    const { status: statusForApiByID } = useQuery({
        queryKey: ['userByID', state.UserForFormView.id],
        queryFn: () => getUserBaseOnID(state.UserForFormView.id),
        enabled: !!state.UserForFormView.id,
        onSuccess: (res: typeUserAfterCallApiBaseOnID) => {
            dispatch(actions.viewDataUserForFORMVIEW(res));
        },
        onError: () => {
            toast.error('get one api fail ');
        },
    });
    const queryAll = useQuery({
        queryKey: ['getAll', statePagination, searchParam],
        queryFn: () =>
            getLimitAndSkipUser(
                statePagination.rowPerPage,
                (statePagination.ordinalPage - 1) * statePagination.rowPerPage,
                searchParam,
            ),
        keepPreviousData: true,
    });
    const handleOnChangePagination = (payload: typePagination) => {
        setStatePagination({ ...payload });
    };

    return (
        <section className="">
            {queryAll.status === 'loading' && <TableAnimation />}
            {queryAll.status === 'success' && (
                <div className="bg-white  rounded-[12px] px-8 pb-[68px] pt-8 xs_max:px-[--margin4px] xs_max:pt-4 ">
                    <NavAccount />
                    <SearchAndFilter onChange={(event) => debounce(() => setSearchParam(event.target.value), 1000)} />
                    {kindOfTable === 'all' && (
                        <TableForUser
                            listUser={queryAll.data.users}
                            kindOfTable="all"
                            numberOfUser={80}
                            handleOnChangePagination={handleOnChangePagination}
                        />
                    )}
                    {kindOfTable === 'vinova' && (
                        <TableForUser
                            listUser={classifyUser(queryAll.data?.users).listMale}
                            kindOfTable="vinova"
                            numberOfUser={80}
                            handleOnChangePagination={handleOnChangePagination}
                        />
                    )}
                    {kindOfTable === 'partner' && (
                        <TableForUser
                            listUser={classifyUser(queryAll.data?.users).listFemale}
                            kindOfTable="partner"
                            numberOfUser={80}
                            handleOnChangePagination={handleOnChangePagination}
                        />
                    )}
                    <AnimationMountAndUnMount isMount={state.isDisplayFiler}>
                        <Filter />
                    </AnimationMountAndUnMount>
                    <AnimationMountAndUnMount isMount={statusForApiByID === 'success' && state.isDisplayFormView}>
                        {statusForApiByID === 'success' && <FormViewUser />}
                    </AnimationMountAndUnMount>
                    <AnimationMountAndUnMount isMount={state.isDisplayImportForm}>
                        <ImportForm />
                    </AnimationMountAndUnMount>
                </div>
            )}
            <Outlet />
        </section>
    );
}

export default Accounts;
