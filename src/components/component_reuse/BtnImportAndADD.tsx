import { Button } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { useGlobalState } from '../../store/Provider';
import { icondocument, iconimportuser, iconuploaduser, iconplususer } from '../../assets/icon';
import { actions } from '../../store';
import { LINK_PAGE_ACCOUNT_ADD } from '../../data/constance_for_page';
import { OpacityTransition } from '..';
function BtnImportAndADD() {
    const [state, dispatch] = useGlobalState();
    const handleImportUser = () => {
        dispatch(actions.toggleImportForm());
    };
    return (
        <OpacityTransition>
            <div className="Right_Nav flex items-center gap-[10px] pr-[--mrForChild]">
                <img src={icondocument} alt="" className="cursor-pointer" />
                <img src={iconimportuser} alt="" className="cursor-pointer" />
                <img className="cursor-pointer" src={iconuploaduser} alt="" onClick={handleImportUser} />
                {state.isDisplayAsideMenu ? (
                    ''
                ) : (
                    <Link to={LINK_PAGE_ACCOUNT_ADD}>
                        <Button
                            startIcon={<img src={iconplususer} alt="" />}
                            variant="contained"
                            sx={{
                                height: '40px',
                                width: '150px',
                                backgroundColor: 'var(--ColorBgButton)',
                            }}
                        >
                            New Account
                        </Button>
                    </Link>
                )}
            </div>
        </OpacityTransition>
    );
}

export default BtnImportAndADD;
