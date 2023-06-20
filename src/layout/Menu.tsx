import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
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
import { FormLogOut, BtnImportAndADD } from '../components';
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

function Menu({ children }: any) {
    const location = useLocation();
    const [state, dispatch] = useGlobalState();
    const [isDisPlayLogout, setIsDisplayLogout] = useState(false);
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

    return (
        <div className="menu_Layout flex bg-[#ECECEC]  w-full h-full relative">
            {/* 1/4. Aside Bar */}
            {state.isDisplayAsideMenu && (
                <div className={`${state.isDisplayAsideMenu ? 'w-[85px]' : ''}`}>
                    <div className=" w-[78px] bg-[#fff] fixed z-[2]  top-0 bottom-0 min-h-[750px] ">
                        <div className="relative flex flex-col items-center  gap-[53px] pt-5 h-full">
                            <img src={hamberger} alt="" onClick={handleSwitchDisplay} />
                            <div className="flex flex-col items-center gap-[53px]">
                                <IconMenu icon={dasboard} iconNameMenu={nameOfDashboard} name={LINK_PAGE_DASHBOARD}/>
                                <IconMenu icon={project} iconNameMenu={nameOfproject} name={LINK_PAGE_PROJECT} />
                                <IconMenu icon={stacks} iconNameMenu={nameOfStacks} name={LINK_PAGE_STACKS} />
                                <IconMenu icon={Report} iconNameMenu={nameOfreport} name={LINK_PAGE_REPORT} />
                                <IconMenu icon={accounts} iconNameMenu={nameOfaccounts} name={LINK_PAGE_ACCOUNT} />
                                <IconMenu icon={RoleManager} iconNameMenu={nameOfRolemanager} name={LINK_PAGE_ROLEMANAGER}/>
                            </div>
                            <div className=" flex flex-col items-center gap-10 ">
                                <img src={notification} alt=""  className='cursor-pointer'/>
                                <div className="relative">
                                    <div className="absolute bottom-0 left-[52px] ">
                                        {isDisPlayLogout && <FormLogOut />}
                                    </div>
                                    <img src={bgAvatar} alt="" onClick={handleLogOut}  className='cursor-pointer'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/*2/4. TopNav Bar */}
            <div className="fixed z-[1] top-0 left-[0] right-0 h-[78px] px-[20px] bg-[#fff]  range_1441_:px-[calc((100%-1440px)/2+20px)] ">
                <div className="flex justify-between items-center  h-[78px]">
                    <div className="Left_Nav flex items-center gap-[15px]">
                        <img src={hamberger} alt="" onClick={handleSwitchDisplay} className="cursor-pointer" />
                        <h4 className={state.isDisplayAsideMenu ? 'pl-[20px]' : ''}>
                            <ChangeContentBaseAddress />
                        </h4>
                    </div>
                    {conditionToDisplayBtnADDandImport && <BtnImportAndADD />}
                </div>
            </div>
            {/*3/4. Background  */}
            <div className="fixed  bg-[#ECECEC] top-0 bottom-0 left-0 right-0 z-[-1]"></div>
            {/*4/4. Content */}
            <div className="mx-5 mt-[98px]  bg-[white] w-full rounded-xl mb-5 overflow-auto">{children}</div>
        </div>
    );
}

export default Menu;
