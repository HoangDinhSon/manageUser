import { useMemo, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { FormLogOut, BtnImportAndADD, Hamburger } from '../components';
import { IconMenu } from '../components/component_layout';
import { useGlobalState } from '../store/Provider';
import { HamburgerForAsideBar } from '../components/component_layout/Hamburger';
import * as icon from '../assets/icon'
import { bgAvatar, notification, arrowBackForLayout } from '../assets';
import * as linkPage from '../constance_for_page'
function Menu({ children }: any) {
    const location = useLocation();
    const [state, dispatch] = useGlobalState();
    const [isDisPlayLogout, setIsDisplayLogout] = useState(false);
    const HEIGHT_BROWSER_TO_CHANGE_GAP = 740;
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
                return <ContentHeaderLayOut>Accounts</ContentHeaderLayOut>;
            }
        }
    }
    // hidden or display BtnAddAndImport :
    const conditionToDisplayBtnADDandImport =
        state.isDisplayAsideMenu === false &&
        (location.pathname === linkPage.LINK_PAGE_ACCOUNT || location.pathname === `${linkPage.LINK_PAGE_ACCOUNT}/`);
    // change class to fit height viewpoint
    const heightBrowser = screen.height;
    const { classAsideBar, classListItem } = useMemo(() => {
        let classAsideBar = 'flex flex-col items-center  gap-[53px] pt-5 h-full ';
        let classListItem = 'flex flex-col items-center  gap-[53px] py-5 flex-grow xs_max:py-0';
        if (heightBrowser < HEIGHT_BROWSER_TO_CHANGE_GAP) {
            classAsideBar = classAsideBar.replace('gap-[53px]', 'gap-[20px]');
            classListItem = classListItem.replace('gap-[53px]', 'gap-[20px]');
        }
        return { classAsideBar, classListItem };
    }, [heightBrowser]);
    // check width viewpoint
    const theme = useTheme();
    const XS = parseInt(import.meta.env.VITE_BREAKPOINTS_XS) + 1;
    const maxXS: boolean = useMediaQuery(theme.breakpoints.down(XS)); //(0-->375px ]
    let classForChildrenOfMenu =
        'mx-[--mrForChild] mt-[calc(var(--mrForChild)+var(--heightNav))] mb-[--mrForChild]  bg-[white] w-[calc(100%-(2*var(--mrForChild)))]  rounded-[--borderForLayout] overflow-auto' +
        ' xs_max:mx-[--margin4px] xs_max:mt-[calc(var(--hNavRes)+var(--margin4px))] xs_max:mb-[--margin4px]  xs_max:w-[calc(100%-2*var(--margin4px))] transition-all duration-[2s]';

    return (
        <div className="menu_Layout  flex bg-[#ECECEC]  h-screen ">
            {/*1/4. TopNav Bar */}
            <div className="fixed z-[6] top-0 h-[78px] xs_max:h-[--hNavRes] w-[calc(100%-80px-20px)] max-w-[calc(1440px-80px)] ml-[80px]  bg-[#fff]   ">
                <div className="flex justify-between items-center  h-[--heightNav] xs_max:h-[--hNavRes]">
                    <div className="Left_Nav flex items-center gap-[15px]">
                        <h4>
                            <ContentBaseAddress />
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
            {/* 2/4. Aside Bar */}
            <HamburgerForAsideBar>
                <div className=" w-[--heightNav] bg-white h-screen pt-[--heightNav]">
                    <div className={classAsideBar}>
                        <div className={classListItem}>
                            <IconMenu icon={icon.dasboard} iconNameMenu={icon.nameOfDashboard} name={linkPage.LINK_PAGE_DASHBOARD} />
                            <IconMenu icon={icon.project} iconNameMenu={icon.nameOfproject} name={linkPage.LINK_PAGE_PROJECT} />
                            <IconMenu icon={icon.stacks} iconNameMenu={icon.nameOfStacks} name={linkPage.LINK_PAGE_STACKS} />
                            <IconMenu icon={icon.Report} iconNameMenu={icon.nameOfreport} name={linkPage.LINK_PAGE_REPORT} />
                            <IconMenu icon={icon.accounts} iconNameMenu={icon.nameOfaccounts} name={linkPage.LINK_PAGE_ACCOUNT} />
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
            </HamburgerForAsideBar>
            {/*3/4. Background  */}
            <div className="fixed  bg-[#ECECEC] h-screen left-0 right-0 z-[-1]"></div>
            <div className="fixed z-[0] bg-white top-0 left-0 right-0 h-[80px] xs_max:h-[60px] max-w-[1440px]"></div>
            {/*4/4. Content */}
            <div className={classForChildrenOfMenu}>{children}</div>
        </div>
    );
}

export default Menu;
