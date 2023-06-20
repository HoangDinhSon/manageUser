import { Button, TextField } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { TableUser } from '../components/accounts/TableUser';
import { filterbutton, iconSearch } from '../assets/icon';
import { useGlobalState } from '../store/Provider';
import { getLimitAndSkipUser, getUserBaseOnID } from '../Api/logTimeApi';
import { actions } from '../store';
import { ImportForm, Filter, FormViewUser, BtnImportAndADD } from '../components';

function Accounts() {
    const [state, dispatch] = useGlobalState();
    const handleSwitchDisplayFilterForm = () => {
        dispatch(actions.togleDisplayFilter(state.isDisplayFiler));
    };
    // call apis by id dùng cho hiển thị form 
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
        <section className="accounts_page">
            <Toaster />
                <div className="bg-white rounded-[12px] p-8">
                    <div className="nav_for_table flex gap-1 h-[54px] items-end   border-b border-[#EBEBEB]">
                        <p className="w-[44px] h-[40px] leading-[40px] text-center text-[#5E90F0]  border-b-4 border-[#5E90F0]">
                            All
                        </p>
                        <p className="w-[75px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Vinova</p>
                        <p className="w-[44px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Patner</p>
                    </div>
                    <div className="flex justify-between ">
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
                        {state.isDisplayAsideMenu && <BtnImportAndADD />}
                    </div>
                    <div className="flex">
                        <TableUser />
                        {state.isDisplayFiler && <Filter />}
                    </div>
                    {statusForApiByID === 'success' && state.isDisplayFormView && <FormViewUser />}
                    {state.isDisplayImportForm && <ImportForm />}
                </div>
        </section>
    );
}

export default Accounts;
