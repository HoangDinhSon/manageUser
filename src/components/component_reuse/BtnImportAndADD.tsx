import { icondocument, iconimportuser, iconuploaduser, iconplususer } from '../../assets/icon';
import { Button } from '@mui/material';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
function BtnImportAndADD() {
    const [state, dispatch]= useGlobalState();
    const handleImportUser =()=>{
        dispatch(actions.toggleImportForm())
    }
    return (
        <div className="Right_Nav flex items-center gap-[10px]">
            <img src={icondocument} alt=""  className='cursor-pointer'/>
            <img src={iconimportuser} alt="" className='cursor-pointer' />
            {/* import user mui ten đi lên  */}
            <img className='cursor-pointer' src={iconuploaduser} alt="" onClick={handleImportUser}/>
            <Button
                variant="contained"
                sx={{
                    height: '40px',
                }}
            >
                <img src={iconplususer} alt=""  />
                New Account
            </Button>
        </div>
    );
}

export default BtnImportAndADD;
