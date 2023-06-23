import { icondocument, iconimportuser, iconuploaduser, iconplususer } from '../../assets/icon';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import { LINK_PAGE_ACCOUNT_ADD } from '../../constance_for_page';
function BtnImportAndADD() {
    const [state, dispatch] = useGlobalState();
    const handleImportUser = () => {
        dispatch(actions.toggleImportForm());
    };

    return (
        <div className="Right_Nav flex items-center gap-[10px] ">
            <img src={icondocument} alt="" className="cursor-pointer" />
            <img src={iconimportuser} alt="" className="cursor-pointer" />
            {/* import user mui ten đi lên  */}
            <img className="cursor-pointer" src={iconuploaduser} alt="" onClick={handleImportUser} />
            <NavLink to={LINK_PAGE_ACCOUNT_ADD}>
                <Button
                    startIcon={<img src={iconplususer} alt="" />}
                    variant="contained"
                    sx={{
                        height: '40px',
                        backgroundColor: 'var(--ColorBgButton)',
                    }}
                >
                    New Account
                </Button>
            </NavLink>
        </div>
    );
}

export default BtnImportAndADD;
