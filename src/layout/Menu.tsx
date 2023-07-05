import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { FormLogOut, BtnImportAndADD, Hamburger } from '../components';
import { IconMenu } from '../components/component_layout';
import { useGlobalState } from '../store/Provider';
import { actions } from '../store';
import { TransitionForAsideBar, HamburgerMenu } from '../components/component_layout/Hamburger';
import * as icon from '../assets/icon';
import { bgAvatar, notification, arrowBackForLayout } from '../assets';
import * as linkPage from '../data/constance_for_page';
import { replaceManyString } from '../handlelogic';
import { Toaster } from 'react-hot-toast';
function Menu({ children }: any) {
    const location = useLocation();
    const [state, dispatch] = useGlobalState();
    const [isDisPlayLogout, setIsDisplayLogout] = useState(false);
    const HEIGHT_BROWSER_TO_CHANGE_GAP = 800;
    if (localStorage.getItem('userAdmin') == undefined) {
        window.location.href = 'http://localhost:4000';
        return <div></div>;
    }
    const handleLogOut = () => {
        setIsDisplayLogout(!isDisPlayLogout);
    };

    function ContentBaseAddress() {
        function ContentHeaderLayOut({ children }: any) {
            return (
                <div className="flex gap-4">
                    <NavLink to={linkPage.LINK_PAGE_ACCOUNT}>
                        <img src={arrowBackForLayout} alt="" />
                    </NavLink>
                    <p className="text-[--greyChart] xs_max:text-[16px]">{children}</p>
                </div>
            );
        }
        switch (location.pathname) {
            case linkPage.LINK_PAGE_ACCOUNT_EDIT: {
                return <ContentHeaderLayOut>Accounts / Edit Account</ContentHeaderLayOut>;
            }
            case linkPage.LINK_PAGE_ACCOUNT_ADD: {
                return <ContentHeaderLayOut>Accounts / Add Account</ContentHeaderLayOut>;
            }
            default: {
                return <div className="text-2xl font-medium">ACCOUNTS</div>;
            }
        }
    }
    // hidden or display BtnAddAndImport :
    const conditionToDisplayBtnADDandImport =
        state.isDisplayAsideMenu === false &&
        (location.pathname === linkPage.LINK_PAGE_ACCOUNT || location.pathname === `${linkPage.LINK_PAGE_ACCOUNT}/`);
    // change class to fit height viewpoint
    const heightBrowser = window.innerHeight;
    let classAsideBar = 'flex flex-col items-center  gap-[53px] pt-5 h-full ';
    let classListItem = 'flex flex-col items-center  gap-[53px] py-5 flex-grow xs_max:py-0';
    if (heightBrowser < HEIGHT_BROWSER_TO_CHANGE_GAP) {
        classAsideBar = classAsideBar.replace('gap-[53px]', 'gap-[20px]');
        classListItem = classListItem.replace('gap-[53px]', 'gap-[20px]');
    }
    const theme = useTheme();
    const XS = parseInt(import.meta.env.VITE_BREAKPOINTS_XS) + 1;
    const maxXS: boolean = useMediaQuery(theme.breakpoints.down(XS)); //(0-->375px ]
    let classForChildrenOfMenu =
        'fixed z-[1] bg-white left-[20px] top-[98px]  w-[calc(100%-20px-20px)] h-[calc(100vh-98px-20px)] rounded-[--borderForLayout]  overflow-auto transition-all duration-[1s] ' +
        ' ' +
        ' before:fixed before:content-[""] before:h-[20px]   before:bg-[white] before:left-[20px]  before:w-[calc(100%-40px)] before:rounded-t-[12px] before:transition-all before:duration-[1s]' +
        ' ' +
        ' xs_max:left-[--margin4px] xs_max:top-[calc(var(--hNavRes)+var(--margin4px))] xs_max:w-[calc(100%-2*var(--margin4px))]' +
        ' ' +
        ' xs_max:before:left-[--margin4px]  xs_max:before:w-[calc(100%-2*var(--margin4px))]';
    const handleDisplay = () => {
        dispatch(actions.togleDisplayAsideMenu(state.isDisplayAsideMenu));
    };
    if (state.isDisplayAsideMenu === true) {
        classForChildrenOfMenu = replaceManyString(
            classForChildrenOfMenu,
            [
                'left-[20px]',
                'w-[calc(100%-20px-20px)]',
                'before:left-[20px]',
                'before:w-[calc(100%-40px)]',
                'xs_max:left-[--margin4px]',
                'xs_max:w-[calc(100%-2*var(--margin4px))]',
                'xs_max:before:left-[--margin4px]',
                'xs_max:before:w-[calc(100%-2*var(--margin4px))]',
            ],
            [
                'left-[98px]',
                'w-[calc(100%-98px-20px)]',
                'before:left-[98px]',
                'before:w-[calc(100%-118px)]',
                'xs_max:left-[calc(var(--margin4px)+var(--hNavRes))]',
                'xs_max:w-[calc(100%-2*var(--margin4px)-var(--hNavRes))]',
                'xs_max:before:left-[calc(var(--margin4px)+var(--hNavRes))]',
                'xs_max:before:w-[calc(100%-2*var(--margin4px)-var(--hNavRes))]',
            ],
        );
    }
    /* xem note 1 .  */
    if (state.isDisplayFormView === true || state.isDisplayImportForm === true || state.isDisplayFiler === true) {
        classForChildrenOfMenu = replaceManyString(classForChildrenOfMenu, ['z-[1]'], ['z-[4]']);
    }

    return (
        <div className="menu_Layout flex   bg-[#ECECEC]  h-screen w-full ">
            <Toaster/>
            {/*2/5. TopNav Bar */}
            <div className="fixed z-[3] pl-[80px] top-0 h-[78px] xs_max:h-[--hNavRes] w-full bg-[#fff]   ">
                <HamburgerMenu onClick={handleDisplay} />
                <div className="flex justify-between items-center  h-[--heightNav] xs_max:h-[--hNavRes]">
                    <div className="Left_Nav flex items-center gap-[15px]">
                        <h4>
                            <ContentBaseAddress />
                        </h4>
                    </div>
                    {conditionToDisplayBtnADDandImport && (
                        <div className="bg-[white] ">
                            {maxXS ? (
                                <Hamburger>
                                    <BtnImportAndADD />
                                </Hamburger>
                            ) : (
                                <BtnImportAndADD />
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* 3/5. Aside Bar */}
            <TransitionForAsideBar>
                <div className=" w-[--heightNav] bg-white h-screen pt-[--heightNav]">
                    <div className={classAsideBar}>
                        <div className={classListItem}>
                            <IconMenu
                                icon={icon.dasboard}
                                iconNameMenu={icon.nameOfDashboard}
                                name={linkPage.LINK_PAGE_DASHBOARD}
                            />
                            <IconMenu
                                icon={icon.project}
                                iconNameMenu={icon.nameOfproject}
                                name={linkPage.LINK_PAGE_PROJECT}
                            />
                            <IconMenu
                                icon={icon.stacks}
                                iconNameMenu={icon.nameOfStacks}
                                name={linkPage.LINK_PAGE_STACKS}
                            />
                            <IconMenu
                                icon={icon.Report}
                                iconNameMenu={icon.nameOfreport}
                                name={linkPage.LINK_PAGE_REPORT}
                            />
                            <IconMenu
                                icon={icon.accounts}
                                iconNameMenu={icon.nameOfaccounts}
                                name={linkPage.LINK_PAGE_ACCOUNT}
                            />
                            <IconMenu
                                icon={icon.RoleManager}
                                iconNameMenu={icon.nameOfRolemanager}
                                name={linkPage.LINK_PAGE_ROLEMANAGER}
                            />
                        </div>
                        <div className=" flex flex-col items-center gap-10 pb-5 xs_max:gap-5 ">
                            <img src={notification} alt="" className="cursor-pointer" />
                            <div className="relative">
                                <div className="absolute bottom-0 left-[52px]">{isDisPlayLogout && <FormLogOut />}</div>
                                <img src={bgAvatar} alt="" onClick={handleLogOut} className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionForAsideBar>
            {/*4/5. Background  */}
            <div className="fixed  bg-[#ECECEC] h-screen left-0 right-0 z-[-1] "></div>
            {/*5/5. Content */}
            <main className={classForChildrenOfMenu}>{children}</main>
        </div>
    );
}
export default Menu;
/* 
1. bình thường thì Layer : Nav z-index=3 
    Aside : z-index= 2
    main : z-index = 1 
    background:  z= -1 ,; 



*/
