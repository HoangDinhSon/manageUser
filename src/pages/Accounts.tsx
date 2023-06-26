import { Button, TextField } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { TableUser } from '../components/accounts/TableUser';
import { filterbutton, iconSearch } from '../assets/icon';
import { iconCloseForFilter } from '../assets';
import { useGlobalState } from '../store/Provider';
import { getUserBaseOnID } from '../Api/logTimeApi';
import { actions } from '../store';
import { ImportForm, Filter, FormViewUser, BtnImportAndADD } from '../components';
import { checkNumberOFCriterialForFilter } from '../handlelogic';
import { typeUserAfterCallApiBaseOnID } from '../type';

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
        onSuccess: (res:typeUserAfterCallApiBaseOnID) => {
            dispatch(actions.viewDataUserForFORMVIEW(res));

        },
        onError: () => {
            toast.error('get one api fail ');
        },
    });
    const criterialWasChosen = checkNumberOFCriterialForFilter(state.criterialForFilter);
    const resetCriterialFilter = () => {
        dispatch(actions.resetCriterialForFilter());
    };
    // response UI (theme dc config file Mui config)
    const theme = useTheme();
    const xs_max = useMediaQuery(theme.breakpoints.down("xs"));
    

    return (
        <section className="accounts_page">
            <Toaster />
            <div className="bg-white rounded-[12px] px-8 pt-8 pb-[68px] xs_max:px-[--margin4px] xs_max:pt-4">
                <div className="nav_for_table flex gap-1 h-[54px] items-end   border-b-[length:--borderWidth] border-[#EBEBEB]">
                    <p className="w-[44px] h-[40px] leading-[40px] text-center text-[#5E90F0]  border-b-4 border-[#5E90F0]">
                        All
                    </p>
                    <p className="w-[75px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Vinova</p>
                    <p className="w-[44px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Patner</p>
                </div>
                <div className="flex justify-between  py-[29px] md_max:block xs_max:py-4">
                    <div className="search_filter  md_max:flex md_max:justify-between">
                        <TextField
                            placeholder="Search"
                            InputProps={{
                                startAdornment: <img src={iconSearch} alt="" className="pr-2" />,
                                sx: {
                                    height: '40px',
                                    width: xs_max ? (!!criterialWasChosen ? '180px' : '300px') : 'inherit',
                                },
                            }}
                        />
                        <div className="inline-block">
                            <Button sx={{ height: '40px',padding:"0 0 0 12px",minWidth:"20px" }} onClick={handleSwitchDisplayFilterForm}>
                                <img src={filterbutton} alt="" />
                            </Button>

                            {!!criterialWasChosen && (
                                <span className=" text-[#5E90F0] text-[14px] ">
                                    <img
                                        src={iconCloseForFilter}
                                        className="inline-block mb-[2px] cursor-pointer"
                                        onClick={resetCriterialFilter}
                                    />
                                    Clear {criterialWasChosen} filters
                                </span>
                            )}
                        </div>
                    </div>
                    {state.isDisplayAsideMenu&&(!xs_max) && <div className='pt-3'><BtnImportAndADD /></div>}
                </div>
                <TableUser />
                {state.isDisplayFiler && (
                    <div className="fixed right-[--mrForChild] top-[calc(var(--heightNav)+var(--mrForChild))] bottom-[--mrForChild]  overflow-auto">
                        <Filter />
                    </div>
                )}
                {statusForApiByID === 'success' && state.isDisplayFormView && <FormViewUser />}
                {state.isDisplayImportForm && <ImportForm />}
            </div>
        </section>
    );
}

export default Accounts;
