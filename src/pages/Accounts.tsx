import { Button, TextField } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { TableUser } from '../components/accounts/TableUser';
import { filterbutton, iconSearch } from '../assets/icon';
import { useGlobalState } from '../store/Provider';
import { getUserBaseOnID } from '../Api/logTimeApi';
import { actions } from '../store';
import { ImportForm, Filter, FormViewUser, BtnImportAndADD } from '../components';

function Accounts() {
    const [state, dispatch] = useGlobalState();
    const handleSwitchDisplayFilterForm = () => {
        dispatch(actions.togleDisplayFilter(state.isDisplayFiler));
    };
    // call apis by id dùng cho hiển thị form View
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
            <div className="bg-white rounded-[12px] px-8 pt-8 pb-[68px]">
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

                <TableUser />

                {state.isDisplayFiler && (
                    <div className="fixed right-0 top-[78px] bottom-0  overflow-auto">
                        <label
                            htmlFor="hamburger"
                            className="text-right block bg-[--colorGrey] leading-5  rounded-[3px] cursor-pointer w-[319px] pr-5 text-white"
                        >
                            &#8644;Filter
                        </label>
                        <input type="checkbox" name="" id="hamburger" className="peer/hamburger hidden" />
                        <div className="peer-checked/hamburger:hidden">
                            <Filter />
                        </div>
                    </div>
                )}
                {statusForApiByID === 'success' && state.isDisplayFormView && <FormViewUser />}
                {state.isDisplayImportForm && <ImportForm />}
            </div>
        </section>
    );
}

export default Accounts;
