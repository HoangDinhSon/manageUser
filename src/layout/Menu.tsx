import { useState } from 'react';
import { useTheme, useMediaQuery, Box, Drawer, Toolbar, Popover } from '@mui/material';
import { FormLogOut, BtnImportAndADD, Hamburger, FormVerify } from '../components';
import { IconMenu } from '../components/component_layout';
import { useGlobalState } from '../store/Provider';
import { actions } from '../store';
import { useSelector } from 'react-redux';
import { RootState } from '~/app_redux/store';
import * as CONST from '~/data/constance_for_page';
import { TopNavBar, Main, BreadCrumbContent, MenuIconStyled, PopOverLogout } from './component';

function Menu({ children }: any) {
    const { isDisplayFormVerify } = useSelector((state: RootState) => state.manageAppTodo);
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useGlobalState();
    const theme = useTheme();
    const HEIGHT_BROWSER_TO_CHANGE_GAP = 800;
    const XS = parseInt(import.meta.env.VITE_BREAKPOINTS_XS) + 1;
    const maxXS: boolean = useMediaQuery(theme.breakpoints.down(XS)); //(0-->375px ]
    if (localStorage.getItem('userAdmin') == undefined) {
        window.location.href = CONST.LINK_PAGE_lOGIN;
        return <div></div>;
    }
    // change class to fit height viewpoint
    const heightBrowser = window.innerHeight;
    let classAsideBar = 'flex flex-col items-center  gap-[53px] pt-5 h-full ';
    let classListItem = 'flex flex-col items-center  gap-[53px] py-5 flex-grow xs_max:py-0';
    if (heightBrowser < HEIGHT_BROWSER_TO_CHANGE_GAP) {
        classAsideBar = classAsideBar.replace('gap-[53px]', 'gap-[20px]');
        classListItem = classListItem.replace('gap-[53px]', 'gap-[20px]');
    }
    const handleDisplay = () => {
        dispatch(actions.togleDisplayAsideMenu(state.isDisplayAsideMenu));
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/*1/4. TopNav Bar */}
            <TopNavBar position="fixed" open={open}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Toolbar>
                        <MenuIconStyled onClick={handleDisplay} />
                        <BreadCrumbContent />
                    </Toolbar>
                    <BtnImportAndADD /> :
                </Toolbar>
            </TopNavBar>
            {/* 2/4. Aside Bar */}
            <Drawer open={open} variant="persistent" anchor="left">
                <div className=" w-[--heightNav] bg-white h-screen pt-[--heightNav]">
                    <div className={classAsideBar}>
                        <div className={classListItem}>
                            {CONST.listMenuAsideBar.map((ele, index) => {
                                return <IconMenu key={index} icon={ele.icon} name={ele.name} />;
                            })}
                        </div>
                        <PopOverLogout />
                    </div>
                </div>
            </Drawer>
            {/*3/4. Background  */}
            <div className="fixed  bg-[#ECECEC] h-screen left-0 right-0 z-[-1] "></div>
            {/*4/4. Content */}
            <Main open={open}>{children}</Main>
            {/* 5/5 FormVerify */}
            {isDisplayFormVerify && <FormVerify />}
        </Box>
    );
}
export default Menu;
