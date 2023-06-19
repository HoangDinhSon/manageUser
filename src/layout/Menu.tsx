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
import { FormLogOut ,BtnImportAndADD} from '../components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LINK_PAGE_ACCOUNT_EDIT } from '../constance_for_page';

function Menu({ children }: any) {
    const location = useLocation();
    const [state, dispatch] = useGlobalState();
    const [isDisPlayLogout, setIsDisplayLogout] = useState(false);
    const handleSwitchDisplay = () => {
        dispatch(actions.togleDisplayAsideMenu(state.togleDisplayAsideMenu));
    };
    const handleLogOut = () => {
        setIsDisplayLogout(!isDisPlayLogout);
    };

    function ChangeContentBaseAddress() {
        function ContentHeaderLayOut({ children }: any) {
            return (
                <div className="flex gap-4">
                    <img src={arrowBackForLayout} alt="" />
                    <p className="text-[--greyChart]">{children}</p>
                </div>
            );
        }
        switch (location.pathname) {
            case LINK_PAGE_ACCOUNT_EDIT: {
                return <ContentHeaderLayOut>Accounts / Edit Account</ContentHeaderLayOut>;
            }
            default: {
                return <ContentHeaderLayOut>Accounts</ContentHeaderLayOut>;
            }
        }
    }

    return (
        <div className="menu_Layout flex bg-[#ECECEC]  w-full h-full relative">
            {/* 1/4. Aside Bar */}
            {state.togleDisplayAsideMenu && (
                <div className={`${state.togleDisplayAsideMenu ? 'w-[85px]' : ''}`}>
                    <div className=" w-[78px] bg-[#fff] fixed z-[2]  top-0 bottom-0 min-h-[750px] ">
                        <div className="relative flex flex-col items-center  gap-[53px] pt-5 h-full">
                            <img src={hamberger} alt="" onClick={handleSwitchDisplay} />
                            <div className="flex flex-col items-center gap-[53px]">
                                <IconMenu icon={dasboard} iconNameMenu={nameOfDashboard} />
                                <IconMenu icon={project} iconNameMenu={nameOfproject} />
                                <IconMenu icon={stacks} iconNameMenu={nameOfStacks} />
                                <IconMenu icon={Report} iconNameMenu={nameOfreport} />
                                <IconMenu icon={accounts} iconNameMenu={nameOfaccounts} />
                                <IconMenu icon={RoleManager} iconNameMenu={nameOfRolemanager} />
                            </div>
                            <div className=" flex flex-col items-center gap-10 ">
                                <img src={notification} alt="" />
                                <div className="relative">
                                    <div className="absolute bottom-0 left-[52px] ">
                                        {isDisPlayLogout && <FormLogOut />}
                                    </div>
                                    <img src={bgAvatar} alt="" onClick={handleLogOut} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/*2/4. TopNav Bar */}
            <div className="fixed z-[1] top-0 left-[0] right-0 h-[78px] px-[20px] bg-[#fff]  range_1441_:px-[calc((100%-1440px)/2+20px)] ">
                <div className="flex justify-between items-center  h-[78px]">
                    <div className="Left_Nav flex items-center gap-[15px]" onClick={handleSwitchDisplay}>
                        {/* {!state.togleDisplayAsideMenu &&<img src={hamberger} alt="" /> } */}
                        <img src={hamberger} alt="" />
                        <h4 className={`${state.togleDisplayAsideMenu ? 'pl-[20px]' : ''}`}>
                            <ChangeContentBaseAddress />
                        </h4>
                    </div>
                    
                    {!state.togleDisplayAsideMenu && (
                        <BtnImportAndADD />
                        // <div className="Right_Nav flex items-center gap-[10px]">
                        //     <img src={icondocument} alt="" />
                        //     <img src={iconimportuser} alt="" />
                        //     <img src={iconuploaduser} alt="" />
                        //     <Button
                        //         variant="contained"
                        //         sx={{
                        //             height: '40px',
                        //         }}
                        //     >
                        //         <img src={iconplususer} alt="" />
                        //         New Account
                        //     </Button>
                        // </div>
                    )}
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
