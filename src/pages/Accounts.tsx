import { Button, TextField } from '@mui/material';
import { useQuery } from 'react-query';
import { TableUser } from '../components/accounts/TableUser';
import { filterbutton, iconSearch } from '../assets/icon';
import { useGlobalState } from '../store/Provider';
import { getLimitAndSkipUser, getUserBaseOnID } from '../Api/logTimeApi';
import { actions } from '../store';
import { Filter, FormViewUser } from '../components/accounts';
import { Toaster, toast } from 'react-hot-toast';

function Accounts() {
    const [state, dispatch] = useGlobalState();
    console.log('🚀 ~ file: Accounts.tsx:12 ~ Accounts ~ state:', state);
    let limit = state.rowPerPage;
    let skip = (state.ordinalNumberPage - 1) * state.rowPerPage;
    const { status } = useQuery({
        queryKey: ['getLimitAndSkip', limit, skip],
        queryFn: () => getLimitAndSkipUser(limit, skip),
        onSuccess: (res) => {
            dispatch(actions.upDateListUser(res));
        },
    });
    const handleSwitchDisplayFilterForm = () => {
        dispatch(actions.togleDisplayFilter(state.togleDisplayFiter));
    };
    // call apis by id
    const { status: statusForApiByID } = useQuery({
        queryKey: ['userByID', state.UserForFormView.id],
        queryFn: () => getUserBaseOnID(state.UserForFormView.id),
        enabled: !!state.UserForFormView.id,
        onSuccess: (res) => {
            dispatch(actions.viewDataUserForFORMVIEW(res));
        },
        onError: () => {
            toast.error('get one api fail ');
        },
    });

    return (
        <section className="accounts pt-[98px] mx-5 w-full">
            <Toaster />
            {status === 'loading' && <div>loading....</div>}
            {status === 'error' && <div>error</div>}
            {status === 'success' && (
                <div className="bg-white rounded-[12px] p-8">
                    <div className="nav_for_table flex gap-1 h-[54px] items-end   border-b border-[#EBEBEB]">
                        <p className="w-[44px] h-[40px] leading-[40px] text-center text-[#5E90F0]  border-b-4 border-[#5E90F0]">
                            All
                        </p>
                        <p className="w-[75px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Vinova</p>
                        <p className="w-[44px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Patner</p>
                    </div>
                    <div className="search_filter h-[97px] pt-[29px]">
                        <TextField
                            placeholder="Search"
                            InputProps={{
                                startAdornment: <img src={iconSearch} alt="" className="pr-2" />,
                                style: {
                                    height: '40px',
                                },
                            }}
                        />
                        <Button sx={{ height: '40px' }} onClick={handleSwitchDisplayFilterForm}>
                            <img src={filterbutton} alt="" />
                        </Button>
                    </div>
                    <div className="flex">
                        <TableUser />
                        {state.togleDisplayFiter && <Filter />}
                    </div>
                    {statusForApiByID === 'success' && state.isDisplayFormView && <FormViewUser />}
                </div>
            )}
        </section>
    );
}

export default Accounts;
