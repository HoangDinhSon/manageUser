import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';
import { TableAnimation, TableForNewApi } from '../../components';
import { useGlobalState } from '../../store/Provider';
import { getUserBaseOnID, getTodo } from '../../Api/logTimeApi';
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

function Report() {
    const [state, dispatch] = useGlobalState();
    // call api for table user
    const { status, data: dataTodo, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodo,
    });

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
                    <TableForNewApi listTodo={dataTodo}  />
                    <AnimationMountAndUnMount isMount={state.isDisplayFiler}>
                        <Filter />
                    </AnimationMountAndUnMount>
                    <AnimationMountAndUnMount isMount={statusForApiByID === 'success' && state.isDisplayFormView}>
                        {statusForApiByID === 'success' && <FormViewUser />}
                    </AnimationMountAndUnMount>
                    <AnimationMountAndUnMount isMount={state.isDisplayImportForm}>
                        <ImportForm />
                    </AnimationMountAndUnMount>
                    {/* dùng truyền dữ liệu vào trong component con của children react router dom  */}
                    <Outlet context={[dataTodo,refetch]} />
                </div>
            )}
        </section>
    );
}

export default Report;
