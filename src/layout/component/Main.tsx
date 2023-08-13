import { styled } from '@mui/material/styles';
import * as CONST from '~/data/constance_for_page';
const drawerWidth = CONST.DRAWER_WIDTH;
const spaceMargin = CONST.SPACE_MARGIN;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => {
    return {
        overflow: 'auto',
        width: open ? `calc(100% - ${drawerWidth}px - ${spaceMargin * 2}px)` : `calc(100% - ${spaceMargin * 2}px)`,
        height: `calc(100vh - ${drawerWidth}px - ${spaceMargin}px - ${spaceMargin}px)`,
        marginTop: `calc( ${drawerWidth}px + ${spaceMargin}px)`,
        marginLeft: open ? `calc(${drawerWidth}px + ${spaceMargin}px)` : `${spaceMargin}px`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    };
});
export default Main;
