import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { bgAvatar, notification } from '~/assets';
import { FormLogOut} from '~/components';

function PopOverLogout() {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div  className=" flex flex-col items-center gap-10 pb-5 xs_max:gap-5 ">
                    <img src={notification} alt="" className="cursor-pointer" />
                    <img src={bgAvatar} alt="" className="cursor-pointer"  {...bindTrigger(popupState)}/>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <FormLogOut />
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}

export default PopOverLogout;
