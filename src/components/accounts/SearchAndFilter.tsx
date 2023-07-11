import { Button, TextField } from '@mui/material';
import { BtnImportAndADD } from '..';
import { iconSearch,filterbutton ,iconCloseForFilter} from '~/assets/icon';
import { actions } from '~/store';
import { useGlobalState } from '~/store/Provider';
import { useTheme ,useMediaQuery} from '@mui/material';
import { checkNumberOFCriterialForFilter } from '~/handlelogic';

function SearchAndFilter() {
    const [state , dispatch]= useGlobalState()
    const handleSwitchDisplayFilterForm = () => {
        dispatch(actions.togleDisplayFilter(state.isDisplayFiler));
    };
    const criterialWasChosen = checkNumberOFCriterialForFilter(state.criterialForFilter);
    const resetCriterialFilter = () => {
        dispatch(actions.resetCriterialForFilter());
    };
    const theme = useTheme();
    const xs_max = useMediaQuery(theme.breakpoints.down('xs'));
    return ( 
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
     );
}

export default SearchAndFilter;