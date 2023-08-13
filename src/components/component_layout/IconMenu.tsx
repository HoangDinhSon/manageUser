import { Tooltip} from '@mui/material';
import { NavLink } from 'react-router-dom';
interface PropsIconMenu {
    name: string;
    icon: string;
}
function IconMenu({ icon, name }: PropsIconMenu) {
    const title = name.slice(1, name.length);
    return (
        <>
            <Tooltip title={<span style={{ fontSize: '14px' }}>{title}</span>} arrow={true} placement="right">
                <NavLink
                    to={name}
                    style={({ isActive, isPending }) => ({
                        backgroundColor: isActive ? '#fff3f4' : '',
                        outline: isActive ? '10px solid #fff3f4' : '',
                        borderRadius:isActive?"5px":""
                    })}
                >
                    <img src={icon} alt="" />
                </NavLink>
            </Tooltip>
        </>
    );
}
export default IconMenu;
