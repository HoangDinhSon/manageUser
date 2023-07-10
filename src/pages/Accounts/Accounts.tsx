import { Button, TextField } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { TableAnimation } from '../../components';
import { TableUser } from '../../components/accounts/TableUser';
import { filterbutton, iconSearch } from '../../assets/icon';
import { iconCloseForFilter } from '../../assets';
import { useGlobalState } from '../../store/Provider';
import { getUserBaseOnID } from '../../Api/logTimeApi';
import { actions } from '../../store';
import {
    ImportForm,
    Filter,
    FormViewUser,
    BtnImportAndADD,
    AnimationMountAndUnMount,
    WatchTime,
} from '../../components';
import { checkNumberOFCriterialForFilter, watch } from '../../handlelogic';
import { typeUserAfterCallApiBaseOnID } from '../../data/type';

function Accounts({ status }: any) {
    /* Test */

    /* Test */
    const [state, dispatch] = useGlobalState();
    const handleSwitchDisplayFilterForm = () => {
        dispatch(actions.togleDisplayFilter(state.isDisplayFiler));
    };
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
    const criterialWasChosen = checkNumberOFCriterialForFilter(state.criterialForFilter);
    const resetCriterialFilter = () => {
        dispatch(actions.resetCriterialForFilter());
    };
    // response UI (theme dc config file Mui config)
    const theme = useTheme();
    const xs_max = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <section className="">
            <Toaster />
            {status === 'loading' && <TableAnimation />}
            {status === 'success' && (
                <div className="bg-white  rounded-[12px] px-8 pb-[68px] pt-8 xs_max:px-[--margin4px] xs_max:pt-4 ">
                    <WatchTime />
                    <div className="nav_for_table flex gap-1 h-[54px] items-end   border-b-[length:--borderWidth] border-[#EBEBEB]">
                        <p className="w-[44px] h-[40px] leading-[40px] text-center text-[#5E90F0]  border-b-4 border-[#5E90F0]">
                            All
                        </p>
                        <p className="w-[44px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Patner</p>
                        <p className="w-[75px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Vinova</p>
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
                                <Button
                                    sx={{ height: '40px', padding: '0 0 0 12px', minWidth: '20px' }}
                                    onClick={handleSwitchDisplayFilterForm}
                                >
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
                        {state.isDisplayAsideMenu && (
                            <div className="md_max:pt-3 xs_max:hidden">
                                <BtnImportAndADD />
                            </div>
                        )}
                    </div>
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
        </section>
    );
}

export default Accounts;
