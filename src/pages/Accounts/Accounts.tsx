import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import { TableAnimation } from '../../components';
import { TableUser } from '../../components/accounts/TableUser';
import { useGlobalState } from '../../store/Provider';
import { getUserBaseOnID } from '../../api/log_time_api';
import { actions } from '../../store';
import {
    ImportForm,
    Filter,
    FormViewUser,
    AnimationMountAndUnMount,
    NavAccount,
    SearchAndFilter,
} from '../../components';
import { typeUserAfterCallApiBaseOnID } from '../../data/type';
function Accounts({ status }: any) {
    const [state, dispatch] = useGlobalState();
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
    return (
        <section className="">
            <Toaster />
            {status === 'loading' && <TableAnimation />}
            {status === 'success' && (
                <div className="bg-white  rounded-[12px] px-8 pb-[68px] pt-8 xs_max:px-[--margin4px] xs_max:pt-4 ">
                    <NavAccount />
                    <SearchAndFilter />
                    <TableUser />
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
