import { useState, useRef } from 'react';
import { useLocation, NavLink} from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { FormLogOut, BtnImportAndADD, Hamburger, FormVerify } from '../components';
import { IconMenu } from '../components/component_layout';
import { useGlobalState } from '../store/Provider';
import { actions } from '../store';
import { TransitionForAsideBar, HamburgerMenu } from '../components/component_layout/Hamburger';
import { bgAvatar, notification, arrowBackForLayout } from '../assets';
import * as linkPage from '../data/constance_for_page';
import { replaceManyString } from '../handlelogic';
import { useSelector } from 'react-redux';
import { RootState } from '~/app_redux/store';
import * as CONST from '~/data/constance_for_page';
import { useDetectClickOutside } from '~/custome_hook';

function Menu({ children }: any) {
    const { isDisplayFormVerify } = useSelector((state: RootState) => state.manageAppTodo);
    const location = useLocation(); // ko dùng tới ??
    const [state, dispatch] = useGlobalState();
    const [isDisPlayLogout, setIsDisplayLogout] = useState(false);
    const refFormLogout = useRef<any>(null);
    const HEIGHT_BROWSER_TO_CHANGE_GAP = 800;
    if (localStorage.getItem('userAdmin') == undefined) {
        window.location.href = CONST.LINK_PAGE_lOGIN;
        return <div></div>;
    }
    const handleLogOut = (e: any) => {
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
        (location.pathname === linkPage.LINK_PAGE_ACCOUNT ||
            location.pathname === `${linkPage.LINK_PAGE_ACCOUNT}/` ||
            location.pathname === linkPage.LINK_PAGE_REPORT ||
            location.pathname === `${linkPage.LINK_PAGE_REPORT}/`);
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
    if (
        state.isDisplayFormView === true ||
        state.isDisplayImportForm === true ||
        state.isDisplayFiler === true ||
        state.isDisplayEditAndAddPageStack
    ) {
        classForChildrenOfMenu = replaceManyString(classForChildrenOfMenu, ['z-[1]'], ['z-[4]']);
    }
    /* Click out side form Logout and hidden form  */
    useDetectClickOutside(refFormLogout, [isDisPlayLogout, setIsDisplayLogout]);

    return (
        <div className="menu_Layout flex   bg-[#ECECEC]  h-screen w-full ">
            {/*1/4. TopNav Bar */}
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
            {/* 2/4. Aside Bar */}
            <TransitionForAsideBar>
                <div className=" w-[--heightNav] bg-white h-screen pt-[--heightNav]">
                    <div className={classAsideBar}>
                        <div className={classListItem}>
                            {CONST.listMenuAsideBar.map((ele, index) => {
                                return (
                                    <IconMenu
                                        key={index}
                                        icon={ele.icon}
                                        iconNameMenu={ele.iconNameMenu}
                                        name={ele.name}
                                    />
                                );
                            })}
                        </div>
                        <div className=" flex flex-col items-center gap-10 pb-5 xs_max:gap-5 ">
                            <img src={notification} alt="" className="cursor-pointer" />
                            <div className="relative">
                                <div className="absolute bottom-0 left-[52px]" ref={refFormLogout}>
                                    {isDisPlayLogout && <FormLogOut />}
                                </div>
                                <img
                                    src={bgAvatar}
                                    alt=""
                                    onClick={(e) => handleLogOut(e)}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionForAsideBar>
            {/*3/4. Background  */}
            <div className="fixed  bg-[#ECECEC] h-screen left-0 right-0 z-[-1] "></div>
            {/*4/4. Content */}
            <main className={classForChildrenOfMenu}>{children}</main>
            {/* 5/5 FormVerify */}
            {isDisplayFormVerify && <FormVerify />}
        </div>
    );
}
export default Menu;
/* 
1. normal is Layer : 
    background:z-index=-1 
    main :     z-index= 1 
    Aside:     z-index= 2
    Nav        z-index= 3 
    FormVerify : z-index= 4.
*/
