import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { accounts, dasboard, hamberger, project, stacks, RoleManager, Report } from '../assets/icon';
import {
    nameOfDashboard,
    nameOfRolemanager,
    nameOfStacks,
    nameOfaccounts,
    nameOfproject,
    nameOfreport,
} from '../assets/icon';
import { IconMenu } from '../components/component_layout';
import { useGlobalState } from '../store/Provider';
import { actions } from '../store';
import { bgAvatar, notification, arrowBackForLayout } from '../assets';
import { FormLogOut, BtnImportAndADD, Hamburger } from '../components';
import {
    LINK_PAGE_ACCOUNT,
    LINK_PAGE_ACCOUNT_EDIT,
    LINK_PAGE_ACCOUNT_ADD,
    LINK_PAGE_DASHBOARD,
    LINK_PAGE_PROJECT,
    LINK_PAGE_STACKS,
    LINK_PAGE_ROLEMANAGER,
    LINK_PAGE_REPORT,
} from '../constance_for_page';
import { HamburgerForAsideBar } from '../components/component_layout/Hamburger';

function Menu({ children }: any) {
    const location = useLocation();
    const [state, dispatch] = useGlobalState();
    const [isDisPlayLogout, setIsDisplayLogout] = useState(false);
    const HEIGHT_BROWSER_TO_CHANGE_GAP = 740;
    if (localStorage.getItem('userAdmin') == undefined) {
        window.location.href = 'http://localhost:4000';
        return <div></div>;
    }
    const handleSwitchDisplay = () => {
        dispatch(actions.togleDisplayAsideMenu(state.isDisplayAsideMenu));
    };
    const handleLogOut = () => {
        setIsDisplayLogout(!isDisPlayLogout);
    };

    function ChangeContentBaseAddress() {
        function ContentHeaderLayOut({ children }: any) {
            return (
                <div className="flex gap-4">
                    <NavLink to={LINK_PAGE_ACCOUNT}>
                        <img src={arrowBackForLayout} alt="" />
                    </NavLink>
                    <p className="text-[--greyChart]">{children}</p>
                </div>
            );
        }
        switch (location.pathname) {
            case LINK_PAGE_ACCOUNT_EDIT: {
                return <ContentHeaderLayOut>Accounts / Edit Account</ContentHeaderLayOut>;
            }
            case LINK_PAGE_ACCOUNT_ADD: {
                return <ContentHeaderLayOut>Accounts / Add Account</ContentHeaderLayOut>;
            }
            default: {
                return <ContentHeaderLayOut>Accounts</ContentHeaderLayOut>;
            }
        }
    }
    // hidden or display BtnAddAndImport :
    const conditionToDisplayBtnADDandImport =
        state.isDisplayAsideMenu === false &&
        (location.pathname === LINK_PAGE_ACCOUNT || location.pathname === `${LINK_PAGE_ACCOUNT}/`);
    // change class to fit height aside Bar
    const heightBrowser = window.screen.height;
    let classAsideBar = 'flex flex-col items-center  gap-[53px] pt-5 h-full ';
    let classListItem = 'flex flex-col items-center  gap-[53px] pt-5 flex-grow';
    if (heightBrowser < HEIGHT_BROWSER_TO_CHANGE_GAP) {
        classAsideBar = 'flex flex-col items-center  gap-[20px] pt-5 h-full ';
        classListItem = 'flex flex-col items-center  gap-[20px] py-5 xs_max:py-0 ';
    }

    const theme = useTheme();
    const XS = parseInt(import.meta.env.VITE_BREAKPOINTS_XS) + 1;
    const maxXS: boolean = useMediaQuery(theme.breakpoints.down(XS)); //(0-->375px ]
    let classForChildrenOfMenu =
        'mx-[--mrForChild] mt-[calc(var(--mrForChild)+var(--heightNav))] mb-[--mrForChild]  bg-[white] w-[calc(100%-(2*var(--mrForChild)))]  rounded-[--borderForLayout] overflow-auto' +
        ' xs_max:mx-[--margin4px] xs_max:mt-[calc(var(--hNavRes)+var(--margin4px))] xs_max:mb-[--margin4px]  xs_max:w-[calc(100%-2*var(--margin4px))] transition-all duration-[2s]';

    return (
        <div className="menu_Layout  flex bg-[#ECECEC]  h-screen ">
            {/* 1/4. Aside Bar */}
            <HamburgerForAsideBar>
                <div className=" w-[78px] bg-white h-screen pt-[--heightNav]">
                    <div className={classAsideBar}>
                        <div className={classListItem}>
                            <IconMenu icon={dasboard} iconNameMenu={nameOfDashboard} name={LINK_PAGE_DASHBOARD} />
                            <IconMenu icon={project} iconNameMenu={nameOfproject} name={LINK_PAGE_PROJECT} />
                            <IconMenu icon={stacks} iconNameMenu={nameOfStacks} name={LINK_PAGE_STACKS} />
                            <IconMenu icon={Report} iconNameMenu={nameOfreport} name={LINK_PAGE_REPORT} />
                            <IconMenu icon={accounts} iconNameMenu={nameOfaccounts} name={LINK_PAGE_ACCOUNT} />
                            <IconMenu
                                icon={RoleManager}
                                iconNameMenu={nameOfRolemanager}
                                name={LINK_PAGE_ROLEMANAGER}
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
            </HamburgerForAsideBar>

            {/*2/4. TopNav Bar */}
            <div className="fixed z-[1] top-0 left-[0] right-0  px-[20px] bg-[#fff] xs_max:h-[--hNavRes]  range_1441_:px-[calc((100%-1440px)/2+20px)]  ">
                <div className="flex justify-between items-center  h-[--heightNav] xs_max:h-[--hNavRes]">
                    <div className="Left_Nav flex items-center gap-[15px]">
                        <h4 className='pl-[60px]'>
                            <ChangeContentBaseAddress />
                        </h4>
                    </div>
                    {conditionToDisplayBtnADDandImport && (
                        <div className="bg-[white]">
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
            {/*3/4. Background  */}
            <div className="fixed  bg-[#ECECEC] h-screen left-0 right-0 z-[-1]"></div>
            {/*4/4. Content */}
            <div className={classForChildrenOfMenu}>{children}</div>
        </div>
    );
}

export default Menu;
